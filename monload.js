const readline = require('node:readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  modify_mon(input, "bulbasaur", "easy", "partial.jpg", "full.jpg");
}); 

function modify_mon(file, mon, mode, partial, full){
  readData(file, mon, mode, partial, full).then((data) => {
    fs.open(file, "w", function(err, f){
      fs.writeFile(f, data, 'utf8', (err) => {});
    });
  });
}

function readData(file, mon, mode, partial, full){
  return new Promise((resolve) => {
    fs.open(file, "r", function(err, f){
      fs.readFile(f,(err, data) => {
        console.log(data.toString());
        var existing = JSON.parse(data.toString());
  
        let temp = new Object();
        temp.partial = partial;
        temp.full = full;
        existing[mon][mode] = temp;   
        console.log(existing);
        resolve(JSON.stringify(existing));
      })
    })
  })
  
}