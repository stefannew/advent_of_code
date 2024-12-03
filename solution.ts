import { Config } from './config';


export interface ISolution {
  partOne: () => Promise<number | string>;
  partTwo: () => Promise<number | string>;
}

export class Solution {
  protected input: string = '';
  protected lines: string[] = [];

  constructor(
    private readonly year: number,
    private readonly day: number,
    private readonly config: Config,
    private readonly inputOverride?: string
  ) {
  }

  async initialize() {
    this.input = this.inputOverride ? this.inputOverride : await this.fetchInput();
    this.lines = this.input.split('\n');
  }

  name() {
    return `Year: ${this.year}, Day: ${this.day}`;
  }

  private async fetchInput() {
    const url = `https://adventofcode.com/${this.year}/day/${this.day}/input`;

    const response = await fetch(url, {
      headers: {
        cookie: `session=${this.config.session}`
      }
    });
    const text = await response.text();

    return text.trim();
  }
}
