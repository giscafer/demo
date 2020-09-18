/**
 * @author: giscafer ,https://github.com/giscafer
 * @date: 2020-07-29 17:21:30
 * @description:  iterators 使用场景
 * https://www.30secondsofcode.org/blog/s/javascript-iterators
 */

class LinkedList {
  constructor(data) {
    this.data = data;
  }

  firstItem() {
    return this.data.find((i) => i.head);
  }
  findById(id) {
    return this.data.find((i) => i.id === id);
  }

  // iterator 特性，需要实现一个next函数，返回的是 {value,done}
  [Symbol.iterator]() {
    let item = { next: this.firstItem().id };
    return {
      next: () => {
        item = this.findById(item.next);
        if (item) {
          return { value: item.value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const myList = new LinkedList([
  { id: 'a1', value: 'First', next: 'a2', head: true },
  { id: 'a2', value: 'Second', next: 'a3', head: true },
  { id: 'a3', value: 'Third', next: 'null', head: true },
]);

for (let item of myList) {
  console.log(item);
}

class SpecialList {
  constructor(data) {
    this.data = data;
  }

  [Symbol.iterator]() {
    // 使用数组本身的迭代器扩展SpecialList
    return this.data[Symbol.iterator]();
  }

  values() {
    return this.data
      .filter((i) => i.complete)
      .map((i) => i.value)
      [Symbol.iterator]();
  }
}

const myList = new SpecialList([
  { complete: true, value: 'Lorem ipsum' },
  { complete: true, value: 'dolor sit amet' },
  { complete: false },
  { complete: true, value: 'adipiscing elit' },
]);

for (let item of myList) {
  console.log(item); // The exact data passed to the SpecialList constructor above
}

for (let item of myList.values()) {
  console.log(item); // 'Lorem ipsum', 'dolor sit amet', 'adipiscing elit'
}
