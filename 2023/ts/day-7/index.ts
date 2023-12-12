import { ISolution, Solution } from '../solution';

enum Type {
	FiveKind = 7,
	FourKind = 6,
	FullHouse = 5,
	ThreeKind = 4,
	TwoPair = 3,
	OnePair = 2,
	HighCard = 1
}

type Hand = {
	cards: string[];
	bid: number;
}

type HandWithType = Hand & {
	type: Type
};

type Counts = Record<string, number>;

const order = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

export class DaySeven extends Solution implements ISolution {
	constructor() {
		super(7);
	}

	partOne(): number {
		const hands = getHands(this.input).map(addType);
		const sortedReverse = hands.sort((a, b) => {
			if (a.type === b.type) {
				return tiebreaker(a, b);
			}
			return a.type > b.type ? 1 : -1;
		});

		console.log(sortedReverse);

		return sortedReverse.reduce((acc: number, curr, index) => {
			return acc + (curr.bid * (index + 1));
		}, 0);
	}

	partTwo(): number {
		return 0;
	}
}

function getHands(input: string): Hand[] {
	const lines = input.split('\n');
	return lines.map(line => {
		const [hand, bidStr] = line.trim().split(' ');
		return {
			cards: hand.split(''),
			bid: parseInt(bidStr.trim())
		}
	});
}

function addType(hand: Hand): HandWithType {
	const counts = getCounts(hand);

	let type;

	if (isFiveKind(counts)) {
		type = Type.FiveKind;
	} else if (isFourKind(counts)) {
		type = Type.FourKind;
	} else if (isFullHouse(counts)) {
		type = Type.FullHouse;
	} else if (isThreeKind(counts)) {
		type = Type.ThreeKind;
	} else if (isTwoPair(counts)) {
		type = Type.TwoPair;
	} else if (isOnePair(counts)) {
		type = Type.OnePair;
	} else {
		type = Type.HighCard;
	}

	return {
		...hand,
		type
	}
}

function getCounts({ cards }: Hand): Record<string, number> {
	return cards.reduce((acc, curr) => {
		if (acc[curr]) {
			acc[curr] = acc[curr] + 1;
		} else {
			acc[curr] = 1;
		}

		return acc;
	}, {});
}

function isFiveKind(counts: Counts) {
	return Object.keys(counts).length === 1;
}

function isFourKind(counts: Counts) {
	return Object.values(counts).some(x => x === 4);
}

function isFullHouse(counts: Counts) {
	return Object.values(counts).some(x => x === 2) && Object.values(counts).some(x => x === 3);
}

function isThreeKind(counts: Counts) {
	return Object.values(counts).some(x => x === 3);
}

function isTwoPair(counts: Counts) {
	return Object.values(counts).filter(x => x === 2).length === 2;
}

function isOnePair(counts: Counts) {
	return Object.values(counts).filter(x => x === 2).length === 1;
}

function tiebreaker(a: Hand, b: Hand) {
	if (a.cards[0] === b.cards[0]) {
		return tiebreaker({ ...a, cards: a.cards.slice(1) }, { ...b, cards: b.cards.slice(1) })
	}

	if (order.indexOf(a.cards[0]) > order.indexOf(b.cards[0])) {
		return 1;
	}

	return -1;
}
