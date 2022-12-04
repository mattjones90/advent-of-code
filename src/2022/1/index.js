function run(lines, part) {
    let max = Number.MIN_SAFE_INTEGER;
    let total = 0;
    let totals = [];
    for (let n of lines) {
        if (n != '') {
            total += parseInt(n, 10);
        } else {
            max = Math.max(total, max);
            totals.push(total);
            total = 0;
        }
    }

    if (part == 1) {
        return max;
    }

    if (part == 2) {
        totals.sort((a, b) => b - a);
        return totals[0] + totals[1] + totals[2];
    }
}

module.exports = { run, samples: [24000, 45000] };