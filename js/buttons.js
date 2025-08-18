const LoadFunction = function () {
    LocalLoad();
    PrintMenu();
},Root1Handler = function () {
    switch (nav.menu) {
        case 0:
        case 1:
            nav.menu = 0;
            Forage();
            break;
        case 2:
            nav.menu = 10;
            nav.index = 0;
            CBT("SELECT", 1);
            CBT("PREVIOUS", 2);
            CBT("NEXT", 3);
            CBT("BACK", 4);
            PrintBiome();
            break;
        case 3:
            nav.menu = nav.index + 4;
            nav.index = 0;
            CBT(nav.menu == 4 ? "SELECT" : "PURCHASE", 1);
            if(nav.menu == 4 && data.currentTool == 1) CBS("disabled", 1, true);
            CBT("PREVIOUS", 2);
            CBT("NEXT", 3);
            CBT("BACK", 4);
            if(nav.menu == 4) PrintShop();
            if(nav.menu == 5) PrintUpgradeShop();
            break;
        case 4:
            PurchaseTool();
            break;
        case 5:
            PurchaseUpgrade();
            break;
        case 10:
            SelectBiome();
            break;
    }
},Root2Handler = function () {
    switch (nav.menu) {
        case 0:
        case 1:
            nav.menu = 0;
            SellAll();
            break;
        case 3:
            nav.index = Math.max(nav.index - 1, 0);
            PrintShopMenu();
            break;
        case 4:
            nav.index = Math.max(nav.index - 1, 0);
            PrintShop();
            break;
        case 5:
            nav.index = Math.max(nav.index - 1, 0);
            PrintUpgradeShop();
            break;
        case 10:
            nav.index = Math.max(nav.index - 1, 0);
            PrintBiome();
            break;
    }
},Root3Handler = function () {
    switch (nav.menu) {
        case 0:
        case 1:
            nav.menu = 3;
            nav.index = 0;
            CBT("OPEN", 1);
            CBT("PREVIOUS", 2);
            CBT("NEXT", 3);
            CBT("BACK", 4);
            PrintShopMenu();
            break;
        case 3:
            nav.index = Math.min(nav.index + 1, SHOPS.length - 2);
            PrintShopMenu();
            break;
        case 4:
            nav.index = Math.min(nav.index + 1, TOOLS.length - 2);
            PrintShop();
            break;
        case 5:
            nav.index = Math.min(nav.index + 1, UPG.length - 2);
            PrintUpgradeShop();
            break;
        case 10:
            nav.index = Math.min(nav.index + 1, T_DATA.length - 2);
            PrintBiome();
            break;
    }
},Root4Handler = function () {
    switch (nav.menu) {
        case 0:
            nav.menu = 1;
            PrintMenu();
            break;
        case 1:
            nav.menu = 2;
            nav.index = 0;
            CBT("BIOMES", 1);
            CBT("?", 2);
            CBT("?", 3);
            CBT("BACK", 4);
            PrintMenu();
            break;
        case 2:
        case 4:
        case 3:
        case 5:
        case 10:
            CBS("disabled", 1, false);
            CBS("disabled", 2, false);
            CBS("disabled", 3, false);
            nav.menu = 1;
            nav.index = 0;
            CBT("FORAGE", 1);
            CBT("SELL", 2);
            CBT("SHOP", 3);
            CBT("MENU", 4);
            PrintMenu();
            break;
    }
},Root5Handler = function () {
    window.location.href = "https://infernal3.github.io/#"
},Root6Handler = function () {

},Forage = function () {
    Console.clear();
        if(Date.now() >= data.nextUpdate) {
            var sweep = Math.floor(TOOLS[data.currentTool].sweep * (1 + (0.05 * data.upgrades[0])));
            if(Math.random() < (TOOLS[data.currentTool].sweep - sweep)) sweep++;
            var sweep2 = Math.floor(sweep / (data.current.toughness + 1));
            if(Math.random() < ((sweep / (data.current.toughness + 1)) - sweep2)) sweep2++;
            var amt = Math.min(sweep2, data.current.progressNeed - data.current.progress);

            data.current.progress += amt;
            Console.writeLn(`${T_DATA[data.biome].name} Tree (${data.current.toughness} Toughness)`);
            if(amt < 1) Console.writeLn(`WARNING: This tree's toughness is too high for you! Use a better tool or lower your biome.`);
            Console.writeLn(`You cut ${amt} log${amt == 1 ? "" : "s"}.`);
            gainXP(T_DATA[data.current.type].xp * amt);
            gainLog(amt, T_DATA[data.current.type].name);
            
            Console.writeLn(`The tree stage is now ${(data.current.progress * 100 / data.current.progressNeed).toFixed(2)}% complete!`);
            if (data.current.progress >= data.current.progressNeed) {
                data.current.stage++;
                if(data.current.stage >= data.current.stages) {
                    completeTree(data.current);
                } else {
                    Console.writeLn();
                    Console.writeLn("Tree stage completed!");
                    data.current.progress = 0;
                }
            }
            data.nextUpdate = Date.now() + delayCalc()
        }
        else {
            Console.writeLn(`You're foraging too fast! Wait ${((data.nextUpdate - Date.now()) / 1000).toFixed(2)}s before foraging again.`);
            Console.writeLn(`<em>Your foraging cooldown: ${(((delayCalc()))/1000).toFixed(2)}s${delayCalc() == 100 ? " (softcapped)" : ""}</em>`);
            Console.writeLn();
            Console.writeLn("If you forage too fast your tool will break. Upgrade your tool to prevent this")
        }
    Console.print();
},SellAll = function () {
    Console.clear();
    var delta = calcInventory(true);
    data.money += delta;
    if(delta == 0) {
        Console.writeLn("You tried to sell your inventory...");
        Console.writeLn("It was empty.");
    }
    else {
        Console.writeLn("You sold your entire inventory.");
        Console.writeLn(`+${fmt(delta)} money`);
        Console.writeLn(`You now have ${fmt(data.money)} money.`);
    }
    Console.print();
},PrintShop = function () {
    CBT(data.tools[nav.index + 1] ? "SELECT" : "PURCHASE", 1);
    if(data.currentTool == nav.index + 1 || !data.tools[nav.index + 1]) CBS("disabled", 1, true);
    else CBS("disabled", 1, false);
    Console.clear();
    Console.writeLn("Tools Shop");
    Console.writeLn(`Current tool: ${TOOLS[data.currentTool].name}`);
    Console.writeLn(`You have ${fmt(data.money)} money.`);
    Console.writeLn();
    Console.writeLn(`Currently viewing: ${TOOLS[nav.index + 1].name} - ${data.tools[nav.index + 1] ? "PURCHASED" : "Cost " + fmt(TOOLS[nav.index + 1].cost) + " money"}`);
    Console.writeLn(`<em>${TOOLS[nav.index + 1].lore}</em>`);
    Console.writeLn(`Tool Stats: ${TOOLS[nav.index + 1].sweep} sweep, ${(1000 / TOOLS[nav.index + 1].speed).toFixed(2)} cutting speed`);
    Console.writeLn();
    if (nav.index > 0) {
        Console.writeLn(`PREVIOUS item: ${TOOLS[nav.index].name}`);
        CBS("disabled", 2, false);
    } else CBS("disabled", 2, true);
    if (nav.index < TOOLS.length - 2) {
        Console.writeLn(`NEXT item: ${TOOLS[nav.index + 2].name}`);
        CBS("disabled", 3, false);
    } else CBS("disabled", 3, true);
    Console.print();
},PurchaseTool = function () {
    if(data.tools[nav.index + 1]) {
        data.currentTool = nav.index + 1;
    } else {
        if(data.money < TOOLS[nav.index + 1].cost) return;
        data.money -= TOOLS[nav.index + 1].cost;
        data.tools[nav.index + 1] = true;
        data.currentTool = nav.index + 1;
    } PrintShop();
},PrintMenu = function () {
    Console.clear();
    Console.writeLn("Virtual Forager Main Menu");
    Console.writeLn("<strong>Your Profile</strong>");
    Console.writeLn();
    Console.writeLn(`You have ${fmt(data.money)} money.`);
    Console.writeLn(`<strong>Level ${data.level}</strong>, ${fmt(data.xp)}/${fmt(levelingFormula(data.level))} XP to next level`);
    Console.writeLn(`Current tool: ${TOOLS[data.currentTool].name}`);
    Console.writeLn(`Current biome: ${T_DATA[data.biome].cute_name}`);
    Console.writeLn();
    Console.writeLn(`<strong>Inventory</strong> ${calcInventory(false) == 0 ? "" : `(Sell Value: ${calcInventory(false)} money)`}`);
    for(var prop in data.inventory.logs) {
        if(!!data.inventory.logs[prop]) Console.writeLn(`${fmt(data.inventory.logs[prop])} ${prop} Log`);
    }
    for(var prop in data.inventory.cores) {
        if(!!data.inventory.cores[prop]) Console.writeLn(`${fmt(data.inventory.cores[prop])} ${prop} Core`);
    }
    Console.print();
},PrintBiome = function () {
    if(data.biome == nav.index + 1 || data.level < T_DATA[nav.index + 1].req) CBS("disabled", 1, true);
    else CBS("disabled", 1, false);
    Console.clear();
    Console.writeLn("Biome Selection");
    Console.writeLn(`Current biome: ${T_DATA[data.biome].cute_name}`);
    Console.writeLn();
    Console.writeLn(`Currently viewing: ${T_DATA[nav.index + 1].cute_name} - ${data.level >= T_DATA[nav.index + 1].req ? "" : "LOCKED"} (Level ${T_DATA[nav.index + 1].req})`);
    Console.writeLn();
    if (nav.index > 0) {
        Console.writeLn(`PREVIOUS biome: ${T_DATA[nav.index].cute_name}`);
        CBS("disabled", 2, false);
    } else CBS("disabled", 2, true);
    if (nav.index < T_DATA.length - 2) {
        Console.writeLn(`NEXT biome: ${T_DATA[nav.index + 2].cute_name}`);
        CBS("disabled", 3, false);
    } else CBS("disabled", 3, true);
    Console.print();
},SelectBiome = function () {
    if(data.level >= T_DATA[nav.index + 1].req) {
        data.biome = nav.index + 1;
        var temp = Math.random() + 0.5;
        data.current = {type: data.biome, size: temp, stage: 0, stages: 1, toughness: T_DATA[data.biome].toughness, progress: 0, progressNeed: Math.round(T_DATA[data.biome].baseLogs * temp)}

        if(!data.inventory.logs[T_DATA[nav.index + 1].name]) data.inventory.logs[T_DATA[nav.index + 1].name] = 0
        if(!data.inventory.cores[T_DATA[nav.index + 1].name]) data.inventory.cores[T_DATA[nav.index + 1].name] = 0
    }
    PrintBiome();
},PrintShopMenu = function () {
    Console.clear();
    Console.writeLn("The Shop");
    Console.writeLn(`You have ${fmt(data.money)} money.`);
    Console.writeLn("Select which area of the shop to open");
    Console.writeLn();
    Console.writeLn(`Currently viewing: ${SHOPS[nav.index + 1].name}`);
    Console.writeLn(`<em>${SHOPS[nav.index + 1].lore}</em>`);
    Console.writeLn();
    if (nav.index > 0) {
        Console.writeLn(`PREVIOUS shop: ${SHOPS[nav.index].name}`);
        CBS("disabled", 2, false);
    } else CBS("disabled", 2, true);
    if (nav.index < SHOPS.length - 2) {
        Console.writeLn(`NEXT shop: ${SHOPS[nav.index + 2].name}`);
        CBS("disabled", 3, false);
    } else CBS("disabled", 3, true);
    Console.print();
},PrintUpgradeShop = function () {
    if(data.money < UPG[nav.index + 1].tiers[data.upgrades[nav.index]] || data.upgrades[nav.index] >= UPG[nav.index + 1].max) CBS("disabled", 1, true);
    else CBS("disabled", 1, false);
    Console.clear();
    Console.writeLn("Upgrades Shop");
    Console.writeLn(`You have ${fmt(data.money)} money.`);
    Console.writeLn();
    Console.writeLn(`Currently viewing: ${UPG[nav.index + 1].name} (${data.upgrades[nav.index]}/${UPG[nav.index + 1].max}) - ${data.upgrades[nav.index] == UPG[nav.index + 1].max ? "MAXED OUT!" : `Cost ${fmt(UPG[nav.index + 1].tiers[data.upgrades[nav.index]])} money`}`);
    Console.writeLn(`<em>${UPG[nav.index + 1].lore}</em>`);
    Console.writeLn();
    if (nav.index > 0) {
        Console.writeLn(`PREVIOUS upgrade: ${UPG[nav.index].name}`);
        CBS("disabled", 2, false);
    } else CBS("disabled", 2, true);
    if (nav.index < UPG.length - 2) {
        Console.writeLn(`NEXT upgrade: ${UPG[nav.index + 2].name}`);
        CBS("disabled", 3, false);
    } else CBS("disabled", 3, true);
    Console.print();
},PurchaseUpgrade = function () {
    if(data.money < UPG[nav.index + 1].tiers[data.upgrades[nav.index]] || data.upgrades[nav.index] >= UPG[nav.index + 1].max) return;
    data.money -= UPG[nav.index + 1].tiers[data.upgrades[nav.index]];
    data.upgrades[nav.index]++;
    PrintUpgradeShop();
}
// nav.menu note:
// 0 = Foraging, 1 = Main Menu, 2 = Main Menu Extras, 3 = Shop Menu, 4 = Shop Tools, 5 = Shop Upgrades, 6-7: NYI shop, 8-9: NYI, 10: Biome menu
window.addEventListener("load", LoadFunction, {passive: true});
el("root_button_1").addEventListener("click", Root1Handler, {passive: true});
el("root_button_2").addEventListener("click", Root2Handler, {passive: true});
el("root_button_3").addEventListener("click", Root3Handler, {passive: true});
el("root_button_4").addEventListener("click", Root4Handler, {passive: true});
el("root_button_5").addEventListener("click", Root5Handler, {passive: true});
el("root_button_6").addEventListener("click", Root6Handler, {passive: true});
