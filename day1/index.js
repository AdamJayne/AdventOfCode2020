module.exports = function Day1 () {
    let puzzle = require('fs').readFileSync(__dirname + '/puzzle.txt').toString();
    puzzle = puzzle.split('\n').map((value) => Number(value));
    return `===== Day 1 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`;

    function part1() {
        // O(n^2) isn't great, will refine further
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle.length; j++) {
                if (i===j) break;
                if (puzzle[i] + puzzle[j] === 2020) {
                    return puzzle[i] * puzzle[j];
                }
            }
        }
    }

    function part2() {
        // O(n^3), oh boy this needs fixed
        for (let i = 0; i < puzzle.length; i++) {
            for (let j = 0; j < puzzle.length; j++) {
                if (i===j) break;
                for (let k = 0; k < puzzle.length; k++) {
                    if (i===k || j===k) break;
                    if (puzzle[i] + puzzle[j] + puzzle[k] === 2020) {
                        return puzzle[i] * puzzle[j] * puzzle[k];
                    }
                }
            }
        }
    }
}