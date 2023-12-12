import { ISolution, Solution } from '../solution';

type Graph = Record<string, [string, string]>;

export class DayEight extends Solution implements ISolution {
	constructor() {
		super(8);
	}

	partOne(): number {
		const { instructions, graph } = parseInput(this.input);

		let current = 'AAA';
		let currentStep = 0;
		let count = 0;

		while (current !== 'ZZZ') {
			if (currentStep >= instructions.length) {
				currentStep = 0;
			}

			if (instructions[currentStep] === 'L') {
				current = graph[current][0];
			}

			if (instructions[currentStep] === 'R') {
				current = graph[current][1];
			}

			count += 1;
			currentStep += 1;
		}

		return count;
	}

	partTwo(): number {
		return 0;
	}
}

function parseInput(input: string) {
	const [instructions, graph] = input.split('\n\n');

	return {
		instructions: instructions.trim().split(''),
		graph: buildGraph(graph.trim())
	}
}

function buildGraph(input: string): Graph {
	return input.split('\n').reduce((acc, curr) => {
		const [pointer, nodes] = curr.split(' = ');
		const [left, right] = nodes.split(',').map(x => x.trim());

		acc[pointer] = [left.substr(1), right.substr(0, right.indexOf(')'))]

		return acc;
	}, {});
}
