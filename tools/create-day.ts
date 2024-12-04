import * as fsPromises from 'node:fs/promises';
import * as path from 'node:path';

const year = process.argv[2];
const day = process.argv[3];

const DAY_TEMPLATE = `import { ISolution, Solution } from '../solution';
import { Config } from '../config';

export default class Day${day} extends Solution implements ISolution {
  constructor(config: Config, override?: string) {
    super(${year}, ${day}, config, override);
  }

  async part1() {
    return -1;
  }

  async part2() {
    return -1;
  }
}
`;

const TEST_TEMPLATE = `import expect from 'expect';

import { configure } from '../../config';
import Day${day} from '../day-${day}';

describe('Day ${day}', () => {
  describe('Part 1', () => {

  });

  describe('Part 2', () => {

  });
});
`;

async function run() {
  await fsPromises.writeFile(
    path.join(__dirname, '..', year, `day-${day}.ts`),
    DAY_TEMPLATE
  );

  await fsPromises.writeFile(
    path.join(__dirname, '..', year, 'test', `day-${day}.test.ts`),
    TEST_TEMPLATE
  );
}


void run();
