window.addEventListener("load", function(){
    displayGrid();
    document.getElementById("btnJouer").addEventListener("click", jouer);
});

let pacMan = {
    x: 1,
    y: 1,
    direction: 0,
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

            // Place l'image en x / y de la grid
            wall.style.gridColumnStart = j+1;
            wall.style.gridRowStart = i+1;

            div.appendChild(wall);
        }
    }
    
    const a = document.getElementById("settings");
    a.before(div);
}

function jouer(){
    // Créer et affiche Pac-Man
    let pacGif = document.createElement("img");
    pacGif.id = "pacGif";
    pacGif.src = "../PacMan/img/pacman4.gif";

    pacGif.style.gridColumnStart = pacMan.x+1;
    pacGif.style.gridRowStart = pacMan.y+1;
    document.getElementById("grid").appendChild(pacGif);

    // Créer et affiche les 4 fantomes
    for(i = 0; i < 4; i++){
        let fantomeGif = document.createElement("img");
        fantomeGif.id = "fantome"+i;
        fantomeGif.src = "../PacMan/img/fantome" + i + ".gif"
        fantomeGif.style.gridColumnStart = 10;
        fantomeGif.style.gridRowStart = 11;
        document.getElementById("grid").appendChild(fantomeGif);
    }
}