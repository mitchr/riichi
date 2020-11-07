class hand {
	constructor(tiles) {
		this.tiles = tiles;
	}

	push(tile) {
		this.tiles.push(tile)
	}

	determineProperties() {
		let triplets = this.triplets();
		let sequences = this.sequences();

		// a tile cannot be contained in more than a single meld, so it cannot be in a triplet and a sequence at the same time. how to handle that?
	}

	waits() {
		let triplets = this.triplets();
		let sequences = this.sequences();

		// list of tiles that are not contained in a meld
		let unMelded = [];
		for (let i = 0; i < this.tiles.length; i++) {
			let found = false;

			for (let j = 0; j < triplets.length; j++) {
				if (triplets[j].includes(this.tiles[i])) {
					found = true;
				}
			}

			for (let j = 0; j < sequences.length; j++) {
				if (sequences[j].includes(this.tiles[i])) {
					found = true;
				}
			}

			// not found in any current meld
			if (found == false) {
				unMelded.push(this.tiles[i]);
			}
		}

		console.log(unMelded);
	}

	// return list of array of tiles that are contained in triplets
	triplets() {
		// hand doesn't even contain 3 tiles
		if (this.tiles.length < 3) {
			return [];
		}

		let triples = [];
		let i = 0;

		while(i < this.tiles.length) {
			// check if the current tile + the next two form a triplet
			let possibleTriple = [this.tiles[i], this.tiles[i+1], this.tiles[i+2]]

			// if this contains an undefined, we've reached past the end of the hand
			if (possibleTriple.includes(undefined)) {
				return triples;
			}

			// if these 3 tiles have the same suit and number, push them
			if (tile.sameSuit(possibleTriple) && tile.sameNum(possibleTriple)) {
				triples.push(possibleTriple)
				// move 3 positions to look at next possible tile
				i += 3;
			} else {
				i++;
			}
		}

		return triples
	}

	// return list of array of tiles that are contained in sequences;
	sequences() {
		// cannot contain a meld; too small a hald
		if (this.tiles.length < 3) {
			return [];
		}

		let sequences = [];
		let i = 0;
		while(i < this.tiles.length) {
			let possibleSeq = [this.tiles[i], this.tiles[i+1], this.tiles[i+2]];

			// we've reached the end of the hand, so there can't be anymore triples
			if (possibleSeq.includes(undefined)) {
				return sequences;
			}

			// if all 3 tiles are the same suit and they are increasing by 1, push them
			if (tile.sameSuit(possibleSeq) && possibleSeq[1].num - possibleSeq[0].num == 1 && possibleSeq[2].num - possibleSeq[1].num == 1) {
				sequences.push(possibleSeq);
				i += 3;
			} else {
				i++;
			}
		}

		return sequences;
	}
}

let h = new hand([]);

// clear button
window.addEventListener("DOMContentLoaded", (event) => {
	document.getElementById("calculate").onclick = function() {
		h.determineProperties()
	};
	document.getElementById("clear").onclick = function() {
		document.getElementById("hand").innerHTML = "";
		h.tiles = [];
	}
})

window.addEventListener("DOMContentLoaded", (event) => {
	let tiles = document.getElementsByClassName("tile");
	for (let i = 0; i < tiles.length; i++) {
		// when a tile is clicked, add clone of that tile to the hand
		tiles[i].onclick = function() {
			let handNode = document.getElementById("hand")

			// can't add more than 14 tiles to a hand
			if (handNode.childElementCount >= 14) {
				return;
			}

			let clone = this.cloneNode(true)
			// when an element in the hand is clicked, remove it from the drawer
			clone.onclick = function() {
				// remove from DOM
				this.parentNode.removeChild(this)

				// find this node in h and remove it
				let idx = h.tiles.map(a => a.node).indexOf(this)
				h.tiles.splice(idx, 1);
			}

			// add node to hand (visually place in DOM)
			handNode.appendChild(clone)
			// add tile representation to hand
			h.push(nodeToTile(clone))

			// sort the tiles so they are in a sensible order
			// the map here extracts all the nodes from the hand tiles into an array
			let sorted = h.tiles.sort(tile.compareTo).map(a => a.node)
			// remove all dom elements
			handNode.innerHTML = "";
			// put them back in the correct order
			for (let i = 0; i < sorted.length; i++) {
				handNode.appendChild(sorted[i])
			}

			// probably want to calculate hand here as well...
		}
	}
})

// parses img source filename into a tile object
// have to pass in the htmlelementNode of the tile div
function nodeToTile(node) {
	let suitNum = node.children[2].src.split("/").pop().split(".")[0];
	let suit = suitNum.slice(0, suitNum.length-1);
	let num = parseInt(suitNum[suitNum.length-1]);

	switch (suit) {
		case 'Pin':
			suit = 0;
		break;
		case 'Sou':
			suit = 1;
		break;
		case 'Man':
			suit = 2;
		break;
		default: // honor tile
			suit = 3;
			// we can just switch on suitNum here since honor tile filenames don't have any numbers
			switch (suitNum) {
				case 'Ton':
					num = 0;
				break;
				case 'Nan':
					num = 1;
				break;
				case 'Shaa':
					num = 2;
				break;
				case 'Pei':
					num = 3;
				break;
				case 'Haku':
					num = 4;
				break;
				case 'Hatsu':
					num = 5;
				break;
				case 'Chun':
					num = 6;
				break;
			}
	}

	return new tile(suit, num, node)
}
