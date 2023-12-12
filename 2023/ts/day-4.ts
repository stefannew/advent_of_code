import { ISolution, Solution } from './solution';

type Card = {
  numbers: number[];
  winningNumbers: number[];
}

export class DayFour extends Solution implements ISolution {
  private winningCards: number[][];

  constructor() {
    super(4);
    const cards = this.lines.map(line => {
      const [_title, values] = line.trim().split(':');
      const [numbers, winningNumbers] = values.trim().split('|');

      return {
        numbers: numbers.trim().split(' ').filter(Boolean).map(x => parseInt(x)),
        winningNumbers: winningNumbers.trim().split(' ').filter(Boolean).map(x => parseInt(x)),
      }
    });

    this.winningCards = cards
      .map(({ numbers, winningNumbers }) => numbers.filter(number => winningNumbers.includes(number)))
      .filter(x => x.length > 0);
  }

  partOne(): number {
    const cardPoints = this.winningCards.reduce((points, card) => {
      let p = 1;
      if (card.length === 1) {
        points.push(p);
      } else {
        points.push(card.slice(1).reduce((acc, curr) => acc * 2, p));
      }

      return points;
    }, []);

    return cardPoints.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  partTwo(): number {
    const pile = [];

    this.winningCards.forEach((winningCard, index, array) => {
      const next = winningCard.length;
    });


    return pile.length;
  }

}
