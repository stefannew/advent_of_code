import expect from 'expect';

import { configure } from '../../config';
import DayTwo from '../day-2';

describe('Day Two', () => {
  describe('Part One', () => {
    it('returns the number of safe reports', async () => {
      const dayTwo = await setup();
      expect(await dayTwo.partOne()).toEqual(2);
    });
  });

  describe('Part Two', () => {
    it('returns the number of safe reports with skippable levels', async () => {
      const dayTwo = await setup();
      expect(await dayTwo.partTwo()).toEqual(4);
    });
  });
});

async function setup() {
  const config = configure();

  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

  const day = new DayTwo(config, input);
  await day.initialize();

  return day;
}
