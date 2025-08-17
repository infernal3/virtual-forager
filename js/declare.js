const el = e => document.getElementById(e);
const randInt = (e, t) => Math.round((Math.random() * (t - e + 1)) + e - 0.5);
const NaNCheck = e => isNaN(e) ? "0" : e;
const CBT = (e, t) => {el(`root_button_${t}`).textContent = e}

const T_DATA = [null,
    {name: "Oak", xp: 1, completeXPLow: 8, completeXPHigh: 12, toughness: 0, baseLogs: 12}
]
const TOOLS = [null,
    {name: "Wooden Axe", lore: "It's made of Oak Wood.", sweep: 1, cost: 0},
    {name: "Rookie Axe", lore: "Basic starter axe.", sweep: 1.7, cost: 10},
    {name: "Iron Axe", lore: "Cuts several logs at once.", sweep: 3.7, cost: 150},
    {name: "Steel Axe", lore: "Cuts even more logs at once.", sweep: 5.5, cost: 750},
    {name: "Rusty Chainsaw", lore: "It's rusty but can still cut down trees.", sweep: 9, cost: 4000},
    {name: "Chainsaw", lore: "Cuts down entire trees.", sweep: 19, cost: 10000}
]