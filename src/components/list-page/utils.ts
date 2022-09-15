class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }

  toString() {
    return `${this.value}`
  }
}

export class LinkedList {
  head: LinkedListNode<string> | null;
  tail: LinkedListNode<string> | null;

  constructor(initArr: string[]) {
    this.head = this.initLinkedList(initArr);
    this.tail = this.find();
  }

  initLinkedList(arr: string[]): LinkedListNode<string> | null {
    return arr.reduce((acc: LinkedListNode<string> | null, curr: string) =>
      new LinkedListNode(curr, acc), 
      null
    );
  }

  find() {
    if (!this.head) {
      return null;
    }
    let currentNode = this.head;

    while(currentNode) {
      if (!currentNode.next) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null
  }

  prepend(value: string) {
    const newNode = new LinkedListNode(value, this.head);

    if (!this.tail) {
      this.tail = newNode;
    };

    this.head = newNode;
    return this;
  }

  append(value: string) {
    const newNode = new LinkedListNode(value);
  
    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    };

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  getByIndex(index: number) {
    let counter = 0;
    let node = this.head;

    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  addByIndex(value: string, index: number) {
    if (!this.head) {
      this.head = new LinkedListNode(value);
      return;
    }
    if (index === 0) {
      this.head = new LinkedListNode(value, this.head);
      return;
    }
    const previous = (this.getByIndex(index - 1) ||
      this.find()) as LinkedListNode<string>;
    const node = new LinkedListNode(value, previous?.next);
    previous.next = node;
  }

  deleteByIndex(index: number) {
    if (!this.head) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const prev = this.getByIndex(index - 1);
    if (!prev || !prev.next) {
      return;
    }
    prev.next = prev.next.next;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
  }

  deleteTail() {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    }

    let current = this.head;
    while (current?.next) {
      if (!current.next.next) {
        current.next = null;
      } else {
        current = current.next;
      }
    }

    this.tail = current;
  }

  toArray() {
    const nodes = [];
    let currentNode = this.head;

    while(currentNode) {
      nodes.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return nodes;
  }  

  get toString() {
    return this.toArray().map(node => node.toString());
  }
}