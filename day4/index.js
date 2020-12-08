const { parse } = require("path");

module.exports = () => {
  let puzzle = require("fs")
    .readFileSync(__dirname + "/puzzle.txt")
    .toString()
    .split("\n\n")
    .map((passport) => {
      let unit = {};
      passport.split("\n").forEach((line) => {
        line.split(" ").forEach((item) => {
          let [x, y] = item.split(":");
          unit[x] = y;
        });
      });
      return unit;
    });

  const toCheck = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  const part1 = () => {
    let valid = 0;
    puzzle.forEach((passport) => {
      let difference = toCheck.filter((x) => !Object.keys(passport).includes(x))
        .length;
      if (difference === 0) {
        valid++;
      }
    });
    return valid;
  };

  const part2 = () => {
    let valid = 0;
    puzzle.forEach((passport) => {
      let difference = toCheck.filter((x) => !Object.keys(passport).includes(x))
        .length;
      if (difference === 0) {
        let discrepancy = false;
        for (let key of toCheck) {
          let options;
          if (discrepancy) break;
          const passportItem = passport[key];
          switch(key) {
            case 'byr':
              // Four digits, between 1920 and 2002
              if(passportItem.length !== 4 || parseInt(passportItem) < 1920 || parseInt(passportItem) > 2002) {
                discrepancy = true;
              }
              break;
            case 'iyr':
              // Four digits, between 2010 and 2020
              if(passportItem.length !== 4 || parseInt(passportItem) < 2010 || parseInt(passportItem) > 2020) {
                discrepancy = true;
              }
              break;
            case 'eyr':
              // four digits, between 2020 and 2030
              if(passportItem.length !== 4 || parseInt(passportItem) < 2020 || parseInt(passportItem) > 2030) {
                discrepancy = true;

              }
              break;
            case 'hgt':
              // cm or in
              // cm -> 150 to 193
              // in -> 59 to 76
              if(passportItem.indexOf('cm') > 0) {
                const height = parseInt(passportItem.substring(0, 3))
                if(height < 150 || height > 193) {
                  discrepancy = true;
                }
              } else if (passportItem.indexOf('in') > 0) {
                const height = parseInt(passportItem.substring(0, 2));
                if(height < 59 || height > 76) {
                  discrepancy = true;
                }
              } else {
                discrepancy = true;
              }
              break;
            case 'hcl':
              // Hex color
              options = '0123456789abcdef';
              if(passportItem[0] !== "#" || passportItem.length < 7) discrepancy = true;
              else {
                try {
                  parseInt(passportItem.slice(1), 16);
                } catch (e) {
                  console.log(e);
                  discrepancy = true;
                }
              }
              break;
            case 'ecl':
              options = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
              if(options.indexOf(passportItem) < 0) {
                discrepancy = true;
              }
              // has to be one of these
              break;
            case 'pid':
              const validateId = (passport) => {
                try {
                  parseInt(passport, 10);
                  return true
                } catch (e) {
                  return false
                }
              }
              if(!(passportItem.length === 9) || !validateId(passportItem)) {
                discrepancy = true;
              }
              // nine digit number, leading 3 zeroes
              break;
          }
        }
        if(!discrepancy) valid++;
      }
    });
    return valid;
  };

  return `\n===== Day 4 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`;
};
