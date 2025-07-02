const readline = require('node:readline');
const fs = require('fs');

let lastdata;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  loaddata("monmap.json").then((data) => {
    ls(input).then(() => {
      console.log(lastdata);
      console.log("balls");
      fs.open("monmap.json", "w", function(err, f){
        fs.writeFile(f, JSON.stringify(lastdata), 'utf8', (err) => {});
      });
    });
  });
  // input = input.split(' ');
  // modify_mon(input[0], input[1], input[2], input[3], input[4]);

}); 

async function ls(path){
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir){
    let temp = dirent.name;
    temp = temp.split(".");
    if(temp.length <= 1) continue;
    let full = `${path}/${temp[0]}.png`
    let part = `${path}/gen1-eye/${temp[0]} Eye.png`
    let mon = temp[0].split(" ")[1];
    lastdata = await modify_mon(mon, "easy", part, full);
  }
  return new Promise((resolve) => {resolve();})
}

async function loaddata(file){
  readData(file).then((data) => {
    if(data == null){
      data = new Object();
    }
    return new Promise((resolve) => {
      lastdata = data;
      resolve(data);
    })
  });
}

async function modify_mon(mon, mode, partial, full){
  return new Promise((resolve) =>{
    let temp = new Object();
    move_mons(mon, mode, partial, full, (part, full) => {
      temp.partial = part;
      temp.full = full;
      if(lastdata[mon] == null) lastdata[mon] = new Object();
      lastdata[mon][mode] = temp;
      resolve(lastdata);
    })
  })
}

async function move_mons(mon, mode, partial, full, next){
  let pathpre = `pokemon/${mon}/${mode}`
  fs.mkdir(pathpre, {recursive: true}, (err, str) => {

    let split = partial.split("/");
    let part = split[split.length - 1];

    split = full.split("/");
    let ful = split[split.length - 1];

    let partpath = `${pathpre}/${part}`
    let fullpath = `${pathpre}/${ful}`
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