window.addEventListener("load", function(){
    displayGrid();
    document.getElementById("btnJouer").addEventListener("click", play);
});

// Pacman object
let pacMan = {
    x: 2,
    y: 2,
    direction: 2, // 1 = top, 2 = right, 3 = bottom, 4 = left
};

// 0 = mur, 1 = bonbon, 2 = sol
let grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Global varial score
let score = 0;

function displayGrid(){
    // Main div
    let div = document.createElement("div");
    div.id = "grid";

    // grid container
    for (i = 0; i < 22; i++){ // row
        for(j = 0; j < 19; j++){ // column
            let wall = document.createElement("img");
            wall.id = "row" + i + "col" + j;

            if(grid[i][j] == 0){
                wall.src = "../PacMan/img/wall.png";
            }else if(grid[i][j] == 1){
                wall.src = "../PacMan/img/coin.png";
            }else{
                wall.src = "../PacMan/img/sol.gif";
            }

            // Display img at x/y in grid
            wall.style.gridColumnStart = j+1;
            wall.style.gridRowStart = i+1;

            div.appendChild(wall);
        }
    }
    
    // Add grid before div with button/score/etc
    const a = document.getElementById("settings");
    a.before(div);
}

// Display pacman in grid
function displayPacMan(){
    let pacGif = document.createElement("img");
    pacGif.id = "pacGif";
    pacGif.src = "../PacMan/img/pacman.gif";

    pacGif.style.gridColumnStart = pacMan.x;
    pacGif.style.gridRowStart = pacMan.y;
    document.getElementById("grid").appendChild(pacGif);
}

// display 4 ghosts in grid
function displayGhost(){
    for(i = 0; i < 4; i++){
        let fantomeGif = document.createElement("img");
        fantomeGif.id = "fantome"+i;
        fantomeGif.src = "../PacMan/img/ghost" + i + ".gif"
        fantomeGif.style.gridColumnStart = 10;
        fantomeGif.style.gridRowStart = 11;

        document.getElementById("grid").appendChild(fantomeGif);
    }
}

// Set round duration
function gameRound(){
    setInterval(movePacMan, 300);
}

// PacMan movement and check if he is in wall
function movePacMan(){
    // Set pacman direction with WASD keybind on keydown
    document.addEventListener("keydown", function(event){
        switch (event.key){
            case "w": pacMan.direction = 1; break;
            case "a": pacMan.direction = 4; break;
            case "s": pacMan.direction = 3; break;
            case "d": pacMan.direction = 2; break;
        }
    });

    // 1 = top, 2 = right, 3 = bottom, 4 = left
    switch (pacMan.direction) {
        case 1:
            // decrease row (top movement)
            pacMan.y--;
            // if pacman is in wall he return at last coord
            if (grid[pacMan.y - 1][pacMan.x - 1] == 0) {
                pacMan.y++;
            }
            // Rotate pacman image
            pacGif.style.transform = "rotate(-0.25turn)";
            outOfGrid()
            // display pacman image at new coord
            pacGif.style.gridRowStart = pacMan.y;
            pacmanEat()
            break;
        case 2:
            // increase column (right movemement)
            pacMan.x++;
            // if pacman is in wall he return at last coord
            if (grid[pacMan.y - 1][pacMan.x - 1] == 0) {
                pacMan.x--;
            }
            // Rotate pacman image
            pacGif.style.transform = "rotate(0turn)";
            outOfGrid()
            // display pacman image at new coord
            pacGif.style.gridColumnStart = pacMan.x;
            pacmanEat()
            break;
        case 3:
            // row increase (bottom movemement)
            pacMan.y++;
            // if pacman is in wall he return at last coord
            if (grid[pacMan.y - 1][pacMan.x - 1] == 0) {
                pacMan.y--;
            }
            // Rotate pacman image
            pacGif.style.transform = "rotate(0.25turn)";
            outOfGrid()
            // display pacman image at new coord
            pacGif.style.gridRowStart = pacMan.y;
            pacmanEat()
            break;
        case 4:
            // decrease column (left movement)
            pacMan.x--;
            // if pacman is in wall he return at last coord
            if (grid[pacMan.y - 1][pacMan.x - 1] == 0) {
                pacMan.x++;
            }
            // Rotate pacman image
            pacGif.style.transform = "scaleX(-1)";
            outOfGrid()
            // display pacman image at new coord
            pacGif.style.gridColumnStart = pacMan.x;
            pacmanEat()
            break;
    }
}

// Check if pacman is out of the grid
function outOfGrid(){
    if(pacMan.x <= 0){
        pacMan.x = 19;
    }else if(pacMan.x >= grid[0].length+1){
        pacMan.x = 1;
    }

    if(pacMan.y == 0){
        pacMan.y = 22;
    }
}

// increase score and change image each time pacman eat bonbon
function pacmanEat(){
    if(grid[pacMan.y - 1][pacMan.x - 1] == 1){
        grid[pacMan.y - 1][pacMan.x - 1] = 2;
        document.getElementById("row"+(pacMan.y-1)+"col"+(pacMan.x-1)).src = "../PacMan/img/sol.gif";
        score++;
        document.getElementById("lblScore").innerHTML = "score : " + score;
    }  
}

// Main function 
function play(){
    displayPacMan();
    displayGhost();
    gameRound();
}