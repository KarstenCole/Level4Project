// 1.6 = just taken by player 1.2 = held by player 2 = permantley held by player (-.2 everything for computer)
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
    twoLevelChoices = [null,null,null,null,null,null,null,null,null];
    
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
    if(CurrentPlayer === "player" && (twoLevelChoices[button-1] !== 1.4 || twoLevelChoices[button-1] !== 1.8)){
        
        // sees how to change the tic tac toe list
        if(twoLevelChoices[button-1] === null || twoLevelChoices[button-1] === 1){
            twoLevelChoices[button-1] = 1.6;
            boxDisplays[button-1] = x_o;
        } else if(twoLevelChoices[button-1] === 1.6 || twoLevelChoices[button-1] === 1.2){
            twoLevelChoices[button-1] = 2;
            boxDisplays[button-1] = x_o;
        }

        // switches player
        CurrentPlayer = CurrentPlayer === "player" ? "computer" : "player";
        if(CurrentPlayer === "computer"){
            computerTurn();
        }

        updateComputerChoices()
        display();
    }
}

function computerTurn(){
    // finds all the possible choices
    let possibleChoices = [];
    for(var i=0; i<twoLevelChoices.length; i++){ 
        if (twoLevelChoices[i] === null || twoLevelChoices[i]===1 || twoLevelChoices[i]===1.4 || twoLevelChoices[i]===1.2){
            possibleChoices.push(i);
        }
    }
    
    // picks a random choice
    choice = possibleChoices[parseInt(Math.random()*possibleChoices.length)];
    console.log(choice+1);


    // displays the choice and adds it to the list
    boxDisplays[choice] = temp = x_o === "O" ? "X" : "O";
    if(twoLevelChoices[choice]==null || twoLevelChoices[choice-1]==1.2){
        twoLevelChoices[choice] = 1.4;
    } else if(twoLevelChoices[choice] == 1 || twoLevelChoices[choice] == 1.4){
        twoLevelChoices[choice] = 1.8;
    }
    console.log(twoLevelChoices);
    CurrentPlayer = CurrentPlayer === "player" ? "computer" : "player";

    updatePlayerChoices();
    setTimeout(100000);
    display();
    console.log(twoLevelChoices);
}

function updatePlayerChoices(){
    for(var i=0; i<twoLevelChoices.length; i++){
        if(twoLevelChoices[i] == 1.6){twoLevelChoices[i] = 1.2;}
    }
}

function updateComputerChoices(){
    for(var i=0; i<twoLevelChoices.length; i++){
        if(twoLevelChoices[i] == 1.4){twoLevelChoices[i] = 1;}
    }
}

function display(){
    for(var i=0; i<boxes.length; i++){
        boxes[i].innerHTML = boxDisplays[i];
    }
}