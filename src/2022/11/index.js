function parseInput(input) {
    const inputs = [];
    for (let i = 0; i * 7 < input.length; i++) {
        let offset = i * 7 + 1;
        let items = input[offset].substring(18).split(', ').map(Number);
        let operation = input[offset + 1].trim().split(' ').slice(3);
        let test = {
            op: '/',
            value: Number(input[offset + 2].trim().split(' ')[3]),
            ifTrue: Number(input[offset + 3].trim().split(' ')[5]),
            ifFalse: Number(input[offset + 4].trim().split(' ')[5])
        };
        inputs.push({
            id: i,
            inspected: 0,
            items,
            operation,
            test
        });
    }
    return inputs;
}

const ops = {
    '+': (x, y) => x + y,
    '*': (x, y) => x * y,
}

function run(input, part, sample) {
    const monkeys = parseInput(input);

    let lcm = monkeys.map(m => m.test.value)
        .reduce((tot, n) => tot * n, 1);

    let rounds = part == 1 ? 20 : 10000;
    for (let round = 1; round <= rounds; round++) {
        for (let monkey of monkeys) {
            while (monkey.items.length) {
                monkey.inspected++;
                const item = monkey.items.shift()

                let worryLevel = ops[monkey.operation[1]](
                    monkey.operation[0] == 'old' ? item : Number(monkey.operation[0]),
                    monkey.operation[2] == 'old' ? item : Number(monkey.operation[2])
                );

                if (part == 1) {
                    worryLevel = Math.floor(worryLevel / 3);
                }

                const nextMonkey = worryLevel % monkey.test.value == 0 ?
                    monkeys[monkey.test.ifTrue] :
                    monkeys[monkey.test.ifFalse];
                
                if (part === 2) {
                    worryLevel = worryLevel % lcm;
                }

                nextMonkey.items.push(worryLevel);
            }
        }

        // console.log(`After round ${round}, the monkeys are holding items with these worry levels:`);
        // for (let i = 0; i < monkeys.length; i++) {
        //     console.log(`Monkey ${monkeys[i].id}: ${monkeys[i].items.join(', ')}`)
        // }
    }

    // for (let i = 0; i < monkeys.length; i++) {
    //     console.log(`Monkey ${monkeys[i].id} inspected items ${monkeys[i].inspected} times.`)
    // }

    return monkeys.map(m => m.inspected)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((total, n) => total * n, 1)
}

module.exports = {
    run,
    samples: [10605, 2713310158]
};