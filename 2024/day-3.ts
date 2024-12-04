import { ISolution, Solution } from '../solution';
import { Config } from '../config';

export default class Day3 extends Solution implements ISolution {
  constructor(config: Config, override?: string) {
    super(2024, 3, config, override);
  }

  async part1() {
    const regex = new RegExp(/mul\(\d+,\d+\)/g);
    const matches = this.input.match(regex);
    const multiplyResults = matches?.map(this.multiply);

    if (!multiplyResults) {
      return -1;
    }

    return multiplyResults.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  async part2() {
    const mulRegex = new RegExp(/mul\(\d+,\d+\)/g);
    const doRegex = new RegExp(/do\(\)/g);
    const dontRegex = new RegExp(/don't\(\)/g);

    const doPositions = [...this.input.matchAll(doRegex)].map(match => match.index);
    const dontPositions = [...this.input.matchAll(dontRegex)].map(match => match.index);

    const mulMatches = [...this.input.matchAll(mulRegex)].map(match => {
      return {
        value: match[0],
        index: match.index
      };
    });

    const endIndex = mulMatches[mulMatches.length - 1].index;

    let index = 0;
    let enabled = true;
    const enabledInstructions: string[] = [];

    while (index <= endIndex) {
      if (enabled) {
        const foundMatch = mulMatches.find(match => match.index == index);
        if (foundMatch) {
          enabledInstructions.push(foundMatch.value);
          index = foundMatch.index + 1;
          continue;
        }
      }

      if (dontPositions.includes(index)) {
        enabled = false;
      }

      if (doPositions.includes(index)) {
        enabled = true;
      }

      index += 1;
    }

    const multiplyResults = enabledInstructions.map(this.multiply);

    return multiplyResults.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  private multiply(instruction: string) {
    const args = instruction.slice(instruction.indexOf('(') + 1, instruction.indexOf(')'));
    const values = args.split(',').map(value => parseInt(value));

    return values[0] * values[1];
  }
}
