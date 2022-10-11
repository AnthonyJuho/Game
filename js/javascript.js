var start = document.getElementById('start');

var isgaming = false;


start.addEventListener("click", e=>{
    isgaming = true;
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

}