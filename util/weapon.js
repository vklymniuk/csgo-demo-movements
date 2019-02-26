/**
 * @param {Weapon} weapon - demofile weapon object.
 * @returns {object} - weapon data.
 */
module.exports = function (weapon) {
  if (null === weapon) {
    return null;
  }

  return {
    index: weapon.itemIndex,
    name: weapon.className,
    ammo: weapon.getProp('DT_BaseCombatWeapon', 'm_iClip1'),
    prevOwner: weapon.prevOwner ? weapon.prevOwner.userId : null
  };
};