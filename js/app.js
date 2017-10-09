$(() => {
  // Setup
  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $welcome = $('.welcome');
  const $gameboard = $('.gameboard');
  const $keyboard = $('.keyboard');
  const $score = $('.score');
  const $leeway = $('.leeway');

  let $d;
  let $dLastNote;
  let $f;
  let $fLastNote;
  let $j;
  let $jLastNote;
  let $k;
  let $kLastNote;
  let scores = 0;
  $score.html(`${scores}`);

  //Keeps track of keydown to ensure register of actual key presses not holds. Sets default to null.
  const down = {
    68: null,
    70: null,
    74: null,
    75: null
  };


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
    keypressAnimation();
    registerNote();
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

  // When player hits DFJK, compare position of notes and hitbox
  // const $hitbox = $('.hitbox');
  function registerNote(){
    $(document).keydown(function(e){
      //Find note closest to hitbox and determine position.
      $d = $('#d');
      $dLastNote = $d[0].firstChild;

      $f = $('#f');
      $fLastNote = $f[0].firstChild;

      $j = $('#j');
      $jLastNote = $j[0].firstChild;

      $k = $('#k');
      $kLastNote = $k[0].firstChild;

      //If closest note is within hitbox, do checkNote.
      switch(e.which){
        case 68:
          if (down['68'] === null){
            const dPosition = Math.abs(parseInt($dLastNote.style.bottom, 10));
            if (dPosition < 120 && dPosition > 60){
              $dLastNote.style.backgroundColor = 'blue';
              addScore();
              down['68'] = true;
              setTimeout(function(){
                $dLastNote.remove();
              }, 300);
            } else {
              deductScore();
            }
          }
          break;
        case 70:
          if (down['70'] === null){
            const fPosition = Math.abs(parseInt($fLastNote.style.bottom, 10));
            if (fPosition < 120 && fPosition > 60 ){
              $fLastNote.style.backgroundColor = 'green';
              addScore();
              down['70'] = true;
              setTimeout(function(){
                $fLastNote.remove();
              }, 300);
            } else {
              deductScore();
            }
          }
          break;
        case 74:
          if (down['74'] === null){
            const jPosition = Math.abs(parseInt($jLastNote.style.bottom, 10));
            if (jPosition < 120 && jPosition > 60 ){
              $jLastNote.style.backgroundColor = 'yellow';
              addScore();
              down['74'] = true;
              setTimeout(function(){
                $jLastNote.remove();
              }, 300);
            } else {
              deductScore();
            }
          }
          break;
        case 75:
          if (down['75'] === null){
            const kPosition = Math.abs(parseInt($kLastNote.style.bottom, 10));
            if (kPosition < 120 && kPosition > 60 ){
              $kLastNote.style.backgroundColor = 'purple';
              addScore();
              down['75'] = true;
              setTimeout(function(){
                $kLastNote.remove();
              }, 300);
            } else {
              deductScore();
            }
          }
          break;
        default:
          break;
      }
    });
    // When player releases key, reset down log.
    $(document).keyup(function(e){
      down[e.which] = null;
      return down;
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
      bottom: '-1px'
    }, 5000, 'linear', function(){
      $notes.remove();
    });
  }

  function addScore(){
    scores += 300;
    $score.html(`${scores}`);
    return $score;
  }

  function deductScore(){
    scores -= 300;
    $score.html(`${scores}`);
    return $score;
  }

  function keypressAnimation(){
    $(document).keydown(function(e){
      switch(e.which){
        case 68:
          $('.leeway-1').toggleClass('pressed');
          $('.hitbox-1').toggleClass('hit');
          break;
        case 70:
          $('.leeway-2').toggleClass('pressed-pink');
          $('.hitbox-2').toggleClass('hit');
          break;
        case 74:
          $('.leeway-3').toggleClass('pressed-pink');
          $('.hitbox-3').toggleClass('hit');
          break;
        case 75:
          $('.leeway-4').toggleClass('pressed');
          $('.hitbox-4').toggleClass('hit');
          break;
        default:
          break;
      }
    });

    $(document).keyup(function(e){
      switch(e.which){
        case 68:
          $('.leeway-1').removeClass('pressed');
          $('.hitbox-1').removeClass('hit');
          break;
        case 70:
          $('.leeway-2').removeClass('pressed-pink');
          $('.hitbox-2').removeClass('hit');
          break;
        case 74:
          $('.leeway-3').removeClass('pressed-pink');
          $('.hitbox-3').removeClass('hit');
          break;
        case 75:
          $('.leeway-4').removeClass('pressed');
          $('.hitbox-4').removeClass('hit');
          break;
        default:
          break;
      }
    });
  }


});
