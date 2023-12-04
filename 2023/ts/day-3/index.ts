import { ISolution, Solution } from '../solution';

export class DayThree extends Solution implements ISolution {
  private readonly schematic = [];
  constructor() {
    super(3);
    this.schematic = new Array(this.lines.length);
  }
  partOne(): any {
    const partNumbers = [];

    for (let i = 0; i < this.lines.length; i++) {
      this.schematic[i] = this.lines[i].split('');
    }

    for (let i = 0; i < this.schematic.length; i++) {
      for (let j = 0; j < this.schematic[i].length; j++) {
        const symbolAdjacentValue = symbolAdjacent(i, j, this.schematic);
        if (symbolAdjacentValue > -1) {
          partNumbers.push(symbolAdjacentValue);
        }
      }
    }

    return partNumbers.reduce((acc, curr) => acc + curr, 0);
  }

  partTwo(): any {}
}

function symbolAdjacent(row: number, column: number, array: string[][]) {
  const value = array[row][column];
  if (!isNumeric(value)) {
    return -1;
  }

  const upLeft = [row - 1, column - 1];
  const up = [row - 1, column];
  const upRight = [row - 1, column];
  const left = [row, column - 1];
  const right = [row, column + 1];
  const downLeft = [row + 1, column - 1];
  const down = [row + 1, column];
  const downRight = [row + 1, column + 1];
  const directions = [upLeft, up, upRight, left, right, downLeft, down, downRight];

  let number = -1;

  directions.forEach(([directionRow, directionColumn]) => {
    try {
      const directionValue = array[directionRow][directionColumn];
      if (isSymbol(directionValue)) {
        number = parseInt(value);
      }
    } catch (e) {}
  });

  return number;
}

function isNumeric(char: string) {
  return char >= '0' && char <= '9';
}

function isSymbol(char: string) {
  return !isNumeric(char) && char !== '.';
}
