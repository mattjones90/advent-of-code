function parseInput(input) {
    return input.map(line => {
        const [i1, i2] = line.split(',')
        return [parseInterval(i1), parseInterval(i2)];
    })
}

function parseInterval(s) {
    const [start, end] = s.split('-');
    return [Number(start), Number(end)];
}

function run(input, part) {
    let total = 0
    for (let [i1, i2] of parseInput(input)) {
        if (part === 1) {
            if ((i1[0] <= i2[0] && i1[1] >= i2[1]) || (i2[0] <= i1[0] && i2[1] >= i1[1])) {
                total++;
            }
        }

        if (part === 2) {
            const lower = (i1[0] <= i2[0]) ? i1 : i2;
            const higher = (i1[0] <= i2[0]) ? i2 : i1;
            if (lower[1] >= higher[0]) {
                total++;
            }
        }
    }

    return total
}

module.exports = {
    run,
    samples: [2, 4]
};