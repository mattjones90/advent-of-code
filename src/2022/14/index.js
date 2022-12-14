function parseInput(input) {
    let paths = [];
    for (let line of input) {
        const wow = line.split(' -> ')
            .map(point => ({
                x: Number(point.split(',')[0]),
                y: Number(point.split(',')[1])
            }));
        paths.push(wow)
    }

    const depth = paths.reduce((max, path) => {
        for (let point of path) {
            max = Math.max(max, point.y)
        }
        return max;
    }, Number.MIN_SAFE_INTEGER);

    return { depth, paths };
}

function run(input, part, sample) {
    const { depth: maxDepth, paths } = parseInput(input);
    const grid = new Map();
    for (let path of paths) {
        let coords = [];

        for (let point = 0; point < path.length - 1; point++) {
            let start = path[point];
            let end = path[point + 1];

            // Vertical path
            if (start.x == end.x) {
                const min = Math.min(start.y, end.y);
                const max = Math.max(start.y, end.y);
                for (let i = min; i <= max; i++) {
                    grid.set(`${start.x},${i}`, '#');
                }
            }

            // Horizontal path
            if (start.y == end.y) {
                const min = Math.min(start.x, end.x);
                const max = Math.max(start.x, end.x);
                for (let i = min; i <= max; i++) {
                    coords.push(`${i},${start.y}`)
                    grid.set(`${i},${start.y}`, '#');
                }
            }
        }
    }

    if (part === 1) {
        let sandCount = 0;

        nomoresand:
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            let sand = { x: 500, y: 0, stuck: false };

            while (!sand.stuck) {
                // Fallen off grid?
                if (sand.y >= maxDepth) {
                    break nomoresand;
                }

                // Can move below?
                else if (!grid.has(`${sand.x},${sand.y + 1}`)) {
                    sand.y += 1;
                }
                // Can move below left?
                else if (!grid.has(`${sand.x - 1},${sand.y + 1}`)) {
                    sand.y += 1;
                    sand.x -= 1;
                }
                // Can move below right?
                else if (!grid.has(`${sand.x + 1},${sand.y + 1}`)) {
                    sand.y += 1;
                    sand.x += 1;
                }
                // Stuck!
                else {
                    sand.stuck = true;
                    grid.set(`${sand.x},${sand.y}`, 'O')
                    sandCount++;
                }
            }
        }

        return sandCount;
    }

    if (part === 2) {
        
        let sandCount = 0;

        nomoresand:
        for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
            let sand = { x: 500, y: 0, stuck: false };

            while (!sand.stuck) {
                // Fallen off grid?
                if (sand.y == maxDepth + 1) {
                    sandCount++;
                    grid.set(`${sand.x},${sand.y}`, 'O');
                    sand.stuck = true;
                }

                // Can move below?
                else if (!grid.has(`${sand.x},${sand.y + 1}`)) {
                    sand.y += 1;
                }
                // Can move below left?
                else if (!grid.has(`${sand.x - 1},${sand.y + 1}`)) {
                    sand.y += 1;
                    sand.x -= 1;
                }
                // Can move below right?
                else if (!grid.has(`${sand.x + 1},${sand.y + 1}`)) {
                    sand.y += 1;
                    sand.x += 1;
                }
                // Stuck!
                else {
                    sand.stuck = true;
                    grid.set(`${sand.x},${sand.y}`, 'O')
                    sandCount++;
                }
            }

            if(sand.x == 500 && sand.y == 0) { break;}
        }

        return sandCount;
    }
}

module.exports = {
    run,
    samples: [24, 93]
};