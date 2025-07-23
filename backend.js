var monmap;
var datamap;
var mon_arr;
var queue;

//grabs the json file and converts it to an object
//should probably only be run once at the start
async function read_map_json() {
    let temp = await fetch('monmap.json');
    monmap = await temp.json();
    return monmap;
}

//loads the data file
//only to be run during initialization
async function load_data(){
    let temp = await fetch('datamap.json');
    datamap = await temp.json();
    return datamap;
}

//generates an array containing every mon object, while also setting the data property of each one
//only to be run during initialization
function generate_mon_arr(){
    let res = [];
    for(var mon in monmap){
        //adds mon to return array
        res.push(monmap[mon]);

        //change the evolution references to mon pointers instead of string labels
        let temp = datamap[mon];
        if(temp.evolves_from) temp.evolves_from = datamap[temp.evolves_from];
        temp.evolves_into = temp.evolves_into.map((dt) => datamap[dt]);

        //fill data field of mon with formatted data
        monmap[mon].data = datamap[mon];
    }

    mon_arr = res;
    return res;
}

//creates a queue of every mon to be used
function reset_queue(){
    let res = mon_arr.slice(); //generate a copy of the mon array
    shuffle(res);
    queue = res;
    return res;
}

//shuffles an array
//used in shuffled_copy, but you could use it yourself if you wanted
function shuffle(arr){
  let curr = arr.length;
  while(curr != 0){
    let rand = Math.floor(Math.random() * curr);
    curr--;

    let temp = arr[curr];
    arr[curr] = arr[rand];
    arr[rand] = temp;
  }
}

async function initialize(){
    await read_map_json();
    await load_data();
    generate_mon_arr();
    return new Promise((resolve) => {
        resolve();
    })
}
