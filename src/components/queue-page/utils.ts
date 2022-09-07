export class Queue<T> {
  _elements: T[] = [];
  startPosition = 0;
  headIndex = -1;
  tailIndex = -1;

  get elements() {
    return this._elements;
  }

  get isEmpty() {
    return this.headIndex === this.tailIndex;
  }

  get head() {
    return this.headIndex;
  }

  get tail() {
    return this.tailIndex;
  }

  enqueue(item: T): void {
    this._elements.push(item);
    if (this.headIndex === -1) {
      this.headIndex = 0;
    }
    if (this.headIndex > this.tailIndex) {
      this.tailIndex = this.headIndex;
    } else {
      this.tailIndex++;
    }
  }

  dequeue(): void {
    this.elements.splice(this.headIndex, 1, {} as T);
    if (this.isEmpty && this.headIndex !== -1) {
      this.tailIndex = -1;
    } else {
      this.headIndex++;
    }
  }

  clear(): void {
    this._elements = [];
    this.startPosition = 0;
  }

  setByIndex(index: number, item: T) {
    this._elements[index] = item;
  }

  get size() {
    return this.elements.length;
  }

  //enqueue
  //dequeue
  //clear
  //геттеры:
  //isEmpty
  //elements
  //head
  //tail
}