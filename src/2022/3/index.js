function priorityOf(item) {
    if (item >= 'a' && item <= 'z') {
        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    } else {
        return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
}

function commonItems(bags) {
    return bags.reduce((acc, next) => {
        let common = [];
        for (let i = 0; i < next.length; i++) {
            if (acc.indexOf(next[i]) >= 0) {
                common.push(next[i])
            }
        }
        return common.join('')
    })
}

function run(input, part) {
    let total = 0;

    if (part === 1) {
        for (let line of input) {
            const c1 = line.substring(0, line.length / 2);
            const c2 = line.substring(line.length / 2);
            const char = commonItems([c1, c2]);
            total += priorityOf(char);
        }
    }

    if (part === 2) {
        for (let i = 0; i < input.length; i += 3) {
            const common = commonItems([
                input[i], 
                input[i + 1],
                input[i+2]
            ]);
            total += priorityOf(common);
        }
    }

    return total;
}

module.exports = {
    run,
    samples: [157, 70]
};