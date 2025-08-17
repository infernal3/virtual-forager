const el = e => document.getElementById(e);
const randInt = (e, t) => Math.round((Math.random() * (t - e + 1)) + e - 0.5);
const NaNCheck = e => isNaN(e) ? "0" : e;
const CBT = (e, t) => {el(`root_button_${t}`).textContent = e}

const T_DATA = [null,
    {name: "Oak", xp: 1, completeXPLow: 8, completeXPHigh: 12, toughness: 0, baseLogs: 12, req: 0, cute_name: "Oak Forest"},
    {name: "Birch", xp: 4, completeXPLow: 40, completeXPHigh: 55, toughness: 2, baseLogs: 17, req: 10, cute_name: "Birch Forest"},
    {name: "Spruce", xp: 9, completeXPLow: 130, completeXPHigh: 150, toughness: 5, baseLogs: 44, req: 20, cute_name: "Spruce Woods"},
    {name: "Palm", xp: 30, completeXPLow: 400, completeXPHigh: 450, toughness: 19, baseLogs: 20, req: 25, cute_name: "Beachside"},
    {name: "Crimson", xp: 200, completeXPLow: 6000, completeXPHigh: 8000, toughness: 80, baseLogs: 38, req: 50, cute_name: "The Nether"},
    {name: "Pine", xp: 3750, completeXPLow: 80000, completeXPHigh: 100000, toughness: 470, baseLogs: 60, req: 100, cute_name: "Pinerise Peak"},
    {name: "Mangrove", xp: 540, completeXPLow: 11000, completeXPHigh: 13500, toughness: 50, baseLogs: 140, req: 100, cute_name: "Mangrove Marsh"},
]
const TOOLS = [null,
    {name: "Wooden Axe", lore: "It's made of Oak Wood.", sweep: 1, cost: 0, speed: 3500},
    {name: "Rookie Axe", lore: "Basic starter axe.", sweep: 1.7, cost: 10, speed: 2000},
    {name: "Iron Axe", lore: "Cuts several logs at once.", sweep: 3.7, cost: 150, speed: 1500},
    {name: "Steel Axe", lore: "Cuts even more logs at once.", sweep: 5.5, cost: 750, speed: 700},
    {name: "Rusty Chainsaw", lore: "It's rusty but can still cut down trees.", sweep: 9, cost: 4000, speed: 666},
    {name: "Chainsaw", lore: "Cuts down a huge amount of logs.", sweep: 19, cost: 10000, speed: 300},
    {name: "Polished Chainsaw", lore: "It's slightly better than an ordinary Chainsaw.", sweep: 21, cost: 50000, speed: 180},
    {name: "Treecapacitator", lore: "A forceful Axe that cuts many logs at once.", sweep: 35, cost: 250000, speed: 50},
    {name: "Lava Axe", lore: "Cuts trees down with the power of flames.", sweep: 85, cost: 1000000, speed: 40},
    {name: "Molten Axe", lore: "It's hotter than Lava. It's molten hot!", sweep: 95, cost: 10000000, speed: 33},
]
const S_DATA = {logs: {
    Oak: 1, Birch: 10, Spruce: 50, Palm: 275, Crimson: 900, Pine: 2000, Mangrove: 14000
}, cores: {
    Oak: 3, Birch: 25, Spruce: 200, Palm: 1500, Crimson: 10000, Pine: 25000, Mangrove: 610000
}}
