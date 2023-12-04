import * as fs from 'fs';

type InputParser = (input: string) => any;

export interface ISolution {
  partOne(): any;
  partTwo(): any;
}

export class Solution {
  private readonly input: string;
  protected readonly lines: string[];
  private readonly number;

  constructor(day: number, inputOverride?: string, inputParser: InputParser = (input: string) => input) {
    const file = fs.readFileSync(`${__dirname}/../inputs/${day}.txt`);

    this.number = day;
    this.input = inputParser(file.toString().trim());

    if (inputOverride) {
      this.input = inputParser(inputOverride);
    }

    this.lines = this.input.trim().split('\n');
  }

  name() {
    return `Day ${this.number}`
  }
}
