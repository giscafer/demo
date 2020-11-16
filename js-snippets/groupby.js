const data = [
  ['临床1期', '中止'],
  ['临床1期', '撤回'],
  ['临床1期', '全部'],
  ['临床1期', '已结束'],
  ['临床1期', '暂停'],
  ['临床1期', '状态未知'],
  ['临床1期', '进行中'],
  ['临床前', '中止'],
  ['临床前', '撤回'],
  ['临床前', '全部'],
  ['临床前', '已结束'],
  ['临床前', '暂停'],
  ['临床前', '状态未知'],
  ['临床前', '进行中'],
];

function groupBy(arr = []) {
  const map = {};
  arr.forEach((item) => {
    const [name, value] = item;
    if (map[name]) {
      map[name].push(value);
    } else {
      map[name] = [];
    }
  });
  return map;
}

function groupBy2(arr = []) {
  return arr.reduce(
    (prev, curr) =>
      prev[curr[0]]
        ? (prev[curr[0]].push(curr[1]), prev)
        : ((prev[curr[0]] = []), prev),
    {}
  );
}

console.log(groupBy(data));
console.log('groupBy2', groupBy2(data));
