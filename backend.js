let back_monmap;
let back_names;

const Modes = {
    EASY : 'easy'
}

const Types = {
    PARTIAL: 'partial',
    FULL: 'full'
}

//grabs the json file and converts it to an object
//should probably only be run once at the start
async function read_json() {
    let temp = await fetch('monmap.json');
    back_monmap = await temp.json();
    return back_monmap;
}

//returns an array containing every property of an object
//intended to be used to generate an array of every name in the object
function object_to_array(obj = back_monmap) {
    let res = [];
    for (var key in obj) {
        res.push(key);
    }
    return res;
}

//takes an array, copies it, then shuffles that copy
//used to create a randomized queue
function shuffled_copy(arr){
    let res = arr.slice();
    shuffle(res);
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

//gets the path of the specified mon using the mode (Modes.EASY) and type (Types.PARTIAL or Types.FULL)
//if you want to pass strings in you can, just did the enum stuff since strings always feel fucky
function get_path(mon, mode, type){
    return monmap[mon][mode][type];
}