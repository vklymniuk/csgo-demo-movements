let NadeDataStorage = {

    constructor(demoFile) {
        this.demo = demoFile;
        this.nades = {}
    },

    onNadeDetected(nade) {},

    onNadeMovementDetected(nade) {},

    //  event: "hegrenade_detonate", listener: (event: IEventHegrenadeDetonate) => void
    onHeDetonate(event) {},

    // event: "grenade_bounce", listener: (event: IEventGrenadeBounce) => void
    onGrenadeBounce(event) {},

    // event: "flashbang_detonate", listener: (event: IEventFlashbangDetonate) => void
    onFlashDetonate(event) {},

    // event: "smokegrenade_detonate", listener: (event: IEventSmokegrenadeDetonate) => void
    onSmokeGrenadeDetonade(event) {},

    // event: "smokegrenade_expired",listener: (event: IEventSmokegrenadeExpired) => void
    onSmokeGrenadeExpired(event) {},

    // event: "molotov_detonate", listener: (event: IEventMolotovDetonate) => void
    onMolotovDetonade(event) {},

    // event: "decoy_detonate", listener: (event: IEventDecoyDetonate) => void
    onDecoyDetonade(event) {},

    // event: "decoy_started", listener: (event: IEventDecoyStarted) => void
    onDecoyStarted(event) {},

    // event: "tagrenade_detonate", listener: (event: IEventTagrenadeDetonate) => void
    onTagrenadeDetonate(event) {},

    // event: "inferno_startburn", listener: (event: IEventInfernoStartburn) => void
    onInfernoStartburn(event) {},

    // event: "inferno_expire", listener: (event: IEventInfernoExpire) => void
    onInfernoExpire(event) {},

    // event: "inferno_extinguish", listener: (event: IEventInfernoExtinguish) => void
    onInfernoExtinguish(event) {},

    //  event: "decoy_firing", listener: (event: IEventDecoyFiring) => void
    onDecoyFiring(event) {},
};
