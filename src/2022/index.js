const { runSolution } = require("./runSolution");

const days = 5;

for(let day = 1; day <= days; day++) {
    try {
        runSolution(day);
    } catch (e) {
        console.log(e)
    } 
}
