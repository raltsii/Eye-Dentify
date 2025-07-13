let i = 0;
let names = [];
let monqueue = [];

let ans = "";
let difficulty = 'easy';

let guessed = false;

let score = 0;

var monmap;

function partialpath(){
  return monmap[ans][difficulty].partial;
}

function fullpath(){
  return monmap[ans][difficulty].full;
}

function resetimg(){
  if(monqueue.length <= 0) resetqueue();
  ans = monqueue.pop();

  document.getElementById("imgcontent").innerHTML = `<img src= ${partialpath()} height = 200px>` ;
  guessed = false;
  console.log(partialpath());
}

function submit(){
  if(guessed) return;
  let entry = document.getElementById("monentry").value;
  if(entry == ans){
    setDebug("correct");
    score++;
  } else {
    setDebug("incorrect");
    score -= 0.5;
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("imgcontent").innerHTML = `<img src= ${fullpath()} height = 200px>`;
  guessed = true;
}

function setDebug(str){
  document.getElementById("debug").innerHTML = str;
}

function resetqueue(){
  monqueue = shuffled_copy(names);
}

function init(){

  //read_json called here, must use ".then" in order to guarantee that data is gotten before rest of stuff is executed
  read_json().then((data) => {

    monmap = data;
    //object to array called here
    names = object_to_array();

    let autofill = "";
    for(var name in names){
      autofill += `<option value="${name}" />\n`
    }

    document.getElementById("data").innerHTML = autofill;

    document.getElementById("next").onclick = resetimg;
    document.getElementById("submit").onclick = submit;

    resetqueue();

    resetimg();
  })
}
  
init()
   