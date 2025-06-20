const readline = require('node:readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  input = input.split(' ');
  modify_mon(input[0], input[1], input[2], input[3], input[4]);
}); 

function modify_mon(file, mon, mode, partial, full){
  readData(file, mon, mode, partial, full).then((data) => {

    if(data == null){
      data = new Object();
      data[mon] = new Object();
    }
    let temp = new Object();
    move_mons(mon, mode, partial, full, (part, full) => {
      temp.partial = part;
      temp.full = full;
      data[mon] = new Object();
      data[mon][mode] = temp;
      
      console.log(data)

      fs.open(file, "w", function(err, f){
        fs.writeFile(f, JSON.stringify(data), 'utf8', (err) => {});
      });
    })
  });
}

async function move_mons(mon, mode, partial, full, next){
  let pathpre = `pokemon/${mon}/${mode}`
  fs.mkdir(pathpre, {recursive: true}, (err, str) => {
    let partpath = `${pathpre}/${partial}`
    let fullpath = `${pathpre}/${full}`
    fs.rename(partial, partpath, (err) => {});
    fs.rename(full, fullpath, (err) => {});
    next(partpath, fullpath);
  });
}

function readData(file){
  return new Promise((resolve) => {
    fs.open(file, "r", function(err, f){
      fs.readFile(f,(err, data) => {
        try {
          resolve(JSON.parse(data.toString()));
        } catch {
          resolve(null);
        }
      })
    })
  })
}