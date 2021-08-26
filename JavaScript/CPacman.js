class Pacman {
    // Members
    _x;
    _y;
    _direction;
    _score;
    _interval;

    // Constructor
    constructor(x, y, direction) {
        this._x = x;
        this._y = y;
        this._direction = direction;
        this._score = 0;
    }

    // Methods
    // Display pacman on the grid
    displayPacman() {
        let pacGif = document.createElement("img");
        pacGif.id = "pacGif";
        pacGif.src = "../PacMan/img/pacman.gif";

        pacGif.style.gridColumnStart = this._x;
        pacGif.style.gridRowStart = this._y;
        document.getElementById("grid").appendChild(pacGif);
    }

    // Move pacman
    movePacman(grid) {
        this._interval = setInterval(() => {
            // 1 = top, 2 = right, 3 = bottom, 4 = left
            switch (this._direction) {
                case 1:
                    // decrease row (top movement)
                    this._y--;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._y++;
                    }
                    // Rotate pacman image
                    pacGif.style.transform = "rotate(-0.25turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    this.pacmanEat(grid);
                    // display pacman image at new coord
                    pacGif.style.gridRowStart = this._y;

                    break;
                case 2:
                    // increase column (right movemement)
                    this._x++;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._x--;
                    }
                    // Rotate pacman image
                    pacGif.style.transform = "rotate(0turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    this.pacmanEat(grid);
                    // display pacman image at new coord
                    pacGif.style.gridColumnStart = this._x;

                    break;
                case 3:
                    // row increase (bottom movemement)
                    this._y++;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._y--;
                    }
                    // Rotate pacman image
                    pacGif.style.transform = "rotate(0.25turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    this.pacmanEat(grid);
                    // display pacman image at new coord
                    pacGif.style.gridRowStart = this._y;

                    break;
                case 4:
                    // decrease column (left movement)
                    this._x--;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._x++;
                    }
                    // Rotate pacman image
                    pacGif.style.transform = "scaleX(-1)";
                    this.outOfGrid(grid);
                    this.collision()
                    this.pacmanEat(grid);
                    // display pacman image at new coord
                    pacGif.style.gridColumnStart = this._x;

                    break;
            }
            // If pacman eat all coin : Win and stop the game
            if (this._score == 191) {
                // Clear ghost interval
                for (i = 0; i < ghostArray.length; i++) {
                    clearInterval(ghostArray[i]._interval);
                }
                // clear pacman interval
                clearInterval(this._interval);
                // edit result message
                document.getElementById("result").style.color = "#0FFF00";
                document.getElementById("result").innerHTML = "WIN";
            }
        }, 300);
    }

    // increase score and change image each time pacman eat bonbon
    pacmanEat(grid) {
        if (grid[this._y - 1][this._x - 1] == 1) {
            grid[this._y - 1][this._x - 1] = 2;
            document.getElementById("row" + (this._y - 1) + "col" + (this._x - 1)).src = "../PacMan/img/sol.gif";
            this._score++;
            document.getElementById("lblScore").innerHTML = "Score : " + this._score;
        }
    }

    // Check if pacman is out of the grid
    outOfGrid(grid) {
        if (this._x <= 0) {
            this._x = 19;
        } else if (this._x >= grid[0].length + 1) {
            this._x = 1;
        }

        if (this._y <= 1) {
            this._y = 22;
        } else if (this._y >= grid.length) {
            this._y = 1;
        }
    }

    collision() {
        for (i = 0; i < 4; i++) {
            // if Pacman has same pos with one ghost : lose
            if (this._x == ghostArray[i]._x && this._y == ghostArray[i]._y) {
                // Clear ghost interval
                for (i = 0; i < ghostArray.length; i++) {
                    clearInterval(ghostArray[i]._interval);
                }

                // clear pacman interval
                clearInterval(this._interval);

                // edit result message
                document.getElementById("result").style.color = "#ff0000";
                document.getElementById("result").innerHTML = "LOSE";
            }
        }
    }
}