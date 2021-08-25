window.addEventListener("load", function(){
    displayGrid();
    document.getElementById("btnJouer").addEventListener("click", play);
});

// Pacman object
this.pacMan = {
    x: 2,
    y: 2,
    direction: 2, // 1 = top, 2 = right, 3 = bottom, 4 = left
};

// Ghost object
this.ghost1 = {
    x: 7,
    y: 9,
    direction: 1,
}

this.ghost2 = {
    x: 13,
    y: 9,
    direction: 2,
}

this.ghost3 = {
    x: 7,
    y: 13,
    direction: 3,
}

this.ghost4 = {
    x: 13,
    y: 13,
    direction: 4,
}

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

// Global variable
let score = 0;
let loose = false;
let pacInterval, ghostInterval;
let inGame = false;

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
    for(i = 1; i < 5; i++){
        let ghostGif = document.createElement("img");
        ghostGif.id = "ghost"+i;
        ghostGif.src = "../PacMan/img/ghost" + i + ".gif"
        ghostGif.style.gridColumnStart = window['ghost'+i].x;
        ghostGif.style.gridRowStart = window['ghost'+i].y;

        document.getElementById("grid").appendChild(ghostGif);
    }
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
            outOfGrid(window['pacMan']);
            collision()
            pacmanEat();
            // display pacman image at new coord
            pacGif.style.gridRowStart = pacMan.y;
            
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
            outOfGrid(window['pacMan']);
            collision()
            pacmanEat();
            // display pacman image at new coord
            pacGif.style.gridColumnStart = pacMan.x;
            
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
            outOfGrid(window['pacMan']);
            collision()
            pacmanEat();
            // display pacman image at new coord
            pacGif.style.gridRowStart = pacMan.y;
            
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
            outOfGrid(window['pacMan']);
            collision()
            pacmanEat();
            // display pacman image at new coord
            pacGif.style.gridColumnStart = pacMan.x;
            
            break;
    }
    if(score == 192){
        clearInterval(pacInterval);
        clearInterval(ghostInterval);
        document.getElementById("result").style.color = "#0FFF00";
        document.getElementById("result").innerHTML = "Win !";
        inGame = false;
    }
}

function moveGhost() {
    for(i = 1; i < 5; i++){
        // ramdom number between 1 and 4
        let direction = Math.floor(Math.random() * 4) + 1;
        // get ghost id
        let ghostId = document.getElementById("ghost"+i);
        // 1 = top, 2 = right, 3 = bottom, 4 = left
        switch (direction) {
            case 1:
                // decrease row (top movement)
                window['ghost'+i].y--;
                // if ghost is in wall he return at last coord
                if (grid[window['ghost'+i].y - 1][window['ghost'+i].x - 1] == 0) {
                    window['ghost'+i].y++;
                }
                outOfGrid(window['ghost'+i]);
                // Rotate ghost image
                ghostId.style.transform = "rotate(-0.25turn)";
                // display ghost image at new coord
                ghostId.style.gridRowStart = window['ghost'+i].y;

                break;
            case 2:
                // increase column (right movemement)
                window['ghost'+i].x++;
                // if ghost is in wall he return at last coord
                if (grid[window['ghost'+i].y - 1][window['ghost'+i].x - 1] == 0) {
                    window['ghost'+i].x--;
                }
                outOfGrid(window['ghost'+i]);
                // Rotate ghost image
                ghostId.style.transform = "rotate(0turn)";
                // display ghost image at new coord
                ghostId.style.gridColumnStart = window['ghost'+i].x;

                break;
            case 3:
                // row increase (bottom movemement)
                window['ghost'+i].y++;
                // if ghost is in wall he return at last coord
                if (grid[window['ghost'+i].y - 1][window['ghost'+i].x - 1] == 0) {
                    window['ghost'+i].y--;
                }
                outOfGrid(window['ghost'+i]);
                // Rotate ghost image
                ghostId.style.transform = "rotate(0.25turn)";
                // display ghost image at new coord
                ghostId.style.gridRowStart = window['ghost'+i].y;

                break;
            case 4:
                // decrease column (left movement)
                window['ghost'+i].x--;
                // if ghost is in wall he return at last coord
                if (grid[window['ghost'+i].y - 1][window['ghost'+i].x - 1] == 0) {
                    window['ghost'+i].x++;
                }
                outOfGrid(window['ghost'+i]);
                // Rotate ghost image
                ghostId.style.transform = "scaleX(-1)";
                // display ghost image at new coord
                ghostId.style.gridColumnStart = window['ghost'+i].x;

                break;
        }
    }
}

// Check if pacman is out of the grid
function outOfGrid(entite){
    if(entite.x <= 0){
        entite.x = 19;
    }else if(entite.x >= grid[0].length+1){
        entite.x = 1;
    }

    if(entite.y <= 1){
        entite.y = 22;
    }else if(entite.y >= grid.length){
        entite.y = 1;
    }
}

// increase score and change image each time pacman eat bonbon
function pacmanEat(){
    if(grid[pacMan.y - 1][pacMan.x - 1] == 1){
        grid[pacMan.y - 1][pacMan.x - 1] = 2;
        document.getElementById("row"+(pacMan.y-1)+"col"+(pacMan.x-1)).src = "../PacMan/img/sol.gif";
        score++;
        document.getElementById("lblScore").innerHTML = "Score : " + score;
    }  
}

// Collision between PacMan and ghost
function collision(){
    for(i = 1; i < 5; i++){
        // if Pacman has same pos with one ghost
        if(pacMan.x == window['ghost'+i].x && pacMan.y == window['ghost'+i].y){
            loose = true;
            // stop interval loop
            clearInterval(pacInterval);
            clearInterval(ghostInterval);
            // set label text
            document.getElementById("result").innerHTML = "LOOSE !";
            inGame = false;
        }
    }
}

// Set round duration
function gameRound(){
    pacInterval = setInterval(movePacMan, 300);
    ghostInterval = setInterval(moveGhost, 200);
}

// Main function 
function play(){
    // if a game isn't in progress
    if (inGame == false){
        inGame = true;
        displayPacMan();
        displayGhost();
        gameRound();
    }
}