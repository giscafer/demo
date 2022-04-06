import pinyin from 'pinyin';

console.log(
  pinyin('一文搞懂贫血模型、充血模型、领域驱动设计', {
    style: 0, // 设置拼音风格。
  }),
);
