const cv = () => el("canvas");
const cx = () => cv().getContext("2d");
const Rect = (x,y,w,h,s) => {
    cx().fillStyle = s;
    cx().fillRect(x,y,w,h);
}
const FillBiomeBase = () => {
    cx().reset();
    Rect(0,0,window.innerWidth,window.innerHeight*0.8,BIOME_COLORS[4][data.biome]);
    Rect(0,window.innerHeight*0.8,window.innerWidth,window.innerHeight*0.2,BIOME_COLORS[5][data.biome]);
    Rect(0,window.innerHeight*0.8-7,window.innerWidth,15,BIOME_COLORS[6][data.biome]);
}
const BIOME_COLORS = [null,
    [null,"#5f492c","#c6c6c6","#3f2f1f","#ab6f37","#44243a","#281b12","#604624","#36291b"],
    [null,"#487a25","#45532c","#283e28","#6e8a35","#791010","#0a5927","#487a25","#115618"],
    [null,"#775b37","#08081a","#f7f7f7","#764d26","#ff3d11","#2f2b10","#775b37","#74b625"],
    [null,"#c3e5ff","#c1e7fd","#94d1ff","#c3e5ff","#ffa689","#dee5ff","#c3e5ff","#cbd4df"],
    [null,"#7c4009","#7c4009","#7c4009","#7c4009","#632727","#4a2706","#7c4009","#4a2706"],
    [null,"#189226","#189226","#f7f7f7","#84d625","#b31e1e","#115618","#189226","#115618"]
]

