module.exports = () => {
  /*

    1-3 a: abcde

    1-3 -> means the character must be in the password min-max (ex: min of 1, max of 3)
    a -> the character to check
    abcde -> password to verify

  */

  let puzzle = require("fs")
    .readFileSync(`${__dirname}/puzzle.txt`)
    .toString()
    .split("\n")
    .map((line) => line.split(" "));

  const part1 = () => {
    let verified = 0;
    for (let [range, character, password] of puzzle) {
      let [min, max] = range.split("-").map((val) => parseInt(val, 10));
      character = character[0];

      let count = (function checker(word, char, position = 0, count = 0) {
        let found = word.indexOf(char, position);
        if (found > -1) {
          return checker(word, char, found + 1, count + 1);
        } else {
          return count;
        }
      })(password, character);

      if (count >= min && count <= max) {
        verified++;
      }
    }
    return verified;
  };

  const part2 = () => {
    let verified = 0;
    for (let [positions, character, password] of puzzle) {
      let [first, second] = positions
        .split("-")
        .map((val) => parseInt(val, 10) - 1);
      character = character[0];
      let found = false;
      if (password[first] === character) {
        found = !found;
      }
      if (password[second] === character) {
        found = !found;
      }
      if (found) verified++;
    }
    return verified;
  };
  return `\n===== Day 2 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`;
};
