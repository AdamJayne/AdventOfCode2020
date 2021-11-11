const parseBag = (buildString) => {
  let [bagAttributes, bagContents] = buildString.split(" bags contain ");
  let parsedContents = !bagContents.includes("no other bags")
    ? bagContents.split(", ").map(
        value => ({
          count: parseInt(value[0]),
          description: value.slice(2).split(" ").slice(0, 2).join(" ")
        })
      )
    : [];
  return [bagAttributes, parsedContents];
}

const checkIfContained = (bag, bagList, accumulation=0) => {

  for (const [bagName, bagContents] of Object.entries(bagList)) {
    if (bagName !== bag && bagContents.length) {
      for (const bagValue of bagContents) {
        if (bagValue.description === bag) {

        }
        if (bagValue.description === bag) {
          console.log("contained")
          console.log(accumulation)
          accumulation += checkIfContained(bagName, bagList, 1);
        }
      }
    }
  }

  return accumulation;
}

const day7 = () => {
  const puzzle = require('fs').readFileSync(__dirname + `/practice.txt`).toString().split('.\r\n');
  const bagRules = {};
  let outerCount = 0;
  
  
  for (const entry of puzzle) {
    const [bagName, bagContents] = parseBag(entry);
    if (!Object.keys(bagRules).includes(bagName)) {
      bagRules[bagName] = bagContents;
    }
  }
1
  console.log(bagRules)

  console.log(checkIfContained("shiny gold", bagRules));
  

  const part1 = () => {
    return 0;
  }
  const part2 = () => {
    return 0;
  }

  return `\n===== Day 7 =====\nPart 1 -> ${part1()}\nPart 2 -> ${part2()}`
}

// If the file is run directly instead of imported, run this line
if (require.main) {
  console.log(day7());
}

module.exports = day7;