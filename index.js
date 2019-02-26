const demofile = require('demofile');
const fs = require('fs');
const _ = require('lodash');
const { fromEvent, forkJoin, BehaviorSubject } = require('rxjs');
const {  skipUntil, takeUntil, tap, groupBy, map, merge, mergeMap, mergeAll, first, count, filter, reduce, catchError } = require('rxjs/operators');
const {formatPosition, formatPlayer} = require('./util/player-formatter');

const TEAM_CTS = 3;
const TEAM_T = 2;
const TICKS_PER_STATE_POS = 10;
const TICKS_PER_FRAME = 30;
const OUTPUT_FILE = 'output.json';
const DEMO_FILE = 'CSGO-6oFwB-zyMQx-8z3Dj-nRfXN-9v4ZJ.dem';

let distance3 = (p1, p2) => {
    return Math.sqrt( Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2) );
};

let parserLoad$ = function parse() {
    // This variables contains actual state of game entity like player, flying nade etc.
    // let ActiveNades = [];
    // let Bomb = {}; // TODO: need requirements actualization

    // Players State data-storage
    let Players = {};

    let demo = new demofile.DemoFile();
    let gameStarted = false;
    let lastRoundNumber = -1;

    const gameStarts$ = fromEvent(demo.gameEvents, 'round_start').pipe(
        first(),
        tap(() => console.log(`GAME STARTED ${DEMO_FILE}`)),
    );

    const gameEnds$ = fromEvent(demo.gameEvents, 'round_end').pipe(
        first(),
        tap(() => console.log(`GAME ENDED ${DEMO_FILE}`)),
    );

    const PlayersStatesSubject = new BehaviorSubject(null);
    const FrameSubject = new BehaviorSubject(null);

    // 1. We don't need any data before warmup. So mark gameStarted as true, to start listen the stream.
    demo.gameEvents.on("round_start", e => {
        if (demo.gameRules.roundsPlayed > lastRoundNumber) {
            console.log(`=== ROUND #${demo.gameRules.roundsPlayed} STARTED IN ${DEMO_FILE} ===`);
            Players = {};
            demo.players
            // .filter(player => player.isAlive)
                .forEach(player => {
                    // Fill base state for new player
                    Players[player.name] = formatPlayer(player);
                    Players[player.name].round = demo.gameRules.roundsPlayed;
                    // Clear users movement on each round
                    Players[player.name].lastMovements = [];
                });
            lastRoundNumber = demo.gameRules.roundsPlayed;
        }
        gameStarted = true;
    });

    let players$ = fromEvent(demo, 'tickend')
        .pipe(
            skipUntil(gameStarts$),
            takeUntil(gameEnds$),
            filter(tick => gameStarted && (tick % TICKS_PER_STATE_POS === 0)),
            tap(() => {
                demo.players
                // skip dead players
                    .filter(player => player.isAlive)
                    // skip spectators
                    .filter(player => player.teamNumber > 1)
                    .forEach(player => PlayersStatesSubject.next(player));
            })
        );


    let frameSnapshots$ = fromEvent(demo, 'tickend')
        .pipe(
            skipUntil(gameStarts$),
            takeUntil(gameEnds$),
            filter(tick => gameStarted && (tick % TICKS_PER_FRAME === 0)),
            tap(() => FrameSubject.next(Players))
        );

    // Update alive players snapshots
    PlayersStatesSubject.subscribe((player) => {
        if (player && player.isAlive) {
            Players[player.name] = Object.assign(Players[player.name], formatPlayer(player));
        }
    });

    // Store new player movements
    PlayersStatesSubject.subscribe((player) => {
        if (player && player.isAlive) {
            const lastPos = _.last(Players[player.name].lastMovements);
            let lastDistance = lastPos && distance3(player.position, lastPos);
            if (!lastPos || (lastDistance > 0 && lastDistance < 100)) {
                Players[player.name].lastMovements.push(player.position);
            }
        }
    });

    // Squash saved movements to draw player movements trace
    FrameSubject.subscribe((state) => {
        for (let playerName in state) {
            console.log(state[playerName], state[playerName].lastMovements);
            state[playerName].lastMovements = [];
        }
    });

    // Load the stream
    demo.parse(fs.readFileSync(DEMO_FILE));

    players$.subscribe();
    frameSnapshots$.subscribe();
};


parserLoad$();
