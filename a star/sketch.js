//This code is subject to Copyright (c) 

let grid = [];
let inter;
let cols;
let rows;
let w = 20;
let side = 600;
let openSet = [];
let closedSet = [];
let start;
let end;
let path = [];
let d = false;
let a = true;
let index = 0;
let started = false;

function setup() {
    //perfect square!!
    createCanvas(side, side);
    cols = floor(width / w);
    rows = cols;

    for (let i = 0; i < cols; i++) {
        grid.push(new Array());
    }

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j] = new Cell(i, j);
        }
    }

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j].checkNeighbors();
        }
    }

    start = grid[0][0];
    openSet.push(start);
    end = grid[cols - 1][rows - 1];

    start.block = false;
    end.block = false;
}

function draw() {
    background(255);

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j].show(color(255));
        }
    }

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j].update();
        }
    }

    for (let i = 0; i < openSet.length; i++) {
        openSet[i].show(color(153, 51, 255));
    }

    for (let i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(51, 204, 255));
    }

    end.show(color(255, 0, 0));

    if (d) {
        if (openSet.length !== 0) {
            let l = 0;
            for (let i = 0; i < openSet.length; i++) {
                if (openSet[i].f < openSet[l].f) {
                    l = i;
                }
            }

            let current = openSet[l];

            if (current === end) {
                console.log("complete");
                path = [];
                let previous = current;
                path.push(previous);
                while (previous.cameFrom) {
                    path.push(previous.cameFrom);
                    previous = previous.cameFrom;
                }
                constr();
                noLoop();
            }

            openSet.splice(l, 1);
            closedSet.push(current);

            for (let neighbor of current.nearby) {
                if (!closedSet.includes(neighbor) && !neighbor.block) {
                    let tempG = current.g + 1;

                    if (openSet.includes(neighbor)) {
                        if (tempG < neighbor.g) {
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        openSet.push(neighbor);
                        neighbor.a = neighbor.i * w + 10;
                        neighbor.b = neighbor.j * w + 10;
                        neighbor.c = w - 20;
                    }

                    neighbor.h = heuristic(neighbor, end);
                    neighbor.f = neighbor.h + neighbor.g;
                    neighbor.cameFrom = current;
                }
            }
        } else {
            noLoop();
            console.log("no optimal path was found");
            alert("No optimal path was found...")
        }
    }


    start.show(color(255, 255, 100));
    end.show(color(255, 255, 100));

    start.block = false;
    end.block = false;
};

function keyPressed() {
    if (keyCode === 68) {
        d = !d;
        started = true;
    }
    if (keyCode === 65) {
        a = !a;
    }
    if (keyCode === 67) {
        clearBoard();
        started = false;
    }
    if (keyCode === 82) {
        randomGen();
    }
}

function mousePressed() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            let x = grid[i][j].i * w;
            let y = grid[i][j].j * w;
            if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + w) {
                if (!d && !openSet.includes(grid[i][j]) && !closedSet.includes(grid[i][j])) {
                    if (a) {
                        if (!grid[i][j].block) {
                            grid[i][j].x = grid[i][j].i * w + 10;
                            grid[i][j].y = grid[i][j].j * w + 10;
                            grid[i][j].w = w - 20;
                        }
                        grid[i][j].block = true;
                    } else {
                        grid[i][j].block = false;
                    }
                }
            }
        }
    }
}

function mouseDragged() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            let x = grid[i][j].i * w;
            let y = grid[i][j].j * w;
            if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + w) {
                if (!d && !openSet.includes(grid[i][j]) && !closedSet.includes(grid[i][j])) {
                    if (a) {
                        if (!grid[i][j].block) {
                            grid[i][j].x = grid[i][j].i * w + 10;
                            grid[i][j].y = grid[i][j].j * w + 10;
                            grid[i][j].w = w - 20;
                        }
                        grid[i][j].block = true;
                    } else {
                        grid[i][j].block = false;
                    }
                }
            }
        }
    }
}

function heuristic(a, b) {
    return (abs(a.i - b.i) + abs(a.j - b.j));
}

function reconstruct() {
    for (let i = 0; i < index; i++) {
        path[i].show(color(255, 255, 100));
    }

    index = min(index + 1, path.length);
}

function constr() {
    inter = setInterval(reconstruct, 10);
}

function clearBoard() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            grid[i][j].block = false;
        }
    }
    start.show(color(255, 255, 100));
    end.show(color(255, 255, 100));
    d = false;
    index = 0;

    if (inter) {
        clearInterval(inter);
    }

    openSet = [start];
    closedSet = [];
    loop();
}

function randomGen() {
    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (!openSet.includes(grid[i][j]) && !closedSet.includes(grid[i][j])) {
                if (closedSet.length <= 1 && !d) {
                    grid[i][j].block = (random() < 0.3) ? true : false;
                }
                if (grid[i][j].block) {
                    grid[i][j].x = grid[i][j].i * w + 10;
                    grid[i][j].y = grid[i][j].j * w + 10;
                    grid[i][j].w = w - 20;
                }
            }
        }
    }
}