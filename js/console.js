const Console = {
    text: [],
    clear: () => {
        Console.text = [];
    },
    write: (E) => {
        Console.text[Console.text.length] += E;
    },
    writeLn: (E) => {
        var functionInput = !E ? "" : E;
        Console.text.push(functionInput);
    },
    print: () => {
        el("console").innerHTML = "";
        for (var line of Console.text) {
            el("console").innerHTML += line + "<br>";
        }
    },
};
