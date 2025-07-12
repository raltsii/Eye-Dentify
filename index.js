import express from 'express';
//const fs = require ('fs');

const port = parseInt(process.env.PORT) || 8080;

// let typemap = {
//     "html": "text/html",
//     "js": "application/javascript",
//     "png": "image/png",
//     "json": "application/json"
// }
const app = express();

app.use("/", express.static(__dirname));

app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});

//gonna kill myself it took so long to get that to work the other way
