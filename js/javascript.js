var start = document.getElementById('start');

var isgaming = false;
var score = 0;
var first = true;

var Block_Screen_X = 0;
var Block_Screen_Y = 0;

start.addEventListener("click", e=>{
    Start();
});

function Start() {
    document.getElementById('description').innerHTML = "";

    //Count Down
    for(let time = 3; time >=1; time--){
        setTimeout(function(){
            // console.log(time);
            document.getElementById('description').innerHTML = '<div id="count">'+time+"<div>";
        }, 1000*(4-time));
    }
    setTimeout(() => {
        Game();
    }, 4000);

}

function drawBox(ctx, Width, Height, Block_Size,scale,left,top){
    let Block_X = Math.random()*(Width-Block_Size);
    let Block_Y = Math.random()*(Height-Block_Size);
    Block_Screen_X = (Block_X*scale)+left;
    Block_Screen_Y = (Block_Y*scale)+top;
    ctx.clearRect(0,0,Width,Height);
    ctx.fillStyle = "green";
    ctx.fillRect(Block_X,Block_Y,Block_Size,Block_Size);
}

function Game(){
    isgaming = true;
    score = 0;
    document.getElementById('description').innerHTML = '    <div id="timer">Score: 0<br>10</div><canvas id="canvas"></canvas>';

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    var Block_Size = 20;

    var Width = canvas.width;
    var Height = canvas.height;
    var OWidth = canvas.offsetWidth;

    let cx = canvas.offsetLeft;
    let cy = canvas.offsetTop;

    var scale = OWidth/Width;
    
    drawBox(ctx,Width,Height,Block_Size,scale,cx,cy);


        document.addEventListener("click", e => {
            if(isgaming) {
                let x = e.pageX;
                let y = e.pageY;
                if(Block_Screen_X <= x && x <= Block_Screen_X+(Block_Size*scale) &&
                    Block_Screen_Y <= y && y <= Block_Screen_Y+(Block_Size*scale)){
                        score++;
                        drawBox(ctx,Width,Height,Block_Size,scale,cx,cy);
                }
            }
        });
    

    let time = 100;
    let real = "";
    let timer = setInterval(() => {
        time -= 1;
        if(time%10 == 0){
            real = time/10+".0";
        } else {
            real = time/10;
        }
        document.getElementById('timer').innerHTML = "Score: "+score+"<br>"+real;
        
        
        if(time == 0){
            clearInterval(timer);
            endEvent();
        }
    }, 100);

}


function endEvent(){
    isgaming = false;
    document.getElementById('description').innerHTML = '    <li><div id="score">Score: '+score+'</div></li>'+
    '<li><input id="restart" type="button" value="Restart"></li>';
    document.getElementById('restart').addEventListener("click", e => {
        Start();
    });
}