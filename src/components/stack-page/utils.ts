export class Stack<T> {
  private _elements: T[] = [];

  public get elements() {
    return this._elements;
  }

  public get size() {
    return this.elements.length;
  }

  public push(item: T): void {
    this._elements.push(item);
  }

  public pop() {
    this._elements.pop();
  }

  public clear() {
    this._elements = [];
  }

  public setByIndex(index: number, item: T) {
    this._elements[index] = item;
  }
}