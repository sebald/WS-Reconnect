const WebSocketServer = require('ws').Server;

function createServer () {
    const wss = new WebSocketServer({ port: 4000 });
    wss.on('connection', ws => {
        ws.on('message', msg => {
        console.log('Received: %s', msg);
        ws.send(msg);
        });

        ws.send(JSON.stringify({ text: 'Good day, sir!' }));
    });
    console.log('Running on port 4000...');
    return wss;
}

let server = createServer();

setInterval(() => {
    if( server ) {
        server.close();
        server = null;
        console.log('Shutting down ...');
    } else {
        server = createServer();
    }
}, 10000);