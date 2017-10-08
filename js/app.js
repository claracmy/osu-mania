$(() => {
  // Setup
  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $welcome = $('.welcome');
  const $gameboard = $('.gameboard');
  const $keyboard = $('.keyboard');


  // Display instructions when instructions is clicked and held

  $instruction.on('mousedown', showInstructions);
  $instruction.on('mouseup', hideInstructions);

  function showInstructions(){
    $instructions.show();
  }
  function hideInstructions(){
    $instructions.hide();
  }

  // Hide welcome screen and buttons once player has chosen game mode
  $oneplayer.on('click', function(){
    showKeyboard();
    hideWelcome();
    gameStart();
  });

  function hideWelcome(){
    $welcome.hide();
  }


  // Display Keyboard and score.
  function showKeyboard(){
    $keyboard.show();
    $gameboard.show();
  }

  // Once start is pressed, count down 3 secs


  // Display a note in a random column every 1 second

  function gameStart(){
    setInterval(function(){
      createNote();
      translateNote();
    }, 1000);
  }
  checkNote();

  // When player hits DFJK, compare position of notes and hitbox
  // const $hitbox = $('.hitbox');
  function checkNote(){
    //Keeps track of keydown to ensure register of actual key presses not holds.
    const down = {};

    $(document).keydown(function(e){

      down[e.which] = null; //Set default keypress to false

      //Find note closest to hitbox and determine position.
      const $d = $('#d');
      const $dnotes = $d[0].childNodes;
      const $dlastnote = $dnotes[1];
      // const dlastnotePosition = Math.abs(parseInt($dlastnote.style.bottom, 10));

      const $f = $('#f');
      const $fnotes = $f[0].childNodes;
      const $flastnote = $fnotes[1];

      const $j = $('#j');
      const $jnotes = $j[0].childNodes;
      const $jlastnote = $jnotes[1];

      const $k = $('#k');
      const $knotes = $k[0].childNodes;
      const $klastnote = $knotes[1];
      //If closest note is within leeway, register.
      switch(e.which){
        case 68:
          if (down['68'] === null){
            console.log(down);
            // console.log(dlastnotePosition);
            // if (dlastnotePosition > 400 && dlastnotePosition < 697){
            $dlastnote.style.backgroundColor = 'blue';
            down['68'] = true;
            // }
          }
          break;
        case 70:
          if (down['70'] === null){
            $flastnote.style.backgroundColor = 'green';
            down['70'] = true;
          }
          break;
        case 74:
          if (down['74'] === null){
            $jlastnote.style.backgroundColor = 'yellow';
            down['74'] = true;
          }
          break;
        case 75:
          if (down['75'] === null){
            $klastnote.style.backgroundColor = 'purple';
            down['75'] = true;
          }
          break;
        default:
          break;
      }
    });
    // When player releases key, reset down log.
    $(document).keyup(function(e){
      down[e.which] = null;
    });
  }



  function createNote(){
    // Select a random column
    const $columns = $('.column');
    const $randomColumn = $columns[(Math.floor(Math.random() * 4))];
    //create a new note to add to the random column
    const $newNote = document.createElement('div');
    $newNote.className = 'notes';
    $randomColumn.append($newNote);
    return $randomColumn;
  }

  // Move notes to bottom

  function translateNote(){
    const $notes = $('.notes');
    $notes.animate({
      bottom: '-660px'
    }, 5000, 'linear', function(){
      $notes.remove();
    });
  }

});
