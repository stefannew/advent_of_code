import { ISolution, Solution } from '../solution';
import { isNumeric } from '../utils';

type NumberDef = {
  value: string;
  start: number;
  end: number;
  row: number;
}

export class DayThree extends Solution implements ISolution {
  private readonly schematic = [];
  constructor() {
    super(3);
    this.schematic = createSchematic(this.lines);
  }
  partOne(): any {
    const numberDefinitions = gatherNumbers(this.schematic);
    const partNumbers = findPartNumbers(numberDefinitions, this.schematic);
    return partNumbers.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  partTwo(): any {}
}

function createSchematic(lines: string[]) {
  return lines.reduce((acc, curr) => {
    acc.push(curr);
    return acc;
  }, []);
}

function gatherNumbers(lines: string[]): NumberDef[] {
  const numbers: NumberDef[] = [];

  for (let row = 0; row < lines.length; row++) {
    let startIndex = 0;
    let endIndex = 0;
    let number = false;

    for (let col = 0; col < lines[row].length; col++) {
      if (isNumeric(lines[row][col])) {
        number = true;
        startIndex = col;

        while (isNumeric(lines[row][col])) {
          endIndex = col;
          col++;
        }

        if (number) {
          numbers.push({
            value: lines[row].substring(startIndex, endIndex + 1),
            start: startIndex,
            end: endIndex,
            row
          })
        }

        number = false;
      }
    }
  }

  return numbers;
}

function findPartNumbers(numberDefs: NumberDef[], schematic: string[]) {
  let partNumbers = [];

  const directions = (row, col) => ([
    isSymbolAtPosition(row - 1, col - 1, schematic), // up-left
    isSymbolAtPosition(row - 1, col, schematic), // up
    isSymbolAtPosition(row - 1, col + 1, schematic), // up-right
    isSymbolAtPosition(row, col - 1, schematic), // left
    isSymbolAtPosition(row, col + 1, schematic), // right
    isSymbolAtPosition(row + 1, col - 1, schematic), // down-left
    isSymbolAtPosition(row + 1, col, schematic), // down
    isSymbolAtPosition(row + 1, col + 1, schematic), // down-right
  ]);

  for (let { value, start, end, row } of numberDefs) {
    const startDirections = directions(row, start);
    const endDirections = directions(row, end);

    if (startDirections.some(x => x === true) || endDirections.some(x => x === true)) {
      partNumbers.push(parseInt(value));
    }
  }

  return partNumbers;
}

const isSymbolAtPosition = (row: number, col: number, lines: string[]) => {
  try {
    const value = lines[row][col];
    if (!value) {
      return false;
    }
    return !isNumeric(value) && value !== '.';
  } catch (e) {
    return false;
  }
}

function isGear(value: string) {
  return value === '*';
}

/**
 * 467..114..
 * ...*......
 * ..35..633.
 * ......#...
 * 617*......
 * .....+.58.
 * ..592.....
 * ......755.
 * ...$.*....
 * .664.598..
 */
