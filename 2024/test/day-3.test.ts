import expect from 'expect';

import { configure } from '../../config';
import Day3 from '../day-3';

describe('Day 3', () => {
  describe('Part 1', () => {
    it('returns the correct result of all multiply instructions, summed', async () => {
      const day = await setup('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))');

      expect(await day.part1()).toEqual(161);
    });
  });

  describe('Part 2', () => {
    it('considers conditional statements', async () => {
      const day = await setup('xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))');

      expect(await day.part2()).toEqual(48);
    });
  });
});

async function setup(input: string) {
  const config = configure();

  const day = new Day3(config, input);
  await day.initialize();

  return day;
}
