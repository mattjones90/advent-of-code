function parseInput(input) {
    return input.map(line => line.split('').map(n => Number(n)));
}

function isEdge(grid, x, y) {
    if (x == 0 || x == grid[0].length - 1) {
        return true;
    }

    if (y == 0 || y == grid.length - 1) {
        return true;
    }

    return false;
}

function isVisible(grid, x, y) {
    if (isEdge(grid, x, y)) {
        return true;
    }

    const height = grid[y][x];

    let isVisibleLeft = true;
    for (let i = 0; i < x; i++) {
        if (grid[y][i] >= height) {
            isVisibleLeft = false;
        }
    }

    let isVisibleRight = true;
    for (let i = x + 1; i < grid[0].length; i++) {
        if (grid[y][i] >= height) {
            isVisibleRight = false;
        }
    }

    let isVisibleUp = true;
    for (let i = 0; i < y; i++) {
        if (grid[i][x] >= height) {
            isVisibleUp = false;
        }
    }

    let isVisibleDown = true;
    for (let i = y + 1; i < grid.length; i++) {
        if (grid[i][x] >= height) {
            isVisibleDown = false;
        }
    }

    return isVisibleUp || isVisibleDown || isVisibleLeft || isVisibleRight;
}

function viewingDistance(grid, x, y) {
    const height = grid[y][x];
    const vd = {
        up: 0,
        down: 0,
        left: 0,
        right: 0
    };

    for (let dst = 1; x - dst >= 0; dst++) {
        vd.left++;
        if (grid[y][x - dst] >= height) {
            break;
        }
    }

    for (let dst = 1; x + dst < grid[0].length; dst++) {
        vd.right++;
        if (grid[y][x + dst] >= height) {
            break;
        }
    }

    for (let dst = 1; y - dst >= 0; dst++) {
        vd.up++;
        if (grid[y - dst][x] >= height) {
            break;
        }
    }

    for (let dst = 1; y + dst < grid.length; dst++) {
        vd.down++;
        if (grid[y + dst][x] >= height) {
            break;
        }
    }

    return vd.down * vd.up * vd.left * vd.right;
}

function run(input, part) {
    const grid = parseInput(input)

    if (part === 1) {
        let total = 0;
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y < grid.length; y++) {
                if (isVisible(grid, x, y)) {
                    total++;
                }
            }
        }
        return total;
    }

    if (part === 2) {
        let max = Number.MIN_SAFE_INTEGER;
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y < grid.length; y++) {
                max = Math.max(max, viewingDistance(grid, x, y))
            }
        }

        return max;
    }

}

module.exports = {
    run,
    samples: [21, 8]
};