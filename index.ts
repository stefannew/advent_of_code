import { DayOne } from './2024/day-1';
import { configure } from './config';

const config = configure();

const days = [
	new DayOne(config)
];

(async () => {
	for await (const day of days) {
		await day.initialize();

		const partOneResult = await day.partOne();
		const partTwoResult = await day.partTwo();

		console.log(day.name());
		console.log('----------------------------------------');
		console.log(`Part One: ${partOneResult}`);
		console.log(`Part Two: ${partTwoResult}`);
		console.log('----------------------------------------');
		console.log('\n');
	}
})();
