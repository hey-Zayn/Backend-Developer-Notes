const http = require("http");
const WebSocket = require("ws");
const { WebSocketServer } = require("ws");

const server = http.createServer((req, res) => {
    console.log(`Request from ${req.url}`);

    res.end("Hello World");
});


const wss = new WebSocketServer({ server });


wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        })
    })

    ws.send('Hello Client');
})

server.listen(3000, () => {
    console.log((new Date().toString()), "Server running on port 3000");
});