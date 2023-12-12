import { ISolution, Solution } from './solution';

export class DayFive extends Solution implements ISolution {
	constructor() {
		super(5);
	}

	partOne(): any {
		const seedLocations = getSeedLocations(this.input);
		console.log('seedLocations', seedLocations);
		return Math.min(...seedLocations);
	}

	partTwo(): any {
	}
}

class RangeGroup {
	private ranges: Range[] = [];

	addRange(range: Range) {
		this.ranges.push(range);
	}

	sourceToDestination(value: number) {
		const ranges = this.ranges.map(range => range.getRange());
		let found = -1;

		for (let range of ranges) {
			if (value >= range.source[0] && value <= range.source[1]) {
				// it's inside the range
				const offset = value - range.source[0];
				found = range.destination[0] + offset;
			}
		}

		return found > 0 ? found : value;
	}
}

class Range {
	constructor(
		private readonly sourceRange: [number, number],
		private readonly destinationRange: [number, number]
	) {}

	getRange() {
		return {
			source: this.sourceRange,
			destination: this.destinationRange
		}
	}
}

function getSeedLocations(input: string) {
	const sections = input.trim().split('\n\n');
	const seeds = sections[0].trim().split(':')[1].trim().split(' ').map(x => parseInt(x.trim()));
	const stringSections = sections.slice(1);

	return seeds.map((seed) => {
		return stringSections.reduce((acc, curr) => {
			const rangeStrings = curr.split(':')[1].trim().split('\n');
			const ranges = rangeStrings.map(s => s.trim().split(' ').map(x => parseInt(x.trim())));
			const rangeGroup = new RangeGroup();

			ranges.forEach(rangeString => {
				const [destination, source, length] = rangeString;

				const sourceRange: [number, number] = [source, source + (length - 1)];
				const destinationRange: [number, number] = [destination, destination + (length - 1)];

				rangeGroup.addRange(new Range(sourceRange, destinationRange));
			});

			return rangeGroup.sourceToDestination(acc);
		}, seed);
	});
}

