const oppMapping = {
    A: 'R',
    B: 'P',
    C: 'S'
}
const meMapping = {
    X: 'R',
    Y: 'P',
    Z: 'S'
}
const scores = {
    type: {
        R: 1,
        P: 2,
        S: 3
    },
    outcomes: {
        W: 6,
        D: 3,
        L: 0,
    }
}

const outcomes = {
    R: {
        W: 'S',
        L: 'P'
    },
    P: {
        W: 'R',
        L: 'S'
    },
    S: {
        W: 'P',
        L: 'R'
    },
}

const getGameP1 = (opp, me) => {
    return [oppMapping[opp], meMapping[me]]
}

const getGameP2 = (opp, me) => {
    const oppMove = oppMapping[opp];
        let move;
        if (me == 'X') {
            move = outcomes[oppMove].W
        }
        if (me == 'Y') {
            move = oppMove
        }
        if (me == 'Z') {
            move = outcomes[oppMove].L
        }
        return [oppMapping[opp], move]
}

function run(input, part) {
    const games = [];
    
    const getGame = part == 1 ? getGameP1 : getGameP2;

    for (let line of input) {
        const [opp, me] = line.split(' ');
        games.push(getGame(opp, me))
    }

    function getOutcome(opp, me) {
        if (outcomes[me].W == opp) {
            return 'W'
        }
        if (outcomes[me].L == opp) {
            return 'L'
        }
        return 'D'
    }

    function score(type, outcome) {
        return scores.type[type] + scores.outcomes[outcome]
    }

    let scoreTotal = 0;
    for (let game of games) {
        const [opp, me] = game;
        scoreTotal += score(me, getOutcome(opp, me))
    }
    return scoreTotal;
}

module.exports = { run, samples: [15, 12] };