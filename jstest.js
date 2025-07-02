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
  monqueue = names.slice();
  shuffle(monqueue);
}

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

function init(){
  fetch('monmap.json').then(response => response.json()).then((data) => {
    monmap = data;

    let autofill = "";
    for(var key in monmap){
      names.push(key);
      autofill += `<option value="${key}" />\n`
    }

    document.getElementById("data").innerHTML = autofill;

    document.getElementById("next").onclick = resetimg;
    document.getElementById("submit").onclick = submit;

    resetqueue();

    resetimg()
  })
}
  
init()
   