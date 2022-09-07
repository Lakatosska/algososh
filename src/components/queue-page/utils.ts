export class Queue<T> {
  _elements: T[] = [];
  startPosition = 0;

  get elements() {
    return this._elements;
  }

  get isEmpty() {
    return this._elements = [];
  }

  get head() {
    return this.elements[0];
  }

  get tail() {
    return this.elements.length - 1;
  }

  enqueue(item: T): void {
    this._elements.push(item);
  }

  dequeue(): void {
    this._elements.shift();
    this.startPosition = this.startPosition + 1;
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