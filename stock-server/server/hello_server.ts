import * as http from 'http';
var server = http.createServer((request, response) => {
    response.end("hello node");
})
server.listen(8000);