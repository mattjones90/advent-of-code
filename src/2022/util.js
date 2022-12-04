const fs = require('fs');

function readInput(path) {
    return fs.readFileSync(path, 'utf8').split('\n');
}

module.exports = {
    readInput
}