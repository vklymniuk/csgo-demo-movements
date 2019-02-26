const Bomb = require('../model/bomb');

let BombDataStorage = {

    constructor(demoFile) {
        this.demo = demoFile;
        this.bomb = new Bomb();
        this.bombHolder = null;
    },

    onNewRound(event) {
        this.bomb = new Bomb();
        this.bombHolder = null;
    },

    onBombBeginPlant(event) {},

    // event: "bomb_abortplant", listener: (event: IEventBombAbortplant) => void
    onBombAbortPlant(event) {},

    // event: "bomb_planted", listener: (event: IEventBombPlanted) => void
    onBombPlanted(event) {},

    // event: "bomb_defused", listener: (event: IEventBombDefused) => void
    onBombDefused(event) {},

    // event: "bomb_exploded",listener: (event: IEventBombExploded) => void
    onBombExploded(event) {},

    // event: "bomb_dropped",listener: (event: IEventBombDropped) => void
    onBombDroppec(event) {},

    // on(event: "bomb_pickup"
    onBombPickup(event) {},
};
