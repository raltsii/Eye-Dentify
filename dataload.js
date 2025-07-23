import Pokedex from 'pokedex-promise-v2'
import fs from 'fs';



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

const genmap = {
    'generation-i': 1,
    'generation-ii': 2,
    'generation-iii': 3,
    'generation-iv': 4,
    'generation-v': 5,
    'generation-vi': 6,
    'generation-vii': 7,
    'generation-viii': 8,
    'generation-ix': 9,
}

let dex = new Pokedex();

let newObj = new Object();

async function run() {

  // let mon = await dex.getPokemonSpeciesByName("farfetchd");
  // console.log(mon);

  readData('monmap.json').then(data => {
      for(var mon in data){
          newObj[mon] = new Object();
          newObj[mon]['name'] = mon;
          newObj[mon]['evolves_into'] = [];
      }
      fill_mons(data).then(() => {
          fs.open("datamap.json", "w", function(err, f){
          fs.writeFile(f, JSON.stringify(newObj), 'utf8', (err) => {});
        });
      })
  })
}

async function fill_mons(data){
  for(var mon in data){
    await fill_mon(mon, newObj);
  }
  return new Promise((resolve) => {
    resolve();
  })
}

/*
  mon
    mon.evolves_into
    mon.evolves_from
    mon.height - 
    mon.weight -
    mon.type1 -
    mon.type2 -
    mon.gen -
    mon.egg_group -
*/

async function fill_mon(name, full){
  console.log(name);
  let ogname = name;
  let ret = full[name];
  name = name.toLowerCase();
  if(name == "mrmime") name = "mr-mime";
  if(name == "nidoran") name = "nidoran-f"
  if(name == "farfetch'd") name = "farfetchd"
  let mon = await dex.getPokemonByName(name)
  ret.height = mon.height;
  ret.weight = mon.weight;

  let types = mon.types.map(obj => {
    return obj.type.name;
  });

  ret.type1 = types[0];
  ret.type2 = null;
  if(types.length > 1) ret.type2 = types[1];
  let spec = await dex.getPokemonSpeciesByName(name)
  ret.gen = genmap[spec.generation.name];

  ret.egg_groups = spec.egg_groups.map(obj => {
    return obj.name
  })

  let prevo = spec.evolves_from_species
  if(prevo != null){
    prevo = prevo.name;
    prevo = capitalize(prevo);
    if(full[prevo]){
      ret.evolves_from = prevo
      full[prevo].evolves_into.push(ogname);
    }
  }
  return new Promise((resolve) => {
    resolve(ret);
  })
}

function capitalize(str){
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

run();