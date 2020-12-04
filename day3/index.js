module.exports = () => {
  const puzzle = require("fs")
    .readFileSync(`${__dirname}/puzzle.txt`)
    .toString()
    .split("\n");

  const part1 = () => {
    let [trees, position] = [0, 0];

    puzzle.map((row) => {
      if (row[position] === "#") trees++;
      if (position + 3 >= row.length) position = position + 3 - row.length;
      else position += 3;
    });

    return trees;
  };

  const part2 = () => {
    let shift = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ];

    let values = shift.map((type) => {
      let position = 0;
      let trees = 0;
      if (type[1] == 1) {
        puzzle.map(row => {
          if (row[position] === "#") trees++;
          if (position + type[0] >= row.length) position = (position + type[0]) - row.length;
          else position += type[0];
        })
      } else {
        let flag = false;
        puzzle.map((row) => {
          if (!flag) {
            if (row[position] === "#") trees++;
            if (position + type[0] >= row.length) position = (position + type[0]) - row.length;
            else position += type[0];
            flag = true;
          } else flag = false;
        });
      }
      return trees;
    });

    return values.reduce((total, current) => total * current);
  };

  return `\n===== Day 3 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`;
};
