import { ISolution, Solution } from './solution';

type Race = {
	time: number;
	distance: number;
}

export class DaySix extends Solution implements ISolution {
	constructor() {
		super(6);
	}

	partOne(): number {
		const races = parseInput(this.input);
		const numberWaysToWin = races.map(calculateNumberWaysToWin);
		return numberWaysToWin.reduce((acc, curr) => acc * curr, 1);
	}

	partTwo(): number {
		const race = parseInputPartTwo(this.input);
		return calculateNumberWaysToWin(race);
	}
}

function calculateNumberWaysToWin({ time, distance: raceDistance }: Race): number {
	const timesToHold = Array.from({ length: time - 1 }, (_, i) => i + 1);
	const waysToWin = [];

	for (let i = 0; i < timesToHold.length; i++) {
		const distance = getDistance(timesToHold[i], time);
		if (distance > raceDistance) {
			waysToWin.push(i);
		}
	}

	return waysToWin.length;
}

function getDistance(hold: number, record: number) {
	return hold * (record - hold);
}

function parseInput(input: string): Race[] {
	const [timeString, distanceString] = input.split('\n');

	const times = parseLineString(timeString);
	const distances = parseLineString(distanceString);

	return times.map((time, index) => {
		return {
			time,
			distance: distances[index]
		}
	});
}

function parseInputPartTwo(input: string): Race {
	const [timeString, distanceString] = input.split('\n');
	const [, time] = timeString.split(':');
	const [, distance] = distanceString.split(':');

	return {
		time: parseInt(time.split(' ').map(x => x.trim()).filter(Boolean).join('')),
		distance: parseInt(distance.split(' ').map(x => x.trim()).filter(Boolean).join(''))
	}
}

function parseLineString(str: string) {
	return str
		.split(':')
		.map(x => x.trim())[1]
		.split(' ')
		.map(x => x.trim())
		.filter(Boolean)
		.map(x => parseInt(x));
}
