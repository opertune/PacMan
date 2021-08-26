// init grid, pacman and ghosts array as global varial
let ghostArray = [];
let grid = new Grid();
let pacman = new Pacman(2, 2, 2);

window.addEventListener("load", function () {
    // add ghosts in ghostArray
    for(i = 0; i < 4; i++){
        ghostArray[i] = new Ghost(10, 11, i+1);
    }
    // display grid
    grid.displayGrid();
    // Click button Play
    document.getElementById("btnJouer").addEventListener("click", () => {
        // First game call gameTurn function
        if (document.getElementById("btnJouer").value == "Play") {
            // Call gameTurn function for launching the game
            gameTurn();
        } else if (document.getElementById("btnJouer").value == "Replay") {
            // Reset game
            grid.resetGrid();
        }
    });
});

function gameTurn() {
    // Display and move pacman
    pacman.displayPacman();
    pacman.movePacman(grid._grid);
    // Display and move ghosts
    for (i = 0; i < 4; i++) {
        ghostArray[i].displayGhost(i + 1);
        ghostArray[i].moveGhost(grid._grid, i + 1);
    }
    // Set pacman direction with WASD keybind on keydown
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "w": pacman._direction = 1; break;
            case "a": pacman._direction = 4; break;
            case "s": pacman._direction = 3; break;
            case "d": pacman._direction = 2; break;
        }
    });
    // Edit play button value
    document.getElementById("btnJouer").value = "Replay";
}