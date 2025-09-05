let i = 0;

let ans = "";
let difficulty = 'easy';

let guessed = false;

let score = 0;


function partialpath(){
  return monmap[ans.data.name][difficulty].partial;
}

function fullpath(){
  return monmap[ans.data.name][difficulty].full;
}


function resetimg(){
  //check if queue is empty, then reset if needed
  if(queue.length <= 0) reset_queue();

  //grab first element of queue
  ans = queue.pop();

  //pretty much every property mon.data should have access to
  let ex_name = ans.data.name;
  let ex_weight = ans.data.weight;
  let ex_height = ans.data.height;
  let ex_t1 = ans.data.type1;
  let ex_t2 = ans.data.type2;
  let ex_gen = ans.data.gen;
  let ex_egg_groups = ans.data.egg_group;
  let ex_prevo = ans.data.evolves_from;
  let ex_evo = ans.data.evolves_into;

  console.log(`${ex_name}:\nweight:${ex_weight}\nheight:${ex_height}\ntypes:${ex_t1}, ${ex_t2}\ngen:${ex_gen}`)

  imgcontent.src = `${partialpath()}`;
  guessed = false;
  console.log(partialpath());

  t1.src = "assets/types/hint.png";
  t2.src = "assets/types/hint.png";

  //document.getElementById("imgcontent").innerHTML = `<img src= ${partialpath()} height = 200px>` ;
}

function submit(){
  if(guessed) return;
  let entry = document.getElementById("monentry").value;
  if(entry == ans.data.name){
    setDebug("correct");
    score++;
  } else {
    setDebug("incorrect");
    score -= 0.5;
  }
  document.getElementById("score").innerHTML = score;
  imgcontent.src = `${fullpath()}`;
  guessed = true;
}

function setDebug(str){
  document.getElementById("debug").innerHTML = str;
}

function showGen(){
  
  document.getElementById("gen").innerHTML = "Generation 1";
  document.getElementById("genhint").innerHTML = "";
}

function showType(){
  t1.src = `assets/types/${ans.data.type1}.png`;
  t1.style = "float:right; padding: 10px; cursor:auto";
}

function showType2(){
  t2.src = `assets/types/${ans.data.type2 == null ? "none" : ans.data.type2}.png`;
  t2.style = "float:right; padding: 10px; cursor:auto";
}

async function init(){

  //run initialize and only proceed once done.
  //if in your version you don't want to make the frontend initialization function async, you would use "initialize.then(() => {//code goes here})"
  //NOTE: MUST FINISH RUNNING INITIALIZE BEFORE ANYTHING ELSE
  //IF OTHER THINGS HAPPEN BEFORE INITIALIZE FINISHES, IT WILL BREAK (this is why it's awaited for)
  await initialize();

  let autofill = "";
  for(var name in monmap){
    autofill += `<option value="${name}" />\n`
  }

  document.getElementById("data").innerHTML = autofill;

  document.getElementById("next").onclick = resetimg;
  document.getElementById("submit").onclick = submit;

  reset_queue();
  resetimg();
}
  
init()
   