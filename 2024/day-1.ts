import { ISolution, Solution } from '../solution';
import { Config } from '../config';

export default class Day1 extends Solution implements ISolution {
  constructor(config: Config, override?: string) {
    super(2024, 1, config, override);
  }

  private createLists() {
    return this.lines.reduce((acc: Record<string, number[]>, curr) => {
      const values = curr.split('   ').map(value => parseInt(value));

      acc.one.push(values[0]);
      acc.two.push(values[1]);

      return acc;
    }, { one: [], two: [] });
  }

  async part1() {
    const lists = this.createLists();

    const listOne = lists.one.sort();
    const listTwo = lists.two.sort();

    const differences = listOne.reduce((acc: number[], curr, index) => {
      acc.push(Math.abs(listTwo[index] - curr));
      return acc;
    }, []);

    return differences.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  async part2() {
    const lists = this.createLists();

    const occurrencesListTwo = lists.two.reduce((acc: Record<number, number>, curr) => {
      if (acc[curr]) {
        acc[curr] += 1;
      } else {
        acc[curr] = 1;
      }

      return acc;
    }, {});

    const similarityScores = lists.one.reduce((acc: number[], curr) => {
      const score = occurrencesListTwo[curr] ? occurrencesListTwo[curr] * curr : 0;
      acc.push(score);
      return acc;
    }, []);

    return similarityScores.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }
}
