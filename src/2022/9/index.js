const LOG = false;

function debug(s) {
    if(LOG) console.log(s)
}

function parseInput(input) {
    return input.map(line => {
        const tokens = line.split(' ')
        return {
            direction: tokens[0],
            distance: Number(tokens[1])
        }
    })
}

function format(knot) {
    return `(${knot.x},${knot.y})`;
}

function rope(size) {
    let tail = { x: 0, y: 0, next: null };
    let head = tail;
    for (let i = 0; i < size - 1; i++) {
        head = { x: 0, y: 0, next: head };
    }
    return [head, tail];
}

function move(direction, head) {
    switch (direction) {
        case 'U':
            head.y += 1;
            break;
        case 'D':
            head.y -= 1;
            break;
        case 'L':
            head.x -= 1;
            break;
        case 'R':
            head.x += 1;
            break;
    }

    moveTail(head)
}


function moveTail(rope) {
    const head = rope
    const tail = rope.next;
    if (!tail) {
        return;
    }

    // Touching
    if (Math.abs(tail.x - head.x) <= 1 && Math.abs(tail.y - head.y) <= 1) {
        moveTail(tail);
        return;
    }

    // Two steps L/R
    if (head.y == tail.y && Math.abs(head.x - tail.x) == 2) {
        tail.x += (head.x > tail.x) ? 1 : -1;
        moveTail(tail);
        return;
    }

    // Two steps U/D
    if (head.x == tail.x && Math.abs(head.y - tail.y) == 2) {
        tail.y += (head.y > tail.y) ? 1 : -1;
        moveTail(tail);
        return;
    }

    // Always move both otherwise?
    tail.x += (head.x > tail.x) ? 1 : -1;
    tail.y += (head.y > tail.y) ? 1 : -1;

    moveTail(tail);
}

function printRope(rope) {
    let coords = [];

    let head = rope;
    let n = 0;
    while (head) {
        let label = String(n);
        if (n == 0) label = 'H';
        if (!head.next) label = 'T';

        coords.push({ 
            label, 
            x: head.x, y: 
            head.y })

        head = head.next;
        n++;
    }

    // Work out bounds
    let minX = 0, minY = 0, maxX = 6, maxY = 5;
    for(let {x, y} of coords) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + 1);
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y + 1);
    }
    let xOffset = Math.abs(minX);
    let yOffset = Math.abs(minY);

    // Populate Grid Background
    let grid = []
    for (let y = minY; y < maxY; y++) {
        grid.push([])
        for (let x = minX; x < maxX; x++) {
            let value = '.'

            if(x == 0 ) value = '|';
            if(y == 0 ) value = '-';
            if(x == 0 && y == 0) value = '+';
            grid[y + yOffset].push(value)
        }
    }

    // Populate knots
    for (let i = coords.length - 1; i >= 0; i--) {
        const knot = coords[i];
        grid[knot.y + yOffset][knot.x + xOffset] = knot.label;
    }

    grid.reverse()

    let s = ''
    for (let i = 0; i < grid.length; i++) {
        s += grid[i].join('') + '\n';
    }
    return s += '\n';
}

function run(input, part) {
    const instructions = parseInput(input)

    const visited = new Set();

    if (part === 1) {
        var [head, tail] = rope(2);
    }

    if (part === 2) {
        var [head, tail] = rope(10);
    }

    for (let instruction of instructions) {
        debug(`== ${instruction.direction} ${instruction.Number}==\n`)
        for (let i = 0; i < instruction.distance; i++) {
            move(instruction.direction, head);
            visited.add(format(tail));

            if(LOG) debug(printRope(head))
        }
    }

    return visited.size;
}

module.exports = {
    run,
    // samples: [13, 1],
    samples: [88, 36]
};