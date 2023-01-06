function initialize(){
    CurrentPlayer = null;
    x_o = ""; 
    box1 = document.getElementById("one");
    box2 = document.getElementById("two");
    box3 = document.getElementById("three");
    box4 = document.getElementById("four");
    box5 = document.getElementById("five");
    box6 = document.getElementById("six");
    box7 = document.getElementById("seven");
    box8 = document.getElementById("eight");
    box9 = document.getElementById("nine");
    boxD1 = "";  boxD2 = ""; boxD3 = "";  boxD4 = "";  boxD5 = "";  boxD6 = "";  boxD7 = "";   boxD8 = "";  boxD9 = ""; 

    boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
    boxDisplays = [ boxD1, boxD2, boxD3, boxD4, boxD5, boxD6, boxD7, boxD8, boxD9];
    twoLevelChoices = ["","","","","","","","",""];
    
    display();
}

function XorO(XorO){
    if(x_o === ""){
        x_o = XorO;
        if(x_o === 'X') {
            CurrentPlayer = "player";
        }
        else{
            CurrentPlayer = "computer";
            computerTurn();
        } 
    }
}

function choose(button){
    if(CurrentPlayer === "player"){
        boxDisplays[button-1] = x_o;
    
        // switches player
        CurrentPlayer = CurrentPlayer === "player" ? "computer" : "player";
        if(CurrentPlayer === "computer"){
            computerTurn();
        }


        display();
    }
}

function computerTurn(){

}

function display(){
    for(var i=0; i<boxes.length; i++){
        boxes[i].innerHTML = boxDisplays[i];
    }
}