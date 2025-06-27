// grabs the img and button that require JS to function
  const imgEl = document.getElementById('random mon');
  const checkBtn = document.getElementById('Submit');
  const newBtn = document.getElementById('Reload');

// List of game modes. Fully placeholder for now as only Pokeball is functional
  const gmPoke = 'Pokeball/';
  const gmUltra = 'Ultraball/';
  const gmQuick = 'Quickball/';

// Clunky way to store all images in an array. Will be changed, but other options were breaking
  const monArray = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png',];
  var randomIndex = -1;
  var points = 0;
  var attempts = 0;

// Checks value, returns correct/incorrect, updates points, and loads new image
  checkBtn.addEventListener('click', () => {

      const userGuess = document.getElementById('uGuess');
      localStorage.setItem('guess', userGuess.value);

          attempts++;

      if(Number(userGuess.value) == randomIndex) {
        if(attempts==1)
          points++;
        alert('Correct!\nAttempts taken: ' + attempts + '\nCurrent points: ' + points);
        chooseRandomImage();
        attempts = 0;
      }
      else
        alert('Incorrect :(\nCurrent attempts: ' + attempts);

  });

// Chooses a new image when the "New Mon" button is clicked
  newBtn.addEventListener('click', () => {
    chooseRandomImage();
    attempts = 0;
  });


// Loads the page with an image already selected
  chooseRandomImage();

//Chooses a random index of the image array and sets it to the img src. gamemode could also be flexible but is currently just gmPoke
  function chooseRandomImage() {
    randomIndex = Math.floor(Math.random()*monArray.length);


    if(randomIndex != Number(localStorage.getItem('index'))) {
      imgEl.src = gmPoke + monArray[randomIndex];
      localStorage.setItem('src', gmPoke + monArray[randomIndex]);
    }
    else {
      chooseRandomImage();
    }
    localStorage.setItem('index', randomIndex);
  }
