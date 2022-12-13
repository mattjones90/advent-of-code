const { run } = require("./1");
const { runSolution } = require("./runSolution");

const days = 13;

if (process.argv[2]) {
    console.log(process.argv)
    runSolution(Number(process.argv[2]))
}
else {
    for (let day = 1; day <= days; day++) {
        try {
            runSolution(day);
        } catch (e) {
            console.log(e)
        }
    }
}