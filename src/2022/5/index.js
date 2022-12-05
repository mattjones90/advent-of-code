
function parseInput(input) {
    const stackLines = []
    for (let i = 0; input[i] != ''; i++) {
        stackLines.push(input[i]);
    }
    const stack = parseStack(stackLines);

    const instructions = []
    for (let i = stackLines.length + 1; i < input.length; i++) {
        instructions.push(parseInstruction(input[i]));
    }

    return { stack, instructions }
}

function parseStack(lines) {
    function getStackCount() {
        const labels = lines[lines.length - 1];
        const nStacks = (labels.length + 1) / 4;
        return nStacks;
    }

    const nStacks = getStackCount();

    const stacks = [];
    for (let stack = 1; stack <= nStacks; stack++) {
        stacks[stack] = [];
    }

    for (let lineIdx = lines.length - 2; lineIdx >= 0; lineIdx--) {
        const line = lines[lineIdx];
        for (let stack = 0; stack < nStacks; stack++) {
            const crate = line[4 * stack + 1];
            if (crate != ' ') {
                stacks[stack + 1].push(crate);
            }
        }
    }

    return stacks;
}

function parseInstruction(line) {
    const tokens = line.split(' ');
    return {
        move: Number(tokens[1]),
        from: Number(tokens[3]),
        to: Number(tokens[5]),
    };
}

function move(stack,  {move, from, to}) {
    for (let i = 0; i < move; i++) {
        const crate = stack[from].pop();
        stack[to].push(crate)
    }
}

function moveMultiple(stack, {move, from, to}) {
    const crateIdx = stack[from].length - move;
    stack[to].push(...stack[from].slice(crateIdx));
    stack[from].splice(crateIdx, move);
}

function run(input, part) {
    const { stack, instructions } = parseInput(input)

    if (part === 1) {
        for (let instruction of instructions) {
            move(stack, instruction);
        }
    }

    if (part === 2) {
        for (let instruction of instructions) {
            moveMultiple(stack, instruction);
        }
    }

    return stack.slice(1)
        .map(s => s[s.length - 1])
        .join('');
}

module.exports = {
    run,
    samples: ['CMZ','MCD']
};