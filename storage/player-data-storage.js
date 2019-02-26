let PlayerDataStorage = {

    constructor(demoFile) {
        this.demo = demoFile;
        this.players = {}
    },

    onPlayerMovement(event) {},

    onPlayerHurt(event) {},

    // // on(event: "item_equip", listener: (event: IEventItemEquip) => void): this;
    onItemEquiped(event) {},

    // event: "weapon_zoom_rifle", IEventWeaponZoomRifle
    onPlayerWeaponZoomRifle(event) {},

    //  event: "weapon_zoom_rifle", IEventWeaponZoomRifle
    onPlayerSpawned(event) {},

    // event: "item_pickup", listener: (event: IEventItemPickup)
    onItemPickup(event) {},

    // // on(event: "item_remove", listener: (event: IEventItemRemove) => void): this;
    onItemRemove(event) {},

    // on(event: "item_pickup", listener: (event: IEventItemPickup) => void): this;
    onAmmoPickup(event) {},

    // item_purchase
    onItemPurchase(event) {},
};