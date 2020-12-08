module.exports = () => {

  let puzzle = require('fs')
    .readFileSync(`${__dirname}/puzzle.txt`)
    .toString()
    .split('\n')
    .map(data => [data.slice(0, 7), data.slice(7)]);


  const part1 = () => {

    const calcRow = (rowData) => {
      let [front, back] = [0, 127];
      for (let x of rowData) {
        if (x === 'F') {
          back = Math.floor((front + back) / 2);
        } else {
          front = Math.ceil((front + back) / 2);
        }
      }
      return front;
    }

    const calcColumn = (columnData) => {
      let [left, right] = [0, 7];
      for (let x of columnData) {
        if (x === 'L') {
          right = Math.floor((left + right) / 2);
        } else {
          left = Math.ceil((left + right) / 2);
        }
      }
      return left
    }

    puzzle = puzzle.map(ticket => calcRow(ticket[0]) * 8 + calcColumn(ticket[1])).sort((a, b) => a - b)

    return Math.max(...puzzle);
  }

  const part2 = () => {

    let foundSeat;

    for (let i = 0; i < puzzle.length-1; i++) {
      if(puzzle[i+1] - puzzle[i] > 1) {
        foundSeat = puzzle[i] + 1;
        break;
      }
    }

    return foundSeat;
  }

  return `\n===== Day 5 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`
}