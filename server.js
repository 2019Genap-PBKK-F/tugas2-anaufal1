const http = require("http");
const hostname = '10.199.14.46';
const port = 8077;

const server = http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World, by naufal\n');
});

server.listen(port, hostname, () => {
    console.log('Server running at http://${hostname}:${port}/');
});