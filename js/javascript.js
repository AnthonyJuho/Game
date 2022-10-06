var content = document.getElementsByClassName('content');

StartScreen();

function StartScreen(){
    var startbutton = document.createElement("input");
    startbutton.type = "button";
    startbutton.className = "startbutton";
    content.prepend(startbutton);
}