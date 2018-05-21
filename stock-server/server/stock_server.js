"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get('/', function (request, response) {
    response.send('这里是首页');
});
app.get('/stock', function (request, response) {
    response.json(stocks);
});
app.get('/stock/:id', function (request, response) {
    response.json(stocks.find(function (stock) { return stock.id == request.params.id; }));
});
var server = app.listen('8000', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器已启动，地址是：http://%s:%s', host, port);
});
var Stock = /** @class */ (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, '第一只股票', 1.9, 3.5, '这是第一只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '互联网']),
    new Stock(2, '第二只股票', 2.9, 4.5, '这是第二只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
    new Stock(3, '第三只股票', 3.9, 2.5, '这是第三只股票，是我在学习慕课网Angular入门实战时创建的', ['IT']),
    new Stock(4, '第四只股票', 4.9, 1.5, '这是第四只股票，是我在学习慕课网Angular入门实战时创建的', ['互联网']),
    new Stock(6, '第五只股票', 6.9, 3.5, '这是第六只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
    new Stock(7, '第六只股票', 7.9, 5.0, '这是第七只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '金融']),
    new Stock(8, '第七只股票', 8.9, 4.5, '这是第八只股票，是我在学习慕课网Angular入门实战时创建的', ['金融', '互联网'])
];
//# sourceMappingURL=stock_server.js.map