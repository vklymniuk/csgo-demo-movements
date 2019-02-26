const weaponExtractor = require('./weapon');

module.exports.formatPosition = (player) => {
    return {
        x: Math.round(player.position.x),
        y: Math.round(player.position.y),
        z: Math.round(player.position.z)
    };
};


/**
 * @param {Player} player - demofile player object.
 * @returns {object} - player data.
 */
module.exports.formatPlayer = (player) => {
    let result = {
        index: player.index,
        userId: player.userId,
        name: player.name,
        steam64Id: player.steam64Id,
        steamId: !player.isFakePlayer ? player.steamId : 'bot_' + player.name.toLowerCase(),
        eye: {
            pitch: Math.round(player.eyeAngles.pitch),
            yaw: Math.round(player.eyeAngles.yaw)
        },
        position: this.formatPosition(player),
        teamNumber: player.teamNumber,
        health: player.health,
        account: player.account,
        lifeState: player.lifeState,
        isFakePlayer: player.isFakePlayer,
        armor: player.armor,
        weapon: weaponExtractor(player.weapon),
        weapons: player.weapons.map((weapon) => {
            return weaponExtractor(weapon);
        }),
        placeName: player.placeName,
        isInBombZone: player.isInBombZone,
        isInBuyZone: player.isInBuyZone,
        isDefusing: player.isDefusing,
        hasDefuser: player.hasDefuser,
        hasHelmet: player.hasHelmet,
        hasC4: player.hasC4,
        clanTag: player.clanTag,
        isSpotted: player.isSpotted,
        spotters: player.allSpotters.map((player) => {
            return player.userId;
        }),
        spotted: player.allSpotted.map((player) => {
            return player.userId;
        }),
        isWalking: player.isWalking,
        flashDuration: player.flashDuration,
        currentEquipmentValue: player.currentEquipmentValue,
        roundStartEquipmentValue: player.roundStartEquipmentValue,
        freezeTimeEndEquipmentValue: player.freezeTimeEndEquipmentValue
    };

    //raw properties
    let rawProps = {
        'DT_CSPlayer': [
            'm_fMolotovUseTime',
            'm_fMolotovDamageTime',
            'm_flFlashMaxAlpha',
            'm_bIsControllingBot',
            'm_bHasControlledBotThisRound',
            'm_iControlledBotEntIndex',
            'm_bIsLookingAtWeapon'
        ],
        'DT_BasePlayer': [
            'm_flDuckAmount'
        ]
    };

    result._raw = {};
    Object.keys(rawProps).forEach((table) => {
        rawProps[table].forEach((key) => {
            result._raw[key] = player.getProp(table, key);
        });
    });

    return result;
};