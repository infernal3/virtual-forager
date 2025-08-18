var data = "Loading", nav = {menu: 0};
const DataDefault = {
    level: 1,
    xp: 0,
    money: 0,
    tools: [null, true, false, false, false, false, false],
    currentTool: 1,
    nextUpdate: 0,
    upgrades: [0, 0, 0, 0, 0, 0],
    inventory: {logs: {Oak: 0}, cores: {Oak: 0}, special: {}},
    biome: 1,
    current: {type: 1, size: 0.5, stage: 0, stages: 1, toughness: 0, progress: 0, progressNeed: 6}
}

const LocalLoad = function () {
    if(localStorage){
        if (localStorage.getItem("virtualForagerSave")){
            var chk = "Loading";
            try {
                chk = JSON.parse(atob(localStorage.getItem("virtualForagerSave")));
                nav.menu = 0;
                console.log("Successfully loaded player data!")
            } catch(e) {
                console.log(e);
            } finally {
                data = chk;
                // insert DeepNaN logic here
            }
        }
    }
    if (data == "Loading") {
        console.log("Could not find a save/load file. Using default.")
        data = DataDefault;
        nav.menu = 0;
    }
}, LocalSave = function () {
    if(localStorage){
        try{
            console.log("Attempting to SAVE game...");
            chk = btoa(JSON.stringify(data));
            localStorage.setItem("virtualForagerSave", chk);
            console.log("Success!");
        }catch(e){
            console.log(e);
            console.log("SAVE attempt failed... Retrying in 60 seconds");
        }
    }
}