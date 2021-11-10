const parseBag = (buildString) => {
  console.log(buildString);
  let [bagAttributes, bagContents] = buildString.split(" bags contain ");
  console.log(bagContents);
  let parsedContents = !bagContents.includes("no other bags")
    ? bagContents.split(", ").map(
        value => ({
          count: parseInt(value[0]),
          description: value.slice(2).split(" ").slice(0, 2).join("")
        })
      )
    : [];
  return [bagAttributes, parsedContents];
}

const day7 = () => {
  const puzzle = require('fs').readFileSync(__dirname + `/puzzle.txt`).toString().split('.\n');
  const bagRules = {};
  let outerCount = 0;

  for (const entry of puzzle) {
    const [bagName, bagContents] = parseBag(entry);

    if (!Object.keys(bagRules).includes(bagName)) {
      bagRules[bagName] = bagContents;
    }
  }
  // console.log(parseBag(testing));

  for (const bagContents of Object.values(bagRules)) {
    if (bagContents.length) {
      for (const bagValue of bagContents) {
        if (bagValue.description === "shinygold") {
          console.log("found")
        }
      }
    }
  }
  console.log(bagRules['shinygold']);

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