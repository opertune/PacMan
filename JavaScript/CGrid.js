class Grid {
    // Member
    // 0 = wall, 1 = coin, 2 = sol
    _grid = [
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
        [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1],
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

    // Methods
    displayGrid() {
        // Main div
        let div = document.createElement("div");
        div.id = "grid";

        // grid container
        for (let i = 0; i < 22; i++) { // row
            for (let j = 0; j < 19; j++) { // column
                let wall = document.createElement("img");
                wall.id = "row" + i + "col" + j;

                if (this._grid[i][j] == 0) {
                    wall.src = "../PacMan/img/wall.png";
                } else if (this._grid[i][j] == 1) {
                    wall.src = "../PacMan/img/coin.png";
                } else {
                    wall.src = "../PacMan/img/sol.gif";
                }

                // Display img at x/y in grid
                wall.style.gridColumnStart = j + 1;
                wall.style.gridRowStart = i + 1;

                div.appendChild(wall);
            }
        }

        // Add grid before div with button/score/etc
        const a = document.getElementById("settings");
        a.before(div);
    }

    resetGrid() {
        // Delete div grid
        document.getElementById("grid").parentNode.removeChild(document.getElementById("grid"));
        // Clear pacman and ghosts interval
        clearInterval(pacman._interval);
        for (i = 0; i < 4; i++) {
            clearInterval(ghostArray[i]._interval);
        }
        // init grid with new grid
        grid = new Grid();
        // Display new grid
        grid.displayGrid();

        // Reset pacman position and direction
        pacman._x = 2;
        pacman._y = 2;
        pacman._direction = 2;

        // Reset ghost position and direction
        for (i = 0; i < 4; i++) {
            ghostArray[i]._x = 10;
            ghostArray[i]._y = 11;
            ghostArray[i]._direction = i + 1;
        }

        // Reset score and result
        pacman._score = 0;
        document.getElementById("lblScore").innerHTML = "Score : " + pacman._score;
        document.getElementById("result").innerHTML = "";

        // Call gameTurn function for launching the game
        gameTurn();
    }
}