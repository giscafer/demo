/**
 * 滥用 getter setter 举例
 */
class ShoppingCart {
  private _itemsCount: number;
  public get itemsCount(): number {
    return this._itemsCount;
  }

  private _totalPrice: number;
  public get totalPrice(): number {
    return this._totalPrice;
  }

  private _items: Array<any> = [];
  public get items(): Array<any> {
    return [...this._items]; // 简单效果，实际不是这样
  }

  public addItem(item) {
    this.items.push(item);
    this._itemsCount++;
    this._totalPrice += item.getPrices();
  }

  public clear() {
    this._items = [];
    this._itemsCount = 0;
    this._totalPrice = 0;
  }
}
