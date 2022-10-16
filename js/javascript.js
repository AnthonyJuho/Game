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

function ChangeSize(){

    if(isgaming){


        var Block = document.getElementById('block');
        var Board = document.getElementById('board');
    
        var Width = window.innerWidth*0.8;
        var Height = window.innerHeight*0.6;
    
        Board.style.width = Width+"px";
        Board.style.height = Height+"px";
    
        var Block_Size = Math.sqrt((Width*Height)/100);
    
        Block.style.width = Block_Size+"px";
        Block.style.height = Block_Size+"px";
    }
    
}

function BlockReLocate(){
    if(isgaming){
        var Block = document.getElementById('block');
        var Board = document.getElementById('board');

        var Board_Width = Board.clientWidth;
        var Board_Height = Board.clientHeight;
        var Block_Size = Block.clientWidth;

        var x = Math.random()*(Board_Width-Block_Size);
        var y = Math.random()*(Board_Height-Block_Size);
        // console.log(Block_Size);
        Block.style.marginLeft = x+"px";
        Block.style.marginTop = y+"px";
    }
}

function Game(){
    isgaming = true;
    score = 0;

    document.getElementById('description').innerHTML = '    <div id="timer">Score: 0<br>10</div><div id="board"><input id="block" type="button"><div>';

    ChangeSize();

    var Block = document.getElementById('block');
    var Board = document.getElementById('board');

    BlockReLocate();

    addEventListener("resize", ()=>{
        ChangeSize();
    })

    Block.addEventListener("click", e => {
        score++;
        BlockReLocate();
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