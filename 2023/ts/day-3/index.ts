import { ISolution, Solution } from '../solution';
import { isNumeric } from '../utils';

type NumberDef = {
  value: number;
  start: number;
  end: number;
  row: number;
}

type GearPosition = {
  row: number;
  col: number;
}

export class DayThree extends Solution implements ISolution {
  private readonly schematic = [];
  constructor() {
    super(3);
    this.schematic = createSchematic(this.lines);
  }
  partOne(): number {
    const numberDefinitions = gatherNumbers(this.schematic);
    const partNumbers = findPartNumbers(numberDefinitions, this.schematic);
    return partNumbers.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  partTwo(): number {
    const numberDefinitions = gatherNumbers(this.schematic);
    const gearPositions = findGearPositions(this.schematic);
    const gearAdjacent: Record<string, number[]> = getGearAdjacent(numberDefinitions, gearPositions);

    const gears = Object.values(gearAdjacent).filter(value => value.length === 2).flatMap(x => x.reduce((acc, curr) => acc * curr));

    return gears.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }
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
            value: parseInt(lines[row].substring(startIndex, endIndex + 1)),
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
      partNumbers.push(value);
    }
  }

  return partNumbers;
}

function findGearPositions(schematic: string[]): GearPosition[] {
  const positions: GearPosition[] = [];

  for (let row = 0; row < schematic.length; row++) {
    for (let col = 0; col < schematic[row].length; col++) {
      const value = schematic[row][col];
      if (isGear(value)) {
        positions.push({
          row,
          col
        });
      }
    }
  }

  return positions;
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

function getGearAdjacent(numberDefinitions: NumberDef[], gearPositions: GearPosition[]) {
  let adjacencyMap: Record<string, number[]> = {};

  for (let { row, col } of gearPositions) {
    numberDefinitions.forEach(({ start, end, row: numberRow, value }) => {
      if (row - 1 === numberRow && (col === start || col === end)) { // up
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row + 1 === numberRow && (col === start || col === end)) { // down
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row === numberRow && (col - 1 === start || col - 1 === end)) { // left
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row === numberRow && (col + 1 === start || col + 1 === end)) { // right
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row - 1 === numberRow && (col - 1 === start || col - 1 === end)) { // up-left
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row - 1 === numberRow && (col + 1 === start || col + 1 === end)) { // up-right
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row + 1 === numberRow && (col - 1 === start || col - 1 === end)) { // down-left
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }

      if (row + 1 === numberRow && (col + 1 === start || col + 1 === end)) { // down-right
        adjacencyMap = upsertMap(adjacencyMap, `${row}:${col}`, value);
      }
    });
  }

  return adjacencyMap;
}

function upsertMap(map: Record<string, number[]>, key: string, value: number) {
  if (map[key]) {
    if (map[key].includes(value)) {
      return map;
    }
    map[key].push(value);
  } else {
    map[key] = [value];
  }

  return map;
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
