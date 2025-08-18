const el = e => document.getElementById(e);
const randInt = (e, t) => Math.round((Math.random() * (t - e + 1)) + e - 0.5);
const NaNCheck = e => isNaN(e) ? "0" : e;
const CBT = (e, t) => {el(`root_button_${t}`).textContent = e}
const delayCalc = () => Math.max(100,(Math.pow(0.9, data.upgrades[4]) * TOOLS[data.currentTool].speed * (data.current.toughness + 1)))
const CBS = (e, t, y) => {
    if(y) el(`root_button_${t}`).classList.add(e)
    else  el(`root_button_${t}`).classList.remove(e)
}
const calcInventory = e => {
    var delta = 0;
    for(var prop in data.inventory.logs) {
        delta += NaNCheck(data.inventory.logs[prop]) * S_DATA.logs[prop];
        if(e) data.inventory.logs[prop] = 0;
    }
    for(var prop in data.inventory.cores) {
        delta += NaNCheck(data.inventory.cores[prop]) * S_DATA.cores[prop];
        if(e) data.inventory.cores[prop] = 0;
    }
    return delta * (1 + (0.05 * data.upgrades[1]));
}
const fmt = e => e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const T_DATA = [null,
    {name: "Oak",     xp: 1,    completeXPLow: 8,    completeXPHigh: 12,   toughness: 0,  baseLogs: 12, req: 0,  cute_name: "Oak Forest"},
    {name: "Birch",   xp: 4,    completeXPLow: 40,   completeXPHigh: 55,   toughness: 2,  baseLogs: 17, req: 10, cute_name: "Birch Forest"},
    {name: "Spruce",  xp: 9,    completeXPLow: 130,  completeXPHigh: 150,  toughness: 5,  baseLogs: 44, req: 20, cute_name: "Spruce Woods"},
    {name: "Palm",    xp: 30,   completeXPLow: 400,  completeXPHigh: 450,  toughness: 19, baseLogs: 20, req: 25, cute_name: "Palm Beach"},
    {name: "Crimson", xp: 200,  completeXPLow: 6000, completeXPHigh: 8000, toughness: 80, baseLogs: 38, req: 50, cute_name: "The Nether"},
    {name: "Willow",  xp: 310,  completeXPLow: 24000,completeXPHigh: 30000,toughness: 32, baseLogs: 15, req: 75, cute_name: "Willow Wilds"},
    {name: "Pine",    xp: 13750,completeXPLow: 80000,completeXPHigh: 95000,toughness: 470,baseLogs: 90, req: 100,cute_name: "Pinerise Peak"},
    {name: "Mangrove",xp: 540,  completeXPLow: 11000,completeXPHigh: 13500,toughness: 50, baseLogs: 94, req: 100,cute_name: "Mangrove Marsh"},
]
const TOOLS = [null,
    {name: "Wooden Axe", lore: "It's made of Oak Wood.",                          sweep: 1,   cost: 0, speed: 3500},
    {name: "Rookie Axe", lore: "Basic starter axe.",                              sweep: 1.7, cost: 10, speed: 2000},
    {name: "Iron Axe", lore: "Cuts several logs at once.",                        sweep: 3.7, cost: 150, speed: 1500},
    {name: "Steel Axe", lore: "Cuts even more logs at once.",                     sweep: 5.5, cost: 750, speed: 700},
    {name: "Rusty Chainsaw", lore: "It's rusty but can still cut down trees.",    sweep: 17,  cost: 4000, speed: 1000},
    {name: "Chainsaw", lore: "Cuts down a huge amount of logs.",                  sweep: 19,  cost: 10000, speed: 300},
    {name: "Polished Chainsaw", lore: "It's better than an ordinary Chainsaw.",   sweep: 21,  cost: 50000, speed: 180},
    {name: "Treecapacitator", lore: "A forceful Axe that cuts many logs at once.",sweep: 35,  cost: 180000, speed: 50},
    {name: "Lava Axe", lore: "Cuts trees down with the power of flames.",         sweep: 85,  cost: 600000, speed: 45},
    {name: "Molten Axe", lore: "It's hotter than Lava. It's molten hot!",         sweep: 160, cost: 3750000, speed: 40},
    {name: "Diamond Axe", lore: "Made from pure diamonds.",                       sweep: 60,  cost: 24000000, speed: 16},
    {name: "Molten Chainsaw", lore: "Molten hot mechanized glory.",               sweep: 400, cost: 175000000, speed: 35},
    {name: "Infinity Axe", lore: "???",                                           sweep: 999, cost: 2147483647, speed: 32},
]
const S_DATA = {logs: {
    Oak: 1, Birch: 10, Spruce: 50, Palm: 275, Crimson: 900, Willow: 1700, Pine: 2000, Mangrove: 14000
}, cores: {
    Oak: 3, Birch: 25, Spruce: 200,Palm: 1500,Crimson: 8500,Willow: 4000, Pine: 25000,Mangrove: 610000
}};
const SHOPS = [null,
    {name: "Tools Shop", lore: "The place to buy new tools such as an axe or chainsaw."},
    {name: "Upgrades Shop", lore: "Unlock permanent upgrades for your character."},
]
const UPG = [null,
    {name: "Sweep Buff", lore: "Increase the Sweep of all tools by +5%.",       max:20, tiers: [500, 750, 1000, 1250, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 7500, 10000, 15000, 20000, 50000, 200000, 1000000, 5000000, 20000000, Infinity]},
    {name: "Salesman", lore: "Gain +5% more money from selling Logs and Cores.",max:20, tiers: [500, 500, 500, 500, 500, 500, 500, 500, 500, 1000, 2000, 5000, 10000, 15000, 20000, 50000, 200000, 1000000, 5000000, 20000000, Infinity]},
    {name: "Log Specialist", lore: "All trees drop +20% more Logs.",            max: 5, tiers: [500, 2000, 10000, 250000, 10000000, Infinity]},
    {name: "Core Specialist", lore: "All trees drop +20% more Cores.",          max: 5, tiers: [20000, 75000, 250000, 1000000, 20000000, Infinity]},
    {name: "Efficiency", lore: "Increase the cut speed of all tools by +10%.",  max: 5, tiers: [10, 2000, 100000, 2000000, 20000000, Infinity]},
    {name: "Tree Gifts", lore: "Trees have a chance to drop special rewards.",  max: 1, tiers: [1000000000, Infinity]},
]