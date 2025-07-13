import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
//const fs = require ('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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