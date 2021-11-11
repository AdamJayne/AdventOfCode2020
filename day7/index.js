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

const countNumberOfOuterBags = (bag, bagList, outerBags=[], accumulation=0) => {

  for (const [bagName, bagContents] of Object.entries(bagList)) {
    if (bagName !== bag && bagContents.length) {
      for (const bagValue of bagContents) {
        if (bagValue.description === bag && !outerBags.includes(bagName)) {
          outerBags.push(bagName);
          accumulation = countNumberOfOuterBags(bagName, bagList, outerBags, accumulation + 1);
        }
      }
    }
  }

  return accumulation;
}

const day7 = () => {
  const puzzle = require('fs').readFileSync(__dirname + `/puzzle.txt`).toString().split('.\n');
  const bagRules = {};
  
  for (const entry of puzzle) {
    const [bagName, bagContents] = parseBag(entry);
    if (!Object.keys(bagRules).includes(bagName)) {
      bagRules[bagName] = bagContents;
    }
  }

  const part1 = () => {
    return countNumberOfOuterBags("shiny gold", bagRules);
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