// 1.6 = just taken by player 1.2 = held by player 2 = permantley held by player (-.2 everything for computer)
function initialize(reset){
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
    
    Winner = document.getElementById("Winner");
    if(!reset){
        r_h = document.getElementById("R-H");

        p1 = document.getElementById("p1");    p2 = document.getElementById("p2");    p3 = document.getElementById("p3");
        OgHtml = [p1.innerHTML, p2.innerHTML, p3.innerHTML];
        console.log(OgHtml);

        instructions = false;
        p1.innerHTML = null;
        p2.innerHTML = null;
        p3.innerHTML = null;
        console.log(OgHtml);
    }

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
    if(CurrentPlayer === "player" && (x_o != "") && !(twoLevelChoices[button-1] === 1.4 || twoLevelChoices[button-1] === 1.8 || twoLevelChoices[button-1] === 2)){
        
        // sees how to change the tic tac toe list
        if(twoLevelChoices[button-1] === null || twoLevelChoices[button-1] === 1){
            twoLevelChoices[button-1] = 1.6;
            boxDisplays[button-1] = x_o;
        } else if(twoLevelChoices[button-1] === 1.6 || twoLevelChoices[button-1] === 1.2){
            twoLevelChoices[button-1] = 2;
            boxDisplays[button-1] = x_o;
        }
        
        // updates computer selections
        console.log("computer update:");
        updateComputerChoices();
        display();
        console.log(twoLevelChoices);
        CheckForWin();

        // switches player
        CurrentPlayer = CurrentPlayer === "player" ? "computer" : "player";
        if(CurrentPlayer === "computer"){
            computerTurn();
        }

    }
}

function computerTurn(){ //fix its choosing mech b
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

    // updates choices
    console.log("player update:");
    updatePlayerChoices();
    display();
    console.log(twoLevelChoices);
    CheckForWin();

    // switches player
    CurrentPlayer = CurrentPlayer === "player" ? "computer" : "player";
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

function CheckForWin(){
    if(
        // Horizontal
       ((boxDisplays[0] === boxDisplays[1] && boxDisplays[1] === boxDisplays[2]) && (boxDisplays[0] != "")) ||
       ((boxDisplays[3] === boxDisplays[4] && boxDisplays[4] === boxDisplays[5])  && (boxDisplays[3] != ""))||
       ((boxDisplays[6] === boxDisplays[7] && boxDisplays[7] === boxDisplays[8])  && (boxDisplays[6] != ""))||
        // Vertical
       ((boxDisplays[0] === boxDisplays[3] && boxDisplays[3] === boxDisplays[6])  && (boxDisplays[0] != ""))||
       ((boxDisplays[1] === boxDisplays[4] && boxDisplays[4] === boxDisplays[7])  && (boxDisplays[1] != ""))||
       ((boxDisplays[2] === boxDisplays[5] && boxDisplays[5] === boxDisplays[8])  && (boxDisplays[2] != ""))||
        //Diagonal
       ((boxDisplays[0] === boxDisplays[4] && boxDisplays[4] === boxDisplays[8])  && (boxDisplays[0] != ""))||
       ((boxDisplays[2] === boxDisplays[4] && boxDisplays[4] === boxDisplays[6]) && (boxDisplays[2] != ""))){

        reset(CurrentPlayer, true);

       }
}

function reset(player,win){
    initialize(true);
    display();
    Winner.innerHTML = win ? player : "";
}

function revealInstructions(){
    instructions = !instructions;
    if(instructions){
        r_h.innerHTML = "hide";
        p1.innerHTML = OgHtml[0]; p2.innerHTML = OgHtml[1]; p3.innerHTML = OgHtml[2];
    } else{
        r_h.innerHTML = "reveal";
        p1.innerHTML = null; p2.innerHTML = null; p3.innerHTML = null;
    }

}

function display(){
    for(var i=0; i<boxes.length; i++){
        boxes[i].innerHTML = boxDisplays[i];
    }
}
