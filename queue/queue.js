class Queue {
	constructor() {
		this.items = [];
		this.frontIndex = 0;
	}

	enqueue(value) {
		this.items.push(value);
	}

	dequeue() {
		if (this.isEmpty()) {
			return;
		}
		const element = this.items[this.frontIndex];
		this.frontIndex++;

		// Remove unused elements when appropriate
		if (this.frontIndex > 10) {
			this.items = this.items.slice(this.frontIndex);
			this.frontIndex = 0;
		}

		return element;
	}

	peek() {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.frontIndex];
	}

	isEmpty() {
		return this.frontIndex >= this.items.length;
	}

	size() {
		return this.items.length - this.frontIndex;
	}

	clear() {
		this.items = [];
		this.frontIndex = 0;
	}
}

const tasks = new Queue();
tasks.enqueue("Send email");
tasks.enqueue("Watch movie");
tasks.enqueue("Setup meeting");

while (!tasks.isEmpty()) {
	const task = tasks.dequeue();
	console.log(`Processing: ${task}`);
}