const FillTree = () => {
    var c0 = BIOME_COLORS[1][data.biome], c1 = BIOME_COLORS[2][data.biome], c2 = BIOME_COLORS[3][data.biome], w = window.innerWidth, h = window.innerHeight;
    if(w < 800 || h < 600) return;
    switch(data.biome){
        case 1:
        case 5:
            Rect(w*.5-20,h*.8-207,40,200,c0);
            Rect(w*.5-90,h*.8-357,180,120,c1);
            Rect(w*.5-60,h*.8-387,120,180,c1);
            break;
        case 2:
            Rect(w*.5-20,h*.8-207,40,200,c0);
            Rect(w*.5-65,h*.8-357,130,120,c1);
            Rect(w*.5-40,h*.8-417,80,210,c1);
            Rect(w*.5-20,h*.8-197,8,3,c2);
            Rect(w*.5+8,h*.8-170,9,3,c2);
            Rect(w*.5-12,h*.8-155,8,3,c2);
            Rect(w*.5+12,h*.8-110,7,3,c2);
            Rect(w*.5-19,h*.8-99,8,3,c2);
            Rect(w*.5-1,h*.8-65,8,3,c2);
            Rect(w*.5+5,h*.8-30,8,3,c2);
            Rect(w*.5-14,h*.8-10,7,3,c2);
            break;
        case 3:
            Rect(w*.5-20,h*.8-97,40,90,c0);
            Rect(w*.5-28,h*.8-40,56,33,c0);
            Rect(w*.5-50,h*.8-347,100,30,c1);
            Rect(w*.5-50,h*.8-352,100,5,c2);
            Rect(w*.5-60,h*.8-267,120,30,c1);
            Rect(w*.5-60,h*.8-272,120,5,c2);
            Rect(w*.5-65,h*.8-197,130,30,c1);
            Rect(w*.5-65,h*.8-202,130,5,c2);
            Rect(w*.5-70,h*.8-127,140,30,c1);
            Rect(w*.5-70,h*.8-132,140,5,c2);
            Rect(w*.5-20,h*.8-417,40,320,c1);
            Rect(w*.5-20,h*.8-422,40,5,c2);
            Rect(w*.5-30,h*.8-267,60,170,c1);
            break;
        case 4:
            Rect(w*.5-25,h*.8-337,50,330,c0);
            cx().beginPath();
            cx().fillStyle = c1;
            cx().moveTo(w*.5-35,h*.8-337);
            cx().lineTo(w*.5-102,h*.8-300);
            cx().lineTo(w*.5-155,h*.8-210);
            cx().lineTo(w*.5-35,h*.8-317);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c1;
            cx().moveTo(w*.5-15,h*.8-337);
            cx().lineTo(w*.5-45,h*.8-235);
            cx().lineTo(w*.5-95,h*.8-195);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c1;
            cx().moveTo(w*.5+10,h*.8-337);
            cx().lineTo(w*.5+55,h*.8-285);
            cx().lineTo(w*.5+75,h*.8-185);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c1;
            cx().moveTo(w*.5+35,h*.8-337);
            cx().lineTo(w*.5+110,h*.8-291);
            cx().lineTo(w*.5+150,h*.8-220);
            cx().lineTo(w*.5+35,h*.8-317);
            cx().fill();
            cx().beginPath();
            Rect(w*.5-35,h*.8-337,70,20,c1);
            break;
        case 6:
            Rect(w*.5-20,h*.8-197,40,190,c0);
            Rect(w*.5-28,h*.8-67,56,60,c0);
            Rect(w*.5-33,h*.8-40,66,33,c0);
            Rect(w*.5-70,h*.8-200,140,35,c1);
            Rect(w*.5-105,h*.8-170,210,25,c1);
            Rect(w*.5-100,h*.8-155,15,60,c1);
            Rect(w*.5-75,h*.8-155,15,55,c1);
            Rect(w*.5-45,h*.8-155,15,62,c1);
            Rect(w*.5+35,h*.8-155,15,57,c1);
            Rect(w*.5+65,h*.8-155,15,48,c1);
            Rect(w*.5+90,h*.8-155,15,65,c1);
            break;
        case 7:
            Rect(w*.5-20,h*.8-97,40,90,c0);
            Rect(w*.5-24,h*.8-40,48,40,c0);
            Rect(w*.5-40,h*.8-400,80,13,c1);
            Rect(w*.5-48,h*.8-360,96,13,c1);
            Rect(w*.5-50,h*.8-337,100,15,c1);
            Rect(w*.5-52,h*.8-305,104,15,c1);
            Rect(w*.5-60,h*.8-267,120,15,c1);
            Rect(w*.5-62,h*.8-225,124,16,c1);
            Rect(w*.5-65,h*.8-197,130,17,c1);
            Rect(w*.5-66,h*.8-160,132,20,c1);
            Rect(w*.5-70,h*.8-127,140,20,c1);
            Rect(w*.5-20,h*.8-417,40,320,c1);
            Rect(w*.5-10,h*.8-477,20,380,c1);
            break;
        case 8:
            cx().beginPath();
            cx().fillStyle = c0;
            cx().arc(w*.5-30,h*.8-7,160,Math.PI,Math.PI*3/2,false);
            cx().arc(w*.5-30,h*.8-7,120,Math.PI*3/2,Math.PI,true);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c0;
            cx().arc(w*.5+30,h*.8-7,150,Math.PI*3/2,Math.PI*2,false);
            cx().arc(w*.5+30,h*.8-7,110,Math.PI*2,Math.PI*3/2,true);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c0;
            cx().arc(w*.5+45,h*.8-7,140,Math.PI,4.5,false);
            cx().arc(w*.5+45,h*.8-7,105,4.5,Math.PI,true);
            cx().fill();
            cx().beginPath();
            Rect(w*.5-30,h*.8-310,60,200,c0);
            cx().beginPath();
            cx().fillStyle = c0;
            cx().moveTo(w*.5-30,h*.8-220);
            cx().lineTo(w*.5-100,h*.8-310);
            cx().lineTo(w*.5-65,h*.8-310);
            cx().lineTo(w*.5-30,h*.8-255);
            cx().fill();
            cx().beginPath();
            cx().fillStyle = c0;
            cx().moveTo(w*.5+30,h*.8-220);
            cx().lineTo(w*.5+100,h*.8-310);
            cx().lineTo(w*.5+65,h*.8-310);
            cx().lineTo(w*.5+30,h*.8-255);
            cx().fill();
            cx().beginPath();
            Rect(w*.5-160,h*.8-390,320,80,c1);
            Rect(w*.5-190,h*.8-375,380,50,c1);
            Rect(w*.5-155,h*.8-310,4,45,c2);
            Rect(w*.5+140,h*.8-310,4,50,c2);
            Rect(w*.5+180,h*.8-325,4,40,c2);
            break;
    }
}
const ResizeCanvas = () => {
    console.log("resize");
    cv().width = window.innerWidth;
    cv().height = window.innerHeight;
    FillBiomeBase();
    FillTree();
    Rect(0, 0.8*window.innerHeight-T_DATA[data.current.type].height-7, window.innerWidth, T_DATA[data.current.type].height * data.current.progress / data.current.progressNeed, BIOME_COLORS[4][data.biome])
}