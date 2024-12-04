import expect from 'expect';

import { configure } from '../../config';
import Day2 from '../day-2';

describe('Day 2', () => {
  describe('Part 1', () => {
    it('returns the number of safe reports', async () => {
      const day2 = await setup();
      expect(await day2.part1()).toEqual(2);
    });
  });

  describe('Part 2', () => {
    it('returns the number of safe reports with skippable levels', async () => {
      const day2 = await setup();
      expect(await day2.part2()).toEqual(4);
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

  const day = new Day2(config, input);
  await day.initialize();

  return day;
}
