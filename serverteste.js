const { createServer } = require('node:http');
const fs = require ('fs');

const hostname = '127.0.0.1';
const port = 80;
let index = fs.readFileSync('index.html');

let typemap = {
    "html": "text/html",
    "js": "application/javascript",
    "png": "image/png",
    "json": "application/json"
}

const server = createServer((req, res) => {
    try {
        if(req.method === 'GET'){

            let truncated = req.url.substring(1);
            if(truncated.length == 0) truncated = "index.html";
            console.log(truncated);
            let item = fs.readFileSync(truncated);

            let ext = truncated.split('.');
            ext = ext[ext.length - 1];
            console.log(ext);

            res.statusCode = 200;
            res.setHeader('Content-Type', typemap[ext]);
            res.end(item);
            return;
        }
    } catch (error) {
        res.statusCode = 200;
        res.setHeader('Content-Type', text.plain);
        res.end("balls");
    }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// server.on('request', (req, res) => {
//     // let temp = new Object();
//     // temp.balls = "awesome!!";
//     // if(req.method == 'GET'){
//     //     console.log("balls");
        
//     // }
//     res.writeHead(200, {'content-type' : 'text/plain'});
//     res.end("hi!!");
//     return;
// })_