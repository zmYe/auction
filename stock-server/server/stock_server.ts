import * as express from 'express';
import {Server} from "ws";
import {setInterval} from "timers";
import * as path from "path";

const app = express();

app.use('/', express.static(path.join(__dirname, '../', 'client')));

app.get('/api', (request, response) => {
    response.send('这里是首页');
});

app.get('/api/stock', (request, response) => {
    let result = stocks;
    let param = request.query;
    if(param.name) {
        result = result.filter( stock => stock.name.indexOf(param.name) !== -1 );
    }
    response.json(result);
});

app.get('/api/stock/:id', (request, response) => {
    response.json(stocks.find((stock) => stock.id == request.params.id));
})

const server = app.listen('8000', () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('服务器已启动，地址是：http://%s:%s',host,port);
});

const subscriptions = new Set<any>();
const wsServer = new Server({port:8001});
wsServer.on('connection', websocket => {
    subscriptions.add(websocket);
    websocket.on('message',message => {
        console.log(message);
    });
    websocket.on('error', event => {
        console.log("error:" + event);
    });
    websocket.on('close', event => {
        console.log("close:" + event);
    });
});

var messageCount = 0;
setInterval(() => {
    subscriptions.forEach(ws => {
        if(ws.readyState === 1) {
            ws.send(JSON.stringify({messageCount: messageCount++}))
        } else {
            subscriptions.delete(ws);
        }
    })
},2000);


export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}

 const stocks: Stock[] = [
    new Stock(1, '第一只股票', 1.9, 3.5, '这是第一只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '互联网']),
    new Stock(2, '第二只股票', 2.9, 4.5, '这是第二只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
    new Stock(3, '第三只股票', 3.9, 2.5, '这是第三只股票，是我在学习慕课网Angular入门实战时创建的', ['IT']),
    new Stock(4, '第四只股票', 4.9, 1.5, '这是第四只股票，是我在学习慕课网Angular入门实战时创建的', ['互联网']),
    new Stock(6, '第五只股票', 6.9, 3.5, '这是第六只股票，是我在学习慕课网Angular入门实战时创建的', ['金融']),
    new Stock(7, '第六只股票', 7.9, 5.0, '这是第七只股票，是我在学习慕课网Angular入门实战时创建的', ['IT', '金融']),
    new Stock(8, '第七只股票', 8.9, 4.5, '这是第八只股票，是我在学习慕课网Angular入门实战时创建的', ['金融', '互联网'])
];
