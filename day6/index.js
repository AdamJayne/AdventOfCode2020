const { group, groupCollapsed } = require("console");

module.exports = () => {
  let puzzle = require("fs")
    .readFileSync(__dirname + `/puzzle.txt`)
    .toString();

  const part1 = () => {
    let total = 0;
    let groups = puzzle.split("\n\n").map(group => group.split('\n'));
    groups.forEach(group => {
      let questions = {}
      for(person of group) {
        for (let q of person) {
          questions[q] += true;
        }
      }
      total += Object.keys(questions).length;
    })
    return total;
  };
  const part2 = () => {
    let total = 0;
    let groups = puzzle.split("\n\n").map(group => group.split('\n'));
    groups.forEach(group => {
      let questions = {}
      for(person of group) {
        for (let q of person) {
          questions[q] = questions[q] ? questions[q] + 1 : 1;
        }
      }
      for(let key of Object.keys(questions)) {
        if(questions[key] === group.length) {
          total += 1
        }
      }
    })
    return total;
  };

  return `\n===== Day 6 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`;
};
