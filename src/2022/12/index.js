function elevation(char) {
    if (char == 'S') char = 'a';
    if (char == 'E') char = 'z';
    return char.charCodeAt(0) - 'a'.charCodeAt(0)
}

function parseInput(input) {
    let start = null;
    let end = null;
    let nodes = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            const node = {
                x,
                y,
                elevation: elevation(input[y][x]),
            };

            if (input[y][x] == 'S') {
                start = node;
            }

            if (input[y][x] == 'E') {
                end = node;
            }

            nodes.push(node);
        }
    }

    return { start, end, nodes };
}
function getNode(nodes, x, y) {
    return nodes.find(node => node.x == x && node.y == y); // AWFUL
}

function neighbours(nodes, node) {
    let neighbours = [];
    neighbours.push(getNode(nodes, node.x, node.y - 1));
    neighbours.push(getNode(nodes, node.x - 1, node.y));
    neighbours.push(getNode(nodes, node.x + 1, node.y));
    neighbours.push(getNode(nodes, node.x, node.y + 1));
    return neighbours.filter(x => !!x);
}

function shortestPathDistance(nodes, start, end) {
    for (let node of nodes) {
        node.distance = Number.POSITIVE_INFINITY;
    }

    start.distance = 0;

    const unvisited = new Set(nodes);
    while (unvisited.size) {
        // Find node with smallest dist
        let current;
        for (let entry of unvisited.values()) {
            if (!current || entry.distance < current.distance) {
                current = entry;
            }
        }

        if (current == end) {
            return end.distance;
        }

        unvisited.delete(current);

        for (let neighbour of neighbours(nodes, current)) {
            if (unvisited.has(neighbour) && neighbour.elevation <= current.elevation + 1) {
                const newDistance = current.distance + 1;
                if (newDistance < neighbour.distance) {
                    neighbour.distance = newDistance;
                }
            }
        }
    }

    return end.distance;
}

function run(input, part) {
    const { nodes, start, end } = parseInput(input)

    if (part === 1) {
        return shortestPathDistance(nodes, start, end);
    }

    if (part === 2) {
        const startNodes = nodes.filter(node => node.elevation == 0);
        let min = Number.MAX_VALUE;
        for (let i = 0; i < startNodes.length; i++) {
            min = Math.min(min, shortestPathDistance(nodes, startNodes[i], end));
        }
        return min;
    }
}

module.exports = {
    run,
    samples: [31, 29]
};