class Stack {
	constructor() {
		this.items = [];
	}

	push(value) {
		this.items.push(value);
	}

	pop() {
		if (this.isEmpty()) {
			return;
		}
		this.items.pop();
	}

	peek() {
		if (this.isEmpty()) {
			return;
		}
		return this.items.at(-1);
	}

	isEmpty() {
		return this.items.length === 0;
	}

	size() {
		return this.items.length;
	}

	clear() {
		this.item = [];
	}
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack);
console.log(stack.peek());
console.log(stack.size());

stack.pop();
console.log(stack.peek());
