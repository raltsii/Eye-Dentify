let i = 0;
let names = ["bulbasaur", "squirtle", "charmander"]
let basepath = "";
let ans = "";

let guessed = false;

let score = 0;

function resetimg(){
  let newind = Math.floor(Math.random() * 3);
  ans = names[newind];
  basepath = ans + "/" + ans;
  let path = basepath + "-eye.png";
  document.getElementById("imgcontent").innerHTML = `<img src= ${path}>` ;
  basepath += ".png";
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
  document.getElementById("imgcontent").innerHTML = `<img src= ${basepath}>` ;
  guessed = true;
}

function setDebug(str){
  document.getElementById("debug").innerHTML = str;
}
  
document.getElementById("next").onclick = resetimg;
document.getElementById("submit").onclick = submit;
resetimg()   