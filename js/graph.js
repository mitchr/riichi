
// http://www.mathcs.emory.edu/~cheung/Courses/171/Syllabus/11-Graph/weighted.html
class node {
	constructor(next, data, weight) {
		this.next = next;

		// data describes the properties of the hand
		this.data = data;
		// weight is the weight of a vertex from it's parent node in the adjacency list
		this.weight = weight;
	}
}

class List {
	constructor() {
		this.head = null;
	}

	length() {
		let l = 0;
		let current = this.head;
		while(current != null) {
			l++;
			current = current.next;
		}
		return l;
	}

	add(d, w) {
		if (this.head == null) {
			this.head = new node(null, d, w);
		} else {
			let current = this.head;
			while(current.next != null) {
				current = current.next;
			}
			current.next = new node(null, d, w);
		}
	}

	// return weight from parent to child vertex d
	weight(d) {
		// find d in list
		let current = this.head;
		while (current != null) {
			// may need a more rigorous definition of '=' here if data is not necessarily equatable
			// .equals()?
			if (current.data == d) {
				return current.weight;
			}
			current = current.next
		}

		// d is not a child of the parent
		return -1;
	}
}

// uses adjacency lists
class Graph {
	constructor(adjList = null) {
		this.adjList = adjList;
		this.size = adjList.length;
	}

	// compute 'distance' between two vertices
	length(u, v) {
		// find u in adjacencyList
		for (let i = 0; i < this.adjList.length; i++) {
			// if we find u, determine edge length between u and v
			if (this.adjList[i].head == u) {
				return this.adjList[i].weight(v)
			}
		}

		// u and v are not connected by any edge
		return -1;
	}

	// perform dijkstra from source vertex
	dijkstra(source) {
		let Q = [];

		let dist = {};
		let prec = {};
		this.vertices.foreach(v => {
			dist[v] = Infinity;
			prev[v] = undefined;
			Q.push(v)
		})
		dist[source] = 0;

		while (Q.length != 0) {
			let u = Q[0];
			let idx = 0;
			// find minimum dist[u] from remaining vertices
			for (let i = 0; i < Q.length; i++) {
				if (dist[Q[i]] > dist[u]) {
					u = Q[i];
					idx = i;
				}
			}

			// remove u from set
			Q.splice(idx, 1)

		}

	}
}

class Queue {
	constructor() {
		this.head = undefined;
		this.length = 0;
		// data.foreach(elem => this.offer(elem));
	}

	offer(e) {
		if (this.head == undefined) {
			this.head = new node(null, e)
		} else {
			let current = this.head;
			while(current.next != null) {
				current = current.next;
			}
			current.next = new node(null, e)
		}
		this.length++;
	}

	// removes first element
	poll() {
		this.head = this.head.next;
		this.length--;
	}
}

let q = new Queue();
q.offer(10)
q.offer(20)
q.offer(30)
console.log(q)

let zero = new List();
zero.add(1, 3);
zero.add(3, 2);
zero.add(8, 4);
