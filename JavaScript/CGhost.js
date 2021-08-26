class Ghost {
    _x;
    _y;
    _direction;
    _interval;

    constructor(x, y, direction) {
        this._x = x;
        this._y = y;
        this._direction = direction;
    }

    displayGhost(nb) {
        let ghostGif = document.createElement("img");
        ghostGif.id = "ghost" + nb;
        ghostGif.src = "../PacMan/img/ghost" + nb + ".gif"
        ghostGif.style.gridColumnStart = this._x;
        ghostGif.style.gridRowStart = this._y;

        document.getElementById("grid").appendChild(ghostGif);
    }

    moveGhost(grid, nb) {
        this._interval = setInterval(() => {
            // ramdom number between 1 and 4
            this._direction = Math.floor(Math.random() * 4) + 1;

            // get ghost id
            let ghostId = document.getElementById("ghost" + nb);

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
                    ghostId.style.transform = "rotate(-0.25turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    // display pacman image at new coord
                    ghostId.style.gridRowStart = this._y;

                    break;
                case 2:
                    // increase column (right movemement)
                    this._x++;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._x--;
                    }
                    // Rotate pacman image
                    ghostId.style.transform = "rotate(0turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    // display pacman image at new coord
                    ghostId.style.gridColumnStart = this._x;

                    break;
                case 3:
                    // row increase (bottom movemement)
                    this._y++;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._y--;
                    }
                    // Rotate pacman image
                    ghostId.style.transform = "rotate(0.25turn)";
                    this.outOfGrid(grid);
                    this.collision()
                    // display pacman image at new coord
                    ghostId.style.gridRowStart = this._y;

                    break;
                case 4:
                    // decrease column (left movement)
                    this._x--;
                    // if pacman is in wall he return at last coord
                    if (grid[this._y - 1][this._x - 1] == 0) {
                        this._x++;
                    }
                    // Rotate pacman image
                    ghostId.style.transform = "scaleX(-1)";
                    this.outOfGrid(grid);
                    this.collision()
                    // display pacman image at new coord
                    ghostId.style.gridColumnStart = this._x;

                    break;
            }
        }, 300);
    }

    // Check if ghost is out of the grid
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

        // if Pacman has same pos with one ghost : lose
        if (this._x == pacman._x && this._y == pacman._y) {
            // Clear ghost interval
            for (i = 0; i < ghostArray.length; i++) {
                clearInterval(ghostArray[i]._interval);
            }
            // clear ghost interval
            clearInterval(this._interval);
            // clear pacman interval
            clearInterval(pacman._interval);
            // edit result message
            document.getElementById("result").style.color = "#ff0000";
            document.getElementById("result").innerHTML = "LOSE";
        }
    }
}