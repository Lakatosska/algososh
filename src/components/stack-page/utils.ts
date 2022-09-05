export class Stack<T> {
  _elements: T[] = [];

  get elements() {
    return this._elements;
  }

  get size() {
    return this.elements.length;
  }

  push(item: T): void {
    this._elements.push(item);
  }

  pop(): void {
    this._elements.pop();
  }

  clear(): void {
    this._elements = [];
  }

  setByIndex(index: number, item: T) {
    this._elements[index] = item;
  }
}