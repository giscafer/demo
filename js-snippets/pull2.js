const flatListData = [];

const selectedIdList = []; // 选中的
// 未选中的
const unSelectedIdList = flatListData.filter((v) =>
  v.select ? selectedIdList.push(v.id) : id,
);

console.log(selectedIdList, unSelectedIdList);
