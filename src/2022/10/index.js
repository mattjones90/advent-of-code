class CPU {
    constructor(instructions) {
        this.x = 1;
        this.cycle = 0;
        this.pCounter = 0;
    }

    tick() {

    }
}

function run(input, part) {
    const instructions = input.map(line => line.split(' '));
    const commands = {
        noop() {
            return () => true;
        },
        addx(state, args) {
            let ticks = 0;
            return () => {
                ticks++;
                if (ticks == 2) {
                    state.x += Number(args[0]);
                }
                return ticks == 2;
            }
        }
    };

    let cycle = 0;
    let state = { x: 1 }

    if (part === 1) {
        const signalOutputs = [];
        for (let [cmd, ...args] of instructions) {
            const tick = commands[cmd](state, args);

            let isComplete = false;
            while (!isComplete) {
                cycle++;
                if (cycle % 20 == 0) {
                    signalOutputs.push(state.x * cycle);
                }

                isComplete = tick()
            }
        }

        return signalOutputs[0]
            + signalOutputs[2]
            + signalOutputs[4]
            + signalOutputs[6]
            + signalOutputs[8]
            + signalOutputs[10];
    }

    if (part === 2) {
        const crt = [];
        for (let [cmd, ...args] of instructions) {
            const tick = commands[cmd](state, args);

            let isComplete = false;
            while (!isComplete) {
                cycle++;

                let px = cycle % 40;
                crt.push(px >= state.x && px < state.x + 3 ? '█' : '.')
                isComplete = tick()
            }
        }

        for(let i = 0 ; i < 6; i++) {
            console.log(crt.slice(40 * i, 40* (i+1)).join(''))
        }
    }
}

module.exports = {
    run,
    samples: [13140,]
};