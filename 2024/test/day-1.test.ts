import expect from 'expect';

import { configure } from '../../config';
import DayOne from '../day-1';

describe('Day One', () => {
  describe('Part One', () => {
    it('returns the correct total distance', async () => {
      const dayOne = await setup();
      expect(await dayOne.partOne()).toEqual(11)
    });
  });

  describe('Part Two', () => {
    it('returns the correct similarity score', async () => {
      const dayOne = await setup();
      expect(await dayOne.partTwo()).toEqual(31)
    });
  });
});

async function setup() {
  const config = configure();

  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

  const day = new DayOne(config, input);
  await day.initialize();

  return day;
}
