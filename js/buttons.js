const LoadFunction = function () {
    LocalLoad();
},Root1Handler = function () {
    switch (nav.menu) {
        case 0:
            Forage();
            break;
        case 4:
            PurchaseTool();
            break;
    }
},Root2Handler = function () {
    switch (nav.menu) {
        case 0:
            SellAll();
            break;
        case 4:
            nav.index = Math.max(nav.index - 1, 0);
            PrintShop();
            break;
    }
},Root3Handler = function () {
    switch (nav.menu) {
        case 0:
            nav.menu = 4;
            nav.index = 0;
            CBT("PURCHASE", 1);
            CBT("PREVIOUS", 2);
            CBT("NEXT", 3);
            PrintShop();
            break;
        case 4:
            nav.index = Math.min(nav.index + 1, 5);
            PrintShop();
            break;
    }
},Root4Handler = function () {
    switch (nav.menu) {
        case 0:
            
            break;
        case 4:
            nav.menu = 0;
            nav.index = 0;
            CBT("FORAGE", 1);
            CBT("SELL", 2);
            CBT("SHOP", 3);
            Console.clear();
            Console.writeLn("Exited the shop.")
            Console.print();
            break;
    }
},Root5Handler = function () {
    window.location.href = "https://infernal3.github.io/#"
},Root6Handler = function () {

},Forage = function() {
    Console.clear();
        if(data.current) {
            var sweep = Math.floor(TOOLS[data.currentTool].sweep);
            if(Math.random() < (TOOLS[data.currentTool].sweep - sweep)) sweep++;
            var amt = Math.min(Math.floor(sweep / (data.current.toughness + 1)), data.current.progressNeed - data.current.progress);
            data.current.progress += amt;
            Console.writeLn(`You cut ${amt} log${amt == 1 ? "" : "s"}.`);
            gainXP(T_DATA[data.current.type].xp * amt);
            gainLog(amt, T_DATA[data.current.type].name);
            
            Console.writeLn(`The tree stage is now ${(data.current.progress * 100 / data.current.progressNeed).toFixed(2)}% complete!`);
            if (data.current.progress >= data.current.progressNeed) {
                data.current.stage++;
                if(data.current.stage >= data.current.stages) {
                    // Tree Complete
                    completeTree(data.current);
                } else {
                    Console.writeLn();
                    Console.writeLn("Tree stage completed!");
                    data.current.progress = 0;
                }
            }
        }
    Console.print();
},SellAll = function() {
    Console.clear();
    var delta = 0;
    for(var prop in data.inventory.logs) {
        delta += NaNCheck(data.inventory.logs[prop]) * 1;
        data.inventory.logs[prop] = 0;
    }
    for(var prop in data.inventory.cores) {
        delta += NaNCheck(data.inventory.cores[prop]) * 3;
        data.inventory.cores[prop] = 0;
    }
    if(delta == 0) {
        Console.writeLn("You tried to sell your entire inventory...");
        Console.writeLn("It was empty.");
    }
    else {
        Console.writeLn("You sold your entire inventory.");
        Console.writeLn(`+${delta} money`);
    }
    data.money += delta;
    Console.print();
},PrintShop = function() {
    Console.clear();
    Console.writeLn("Tools Shop");
    Console.writeLn(`You have ${data.money} money.`);
    Console.writeLn();
    Console.writeLn(`Currently selected item: ${TOOLS[nav.index + 1].name} - ${data.tools[nav.index + 1] ? "PURCHASED" : "Cost " + TOOLS[nav.index + 1].cost + " money"}`);
    Console.writeLn(`<em>${TOOLS[nav.index + 1].lore}</em>`);
    Console.writeLn();
    if (nav.index > 0) Console.writeLn(`PREVIOUS item: ${TOOLS[nav.index].name}`);
    if (nav.index < 5) Console.writeLn(`NEXT item: ${TOOLS[nav.index + 2].name}`);
    Console.print();
},PurchaseTool = function() {
    if(data.tools[nav.index + 1] || data.money < TOOLS[nav.index + 1].cost) return;
    data.money -= TOOLS[nav.index + 1].cost;
    data.tools[nav.index + 1] = true;
    data.currentTool = nav.index + 1;
    PrintShop();
}
window.addEventListener("load", LoadFunction, {passive: true});
el("root_button_1").addEventListener("click", Root1Handler, {passive: true});
el("root_button_2").addEventListener("click", Root2Handler, {passive: true});
el("root_button_3").addEventListener("click", Root3Handler, {passive: true});
el("root_button_4").addEventListener("click", Root4Handler, {passive: true});
el("root_button_5").addEventListener("click", Root5Handler, {passive: true});
el("root_button_6").addEventListener("click", Root6Handler, {passive: true});