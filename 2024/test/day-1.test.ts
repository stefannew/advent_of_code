import expect from 'expect';

import { configure } from '../../config';
import Day1 from '../day-1';

describe('Day 1', () => {
  describe('Part 1', () => {
    it('returns the correct total distance', async () => {
      const day1 = await setup();
      expect(await day1.part1()).toEqual(11)
    });
  });

  describe('Part 2', () => {
    it('returns the correct similarity score', async () => {
      const day1 = await setup();
      expect(await day1.part2()).toEqual(31)
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

  const day = new Day1(config, input);
  await day.initialize();

  return day;
}
