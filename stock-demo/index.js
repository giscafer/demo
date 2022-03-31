import { stocks } from 'stock-api';

// 新浪股票数据
stocks.sina.searchStocks(['603122']).then(console.log);
stocks.sina.searchStocks(['603261']).then(console.log);
stocks.sina.searchStocks(['603070']).then(console.log);
// 雪球股票数据
stocks.xueqiu.searchStocks(['603122']).then(console.log);
stocks.xueqiu.searchStocks(['603261']).then(console.log);
stocks.xueqiu.searchStocks(['603070']).then(console.log);
