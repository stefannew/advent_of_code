import { ISolution, Solution } from '../solution';
import { isNumeric } from '../utils';

const STR_NUMBERS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const WORD_NUMBERS = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};

const TEST_INPUT = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

export class DayOne extends Solution implements ISolution {
  constructor() {
    super(1);
  }

  partOne() {
    const values = this.lines
      .map(getNumberIndices)
      .map(getFirstAndLastNumber)
      .map(joinNumbers)

    return values.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  partTwo() {
    const values = this.lines
      .map(getAllIndexArrays)
      .map(getFirstAndLastNumber)
      .map(joinNumbers);

    return values.reduce((acc, curr) => {
      return acc + curr;
    }, 0);  }
}


function joinNumbers(numbers: [string, string]): number {
  return parseInt(`${numbers[0]}${numbers[1]}`);
}

function getFirstAndLastNumber(indices: Array<Record<string, number>>): [string, string] {
  const sorted = indices.sort((a, b) => Object.values(a)[0] - Object.values(b)[0]);
  if (sorted.length === 1) {
    const first = Object.keys(sorted[0])[0];
    return [first, first];
  }

  const first = Object.keys(sorted[0])[0];
  const last = Object.keys(sorted[sorted.length - 1])[0];

  return [first, last];
}

function getNumberIndices(line: string) {
  const indices: Array<Record<string, number>> = [];
  line.split('').forEach((char, index) => {
    if (isNumeric(char)) {
      if (index > -1) {
        indices.push({
          [char]: index
        })
      }
    }
  });
  return indices;
}

function getNumericWordIndices(line: string) {
  const indices: Array<Record<string, number>> = [];
  for (let word of STR_NUMBERS) {
    let indexes = [];
    let i = -1;

    while ((i = line.indexOf(word, i + 1)) != -1) {
      const key = wordToNumberString(word);

      indexes.push({
        [key]: i
      })
    }

    indices.push(...indexes);
  }
  return indices;
}

function wordToNumberString(word: string) {
  return WORD_NUMBERS[word];
}

function getAllIndexArrays(line: string) {
  return [
    ...getNumericWordIndices(line),
    ...getNumberIndices(line)
  ];
}
