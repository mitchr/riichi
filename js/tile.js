// the suit is determined by an integer
// 	0 is dots, or 'pin'
// 	1 is bamboo, or 'sozu'
// 	2 is characters, or 'man'
//  3 is honor tiles
// the number is an integer from 0-9
// 	if the tile is an honor tile, the numbering will be
// 		0 is east
// 		1 is south
// 		2 is west
// 		3 is north
// 		4 is red
// 		5 is green
// 		6 is white
// node is used for linking the tile to the DIV

const PIN = 0;
const SOZU = 1;
const MAN = 2;
const HONOR = 3;

class tile {
	constructor(suit, num, node=undefined) {
		this.suit = suit;
		this.num = num;
		this.node = node;
	}

	toString() {
		return `Suit: ${this.suit}\nNumber: ${this.number}\nHonor: ${this.honor}\n`
	}

	static sameSuit(tiles) {
		for (let i = 1; i < tiles.length; i++) {
			if (tiles[0].suit != tiles[i].suit) {
				return false;
			}
		}
		return true;
	}

	static sameNum(tiles) {
		for (let i = 1; i < tiles.length; i++) {
			if (tiles[0].num != tiles[i].num) {
				return false;
			}
		}
		return true;
	}

	// returns -1 if a is 'less than' b, 0 if they are the same, and 1 is a is 'greater than' b
	static compareTo(a, b) {
		if (a.suit == b.suit && a.num == b.num) {
			return 0;
		}

		switch (a.suit) {
			case PIN: // pin
				// if they are both pin tiles, we can just return their difference, which will do the correct positive negative business
				// aren't real numbers cool
				if (b.suit == PIN) {
					return a.num - b.num;
				} else {
					return -1;
				}
			break;
			case SOZU: // sozu
				if (b.suit == PIN) {
					return 1;
				} else if (b.suit == SOZU) {
					return a.num - b.num;
				} else {
					return -1;
				}
			break;
			case MAN: // man
				if (b.suit == PIN || b.suit == SOZU) {
					return 1;
				} else if (b.suit == MAN) {
					return a.num - b.num;
				} else {
					return -1;
				}
			break;
			case HONOR: // honor
				if (b.suit == HONOR) {
					return a.num - b.num;
				} else {
					return 1;
				}
			break;
		}
	}
}

// tiles = []
// tiles.push(new tile(0, 8))
// tiles.push(new tile(2, 3))
// tiles.push(new tile(2, 1))
// tiles.push(new tile(3, 2))
// tiles.push(new tile(1, 4))
// tiles.push(new tile(0, 7))
// tiles.sort(tile.compareTo)
// console.log(tiles)
