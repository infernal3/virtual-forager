const Console = {
    text: [],
    clear: () => {
        Console.text = [];
    },
    write: E => {
        Console.text[Console.text.length] += E;
    },
    writeLn: E => {
        var D = !E ? "" : E;
        Console.text.push(D);
    },
    print: () => {
        el("console").innerHTML = "";
        for(var line of Console.text){
            el("console").innerHTML += line + "<br>";
        }
    }
}