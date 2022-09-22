export class Queue<T> {
  _elements: (T | null)[] = [];
  head: number = 0;
  tail: number = 0;
  size: number = 0;
  length: number = 0;

  constructor(size: number) {
    this.size = size;
    this._elements = Array(size).fill(null);
  }

  elements() {
    return this._elements;
  }

  enqueue = (item: T) => {
    this._elements[this.tail] = item;
    this.length++;
    this.tail === this.size - 1 ? (this.tail = 0) : this.tail++;
  };

  dequeue = () => {
    this._elements[this.head] = null;
    this.head++;
    this.length--;
  };

  clear = () => {
    this._elements = Array(this.size).fill(null);
    this.head = 0;
    this.tail = 0;
  };

  isEmpty() {
    return this.length === 0;
  }

  getHead() {
    return this.head;
  }

  getTail() { 
    return this.tail - 1;
  }
}