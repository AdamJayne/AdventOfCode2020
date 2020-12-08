module.exports = () => {
  let puzzle = require('fs').readFileSync(__dirname + `/puzzle.txt`).toString();

  const part1 = () => {
    return 0;
  }
  const part2 = () => {
    return 0;
  }

  return `\n===== Day 7 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`
}