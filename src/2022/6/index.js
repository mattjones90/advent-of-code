function startOfMarker(signal, size) {
    let buf = []
    for (let i = 0; i < signal.length; i++) {
        if (buf.indexOf(signal[i]) >= 0) {
            buf = buf.slice(buf.indexOf(signal[i]) + 1)
        }
        
        buf.push(signal[i]);

        if (buf.length == size) {
            return i + 1;
        }
    }

    return -1;
}

const startOfPacket  = (signal) => startOfMarker(signal, 4);
const startOfMessage  = (signal) => startOfMarker(signal, 14);

function run([signal], part) {
    if (part === 1) {
        return startOfPacket(signal);
    }

    if (part === 2) {
        return startOfMessage(signal);
    }
}

module.exports = {
    run,
    samples: [7, 19]
};