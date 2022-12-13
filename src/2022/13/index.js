function parseInput(input) {
    let inputs = [];
    for (let i = 0; i < input.length; i += 3) {
        inputs.push([JSON.parse(input[i]), JSON.parse(input[i + 1])])
    }
    return inputs
}

function isCorrect(left, right) {
    for (let i = 0; i < Math.max(left.length, right.length); i++) {
        if (i >= left.length) {
            return true;
        }

        if (i >= right.length) {
            return false;
        }

        if (typeof left[i] == 'number' && typeof right[i] == 'number') {
            if (left[i] < right[i]) {
                return true;
            }
            
            if (right[i] < left[i]) {
                return false;
            }

            continue;
        }

        if (Array.isArray(left[i]) && Array.isArray(right[i])) {
            const outcome = isCorrect(left[i], right[i])
            if (typeof outcome === 'boolean') {
                return outcome;
            }
            continue;
        }

        if (Array.isArray(left[i]) && !Array.isArray(right[i])) {
            const outcome = isCorrect(left[i], [right[i]]);
            if (typeof outcome === 'boolean') {
                return outcome;
            }
            continue;
        }

        if (Array.isArray(right[i]) && !Array.isArray(left[i])) {
            const outcome = isCorrect([left[i]], right[i]);
            if (typeof outcome === 'boolean') {
                return outcome;
            }
            continue;
        }

    }
}

function run(input, part, sample) {
    input = parseInput(input)

    if (part === 1) {
        let total = 0;
        for (let i = 0; i < input.length; i++) {
            let [left, right] = input[i];
            if (isCorrect(left, right)) {
                total += i + 1;
            }
        }
        return total;
    }

    if (part === 2) {
        const d1 = [[2]];
        const d2 = [[6]];
        let packets = [d1, d2]
        for (let [left, right] of input) {
            packets.push(left);
            packets.push(right);
        }
        packets.sort((left, right) => isCorrect(left, right) ? -1 : 1)

        return (packets.indexOf(d1) + 1) * (packets.indexOf(d2) + 1)
    }
}

module.exports = {
    run,
    samples: [13, 140]
};