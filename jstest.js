let i = 0;
let names = [];
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
  let newind = Math.floor(Math.random() * 3);
  ans = names[newind];

  document.getElementById("imgcontent").innerHTML = `<img src= ${partialpath()}>` ;
  guessed = false;
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
  document.getElementById("imgcontent").innerHTML = `<img src= ${fullpath()}>`;
  guessed = true;
}

function setDebug(str){
  document.getElementById("debug").innerHTML = str;
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
    resetimg()
  })
}
  
init()
   