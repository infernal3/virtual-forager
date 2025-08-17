const gainXP = function(E) {
    data.xp += E;
    Console.writeLn(` + ${E} XP`);
    if(data.xp < levelingFormula(data.level)) return;
    var over = data.xp, passed = 0, old = data.level;
    while(over >= levelingFormula(data.level)) {
        passed++;
        over -= levelingFormula(data.level);
        data.level++;
    }
    data.xp = over;
    if(passed <= 1) {
        Console.writeLn(`<strong>LEVEL UP</strong>${passed == 1 ? "" : "x" + passed} ${old} -> ${data.level}`);
    }
}, levelingFormula = function(E) {
    return 100;
}, gainLog = function(E, T) {
    data.inventory.logs[T] += E;
    Console.writeLn(` + ${E} ${T+" Log"}`);
}, gainCore = function(E, T) {
    data.inventory.cores[T] += E;
    Console.writeLn(` + ${E} ${T+" Core"}`);
}, completeTree = function(E) {
    Console.writeLn();
    Console.writeLn("Tree completed!");
    gainXP(Math.ceil(randInt(T_DATA[E.type].completeXPLow, T_DATA[E.type].completeXPHigh) * E.size));
    gainCore(Math.ceil(randInt(4, 6) * E.size), T_DATA[E.type].name);
    var temp = Math.random() + 0.5;
    data.current = {type: data.biome, size: temp, stage: 0, stages: 1, toughness: T_DATA[E.type].toughness, progress: 0, progressNeed: Math.round(T_DATA[E.type].baseLogs * temp)}
}