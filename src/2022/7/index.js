class Directory {
    constructor(parent, name) {
        this.parent = parent;
        this.name = name;
        this.children = [];
    }

    size() {
        let total = 0;
        for (let child of this.children) {
            total += child.size();
        }
        return total;
    }
}

class File {
    constructor(parent, name, filesize) {
        this.parent = parent;
        this.name = name;
        this.filesize = filesize;
    }

    size() {
        return this.filesize;
    }
}

function parseInput(input) {
    return input;
}

function run(input, part, isSample) {
    input = parseInput(input)

    const root = new Directory(null, '/')
    const dirs = [root];

    let dir = null;
    for (let i = 0; i < input.length; i++) {
        const tokens = input[i].split(' ');
        if (tokens[0] == '$') {
            const cmd = tokens[1];
            if (cmd == 'cd') {
                const folder = tokens[2];
                if (folder == '/') {
                    dir = root;
                } else if (folder == '..') {
                    dir = dir.parent;
                }
                else {
                    dir = dir.children.filter(f => f.name == folder)[0];
                }
            }

            if (cmd == 'ls') {
                i++;
                for (; i < input.length && !input[i].startsWith('$'); i++) {
                    const line = input[i].split(' ');
                    if (line[0] == 'dir') {
                        const directory = new Directory(dir, line[1]);
                        dir.children.push(directory)
                        dirs.push(directory);
                    } else {
                        const file = new File(dir, line[1], Number(line[0]));
                        dir.children.push(file)
                    }
                }
                i--;
            }
        }
    }

    if (part === 1) {
        return dirs
            .filter(d => d.size() <= 100000)
            .reduce((acc, dir) => acc += dir.size(), 0)
    }

    if (part === 2) {
        let totalSpace = 70_000_000;
        let targetSpace = 30_000_000;
        let usedSpace = root.size();
        let remainingSpace = totalSpace - usedSpace;

        dirs.sort((a, b) => a.size() - b.size())

        for (let i = 0; i < dirs.length; i++) {
            if (remainingSpace + dirs[i].size() > targetSpace) {
                return dirs[i].size()
            }
        }
    }
}

module.exports = {
    run,
    samples: [95437, 24933642]
};