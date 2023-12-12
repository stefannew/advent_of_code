import { ISolution, Solution } from './solution';

export class DayTwo extends Solution implements ISolution {
  constructor() {
    super(2);
  }

  partOne(): number {
    const games = this.lines.map((game) => {
      const { gameNumber, sets } = this.parseGame(game);
      return {
        gameNumber,
        sets,
        possible: sets.every(isPossibleSet)
      }
    });

    return games
      .filter(({ possible }) => possible === true)
      .reduce((acc, curr) => {
        return acc + curr.gameNumber;
      }, 0)
  }

  partTwo(): number {
    const games = this.lines.map(this.parseGame);
    const powerOfRequiredColoursPerGame = games.map(({ lowestRequiredColours }) => {
      return lowestRequiredColours.green * lowestRequiredColours.blue * lowestRequiredColours.red;
    });

    return powerOfRequiredColoursPerGame.reduce((acc, curr) => acc + curr, 0);
  }

  private parseGame(game: string) {
    const [gameName, setsString] = game.split(':');
    const [_, gameNumber] = gameName.split(' ');
    const sets = setsString.split(';').map(set => createSetMap(set.split(',')));
    const lowestRequiredColours = sets.reduce((acc: Record<'green' | 'red' | 'blue', number>, curr) => {
      Object.keys(curr).forEach(key => {
        if (acc[key] < curr[key]) {
          acc[key] = curr[key]
        }
      });
      return acc;
    }, {
      green: 0,
      red: 0,
      blue: 0
    });

    return {
      gameNumber: parseInt(gameNumber),
      sets,
      lowestRequiredColours
    }
  }
}

function createSetMap(set: string[]) {
  return set.reduce((acc, curr) => {
    const [quantity, colour] = curr.trim().split(' ');
    acc[colour] = parseInt(quantity);
    return acc;
  }, {});
}

function isPossibleSet(set: Array<Record<string, number>>) {
  const constraints = {
    red: 12,
    green: 13,
    blue: 14
  };

  return Object.keys(set).every((key) => {
    return set[key] <= constraints[key];
  })
}
