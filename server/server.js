const https = require('https');
const http = require('http');
const app = require('./app');
const fs = require('fs');
const server = http.createServer({
    // key: fs.readFileSync(__dirname+'/ssl/server.key'),
    // cert: fs.readFileSync(__dirname+'/ssl/server.cert')
}, app);

server.listen(1234, function() {
    console.log(`Server running on port!`);
});

// http.createServer(function (req, res) {
//     res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
//     res.end();
// }).listen(80);