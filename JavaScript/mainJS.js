window.addEventListener("load", function(){
    displayGrid();
    document.getElementById("btnJouer").addEventListener("click", play);
    // Set pac man direction with wasd key
    document.addEventListener("keypress", function(event){
        const key = event.key;
        switch (key){
            case "w": pacMan.direction = 1; break;
            case "a": pacMan.direction = 4; break;
            case "s": pacMan.direction = 3; break;
            case "d": pacMan.direction = 2; break;
        }
    });
});

let pacMan = {
    x: 2,
    y: 2,
    direction: 2, // 1 = top, 2 = right, 3 = bottom, 4 = left
};

function displayGrid(){
    // 0 = mur, 1 = bonbon, 2 = sol
    let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 0],
        [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    // Main div
    let div = document.createElement("div");
    div.id = "grid";

    // grid container
    for (i = 0; i < 22; i++){ // row
        for(j = 0; j < 19; j++){ // column
            let wall = document.createElement("img");
            wall.id = "raw" + i + "col" + j;

            if(grid[i][j] == 0){
                wall.src = "../PacMan/img/mur.gif";
            }else if(grid[i][j] == 1){
                wall.src = "../PacMan/img/bonbon.gif";
            }else{
                wall.src = "../PacMan/img/sol.gif";
            }

            // Display img at x/y in grid
            wall.style.gridColumnStart = j+1;
            wall.style.gridRowStart = i+1;

            div.appendChild(wall);
        }
    }
    
    const a = document.getElementById("settings");
    a.before(div);
}

// Display pac man in grid
function displayPacMan(){
    let pacGif = document.createElement("img");
    pacGif.id = "pacGif";
    pacGif.src = "../PacMan/img/pacman4.gif";

    pacGif.style.gridColumnStart = pacMan.x;
    pacGif.style.gridRowStart = pacMan.y;
    document.getElementById("grid").appendChild(pacGif);
}

// display 4 ghost in grind
function displayGhost(){
    for(i = 0; i < 4; i++){
        let fantomeGif = document.createElement("img");
        fantomeGif.id = "fantome"+i;
        fantomeGif.src = "../PacMan/img/fantome" + i + ".gif"
        fantomeGif.style.gridColumnStart = 10;
        fantomeGif.style.gridRowStart = 11;

        document.getElementById("grid").appendChild(fantomeGif);
    }
}

function gameRound(){
    setInterval(movePacMan, 1000);
    setInterval(moveGhost, 500);
}

function getPacManDirection(){

}

function movePacMan(){
    // 1 = top, 2 = right, 3 = bottom, 4 = left
    if(pacMan.direction == 1){
        pacGif.style.gridRowStart = pacMan.y--;
        pacGif.style.transform = "rotate(-0.25turn)";
    }else if(pacMan.direction == 2){
        pacGif.style.gridColumnStart = pacMan.x++;
        pacGif.style.transform = "rotate(0turn)";
    }else if(pacMan.direction == 3){
        pacGif.style.gridRowStart = pacMan.y++;
        pacGif.style.transform = "rotate(0.25turn)";
    }else if(pacMan.direction == 4){
        pacGif.style.gridColumnStart = pacMan.x--;
        pacGif.style.transform = "rotate(0.5turn)";
    }
}

function moveGhost(){

}

function play(){
    displayPacMan();
    displayGhost();
    gameRound();
}