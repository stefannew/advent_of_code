import expect from 'expect';

import { DayOne } from '../day-1';
import { configure } from '../../config';

describe('Day One', () => {
	describe('Part One', () => {
		it('returns the correct total distance', async() => {
			const dayOne = await setup();
			expect(await dayOne.partOne()).toEqual(11)
		});
	});

	describe('Part Two', () => {
		it('returns the correct similarity score', async() => {
			const dayOne = await setup();
			expect(await dayOne.partTwo()).toEqual(31)
		});
	});
});

async function setup() {
	const config = configure();

	const override = `3   4
4   3
2   5
1   3
3   9
3   3`;

	const day = new DayOne(config, override);
	await day.initialize();

	return day;
}
