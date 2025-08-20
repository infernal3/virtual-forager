const gainXP = function(E) {
    var F = Math.floor(E * (!!data.inventory.special["Pure Wisdom Core"] ? 1 + (0.01 * data.inventory.special["Pure Wisdom Core"]) : 1))
    data.xp += F;
    Console.writeLn(` + ${fmt(F)} XP`);
    if(data.xp < levelingFormula(data.level)) return;
    var over = data.xp, passed = 0, old = data.level;
    while(over >= levelingFormula(data.level)) {
        passed++;
        over -= levelingFormula(data.level);
        data.level++;
    }
    data.xp = over;
    Console.writeLn(`<strong>${passed == 1 ? "" : "x" + passed} LEVEL UP</strong> ${fmt(old)} -> ${fmt(data.level)}`);
}, levelingFormula = function(E) {
    var t = 100 * (Math.pow(1.05, E - 1) + (0.5 * (E - 1)));
    return Math.floor(t * Math.pow(10, 2 - Math.floor(Math.log10(t)))) * Math.pow(10, Math.floor(Math.log10(t)) - 2);
}, gainLog = function(E, T) {
    var F = Math.floor(E * (1 + (data.upgrades[2] * 0.2)));
    data.inventory.logs[T] += F;
    Console.writeLn(` + ${fmt(F)} ${T+" Log"}`);
}, gainCore = function(E, T) {
    var F = Math.floor(E * (1 + (data.upgrades[3] * 0.2)) * (!!data.inventory.special["Pure Tree Core"] ? 1 + (0.01 * data.inventory.special["Pure Tree Core"]) : 1));
    data.inventory.cores[T] += F;
    Console.writeLn(` + ${fmt(F)} ${T+" Core"}`);
}, completeTree = function(E) {
    Console.writeLn();
    Console.writeLn(data.upgrades[5]>0 ? "Tree Gift" : "Tree completed!");
    FillBiomeBase();
    FillTree();
    gainXP(Math.ceil(randInt(T_DATA[E.type].completeXPLow, T_DATA[E.type].completeXPHigh) * E.size));
    gainCore(Math.ceil(randInt(4, 6) * E.size), T_DATA[E.type].name);
    var temp = Math.random() + 0.5,temp4 = data.upgrades[5] > 0 ? 2 : 1;
    
    gainSpecial("Pure Core", 0.01 * temp4);
    gainSpecial("Pure Sweep Core", 0.0005 * temp4);
    gainSpecial("Pure Wisdom Core", 0.0002 * temp4);
    gainSpecial("Pure Tree Core", 0.001 * temp4);
    gainSpecial("Tree the Fish", 0.00001);
    
    data.current = {type: data.biome, size: temp, stage: 0, stages: 1, toughness: T_DATA[data.biome].toughness, progress: 0, progressNeed: Math.round(T_DATA[data.biome].baseLogs * temp)}
}, gainSpecial = function(E, T) {
    if(Math.random() > T) return;
    data.inventory.special[E] = !!data.inventory.special[E] ? data.inventory.special[E] + 1 : 1;
    Console.writeLn(`<strong>RARE REWARD!</strong> ${E} (${T*100}% chance)`);
}