const { readInput } = require('./util');
const chalk = require('chalk');

function runSolution(day) {
    const solution = require(`./${day}`);
    if (solution.samples) {
        for (let i = 0; i < solution.samples.length; i++) {
            const part = i + 1;
            const actual = solution.run(readInput(`./${day}/sample.txt`), part, true);
            const expected = solution.samples[i];
            if (actual == expected) {
                console.log(chalk.green(`sample for day ${day}-${part} matched expected: ${expected}`));
            } else {
                console.log(chalk.red(`sample for day ${day}-${part} did not match expected (${expected}): ${actual}`));
            }
        }
    }

    console.log(`solution for day ${day}-1: ${solution.run(readInput(`./${day}/input.txt`), 1)}`);
    console.log(`solution for day ${day}-2: ${solution.run(readInput(`./${day}/input.txt`), 2)}`);
}

exports.runSolution = runSolution;
