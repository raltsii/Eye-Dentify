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

  document.getElementById("imgcontent").innerHTML = `<img src= ${partialpath()} height = 200px>` ;
  guessed = false;
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
  document.getElementById("imgcontent").innerHTML = `<img src= ${fullpath()} height = 200px>`;
  guessed = true;
}

function setDebug(str){
  document.getElementById("debug").innerHTML = str;
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
   