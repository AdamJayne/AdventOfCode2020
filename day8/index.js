const fs = require("fs");

const parseEntry = (entryString) => {
  const [type, count] = entryString.split(" ");
  return {
    type,
    count: parseInt(count),
    run: 0,
  };
};

const runCommand = (commands, position=0, total=0) => {
  const currentCommand = commands[position];
  if (currentCommand.run > 0) {
    return total;
  }
  switch (currentCommand.type) {
    case 'nop':
      position++;
      break;
    case 'jmp':
      position += currentCommand.count;
      break;
    case 'acc':
      position++;
      total += currentCommand.count;
      break;
  }
  currentCommand.run++;
  return runCommand(commands, position, total);
}

const solve = (testing = false) => {
  const puzzle = fs
    .readFileSync(`${__dirname}${testing ? "/practice.txt" : "/puzzle.txt"}`)
    .toString()
    .split(testing ? "\r\n" : "\n")
    .map(parseEntry);

  const part1 = () => runCommand(puzzle);

  const part2 = () => undefined;

  return `\n===== Day 7 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`
};

if (require.main) {
  console.log(solve());
}

module.exports = solve;
