$(() => {
  // Setup
  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $welcome = $('.welcome');
  const $gameboard = $('.gameboard');
  const $keyboard = $('.keyboard');
  const $score = $('.score');
  const $feedback = $('.feedback');
  const $combo = $('.combo');

  let $d;
  let $dLastNote;
  let $f;
  let $fLastNote;
  let $j;
  let $jLastNote;
  let $k;
  let $kLastNote;
  let scores = 0;
  let comboCounter = 0;
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

  // When player hits DFJK, compare position of notes and hitbox. Find the note closest to hitbox and determine position. If within hit area, do addScore, hitAnimation and remove note. If player misses, deduct score.
  function registerNote(){
    $(document).keydown(function(e){

      $d = $('#d');
      $dLastNote = $d[0].firstChild;

      $f = $('#f');
      $fLastNote = $f[0].firstChild;

      $j = $('#j');
      $jLastNote = $j[0].firstChild;

      $k = $('#k');
      $kLastNote = $k[0].firstChild;

      switch(e.which){
        case 68:
          if (down['68'] === null){
            const dPosition = Math.abs(parseInt($dLastNote.style.bottom, 10));
            if (dPosition < 120 && dPosition > 60){
              $dLastNote.className = 'animated fadeOut';
              addScore();
              comboCounter += 1;
              down['68'] = true;
              hitAnimation();
              feedback();
              setTimeout(function(){
                $dLastNote.remove();
              }, 300);
            } else {
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 70:
          if (down['70'] === null){
            const fPosition = Math.abs(parseInt($fLastNote.style.bottom, 10));
            if (fPosition < 120 && fPosition > 60 ){
              $fLastNote.className = 'animated fadeOut';
              addScore();
              comboCounter += 1;
              down['70'] = true;
              hitAnimation();
              feedback();
              setTimeout(function(){
                $fLastNote.remove();
              }, 300);
            } else {
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 74:
          if (down['74'] === null){
            const jPosition = Math.abs(parseInt($jLastNote.style.bottom, 10));
            if (jPosition < 120 && jPosition > 60 ){
              $jLastNote.className = 'animated fadeOut';
              addScore();
              comboCounter += 1;
              down['74'] = true;
              hitAnimation();
              feedback();
              setTimeout(function(){
                $jLastNote.remove();
              }, 300);
            } else {
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 75:
          if (down['75'] === null){
            const kPosition = Math.abs(parseInt($kLastNote.style.bottom, 10));
            if (kPosition < 120 && kPosition > 60 ){
              $kLastNote.className = 'animated fadeOut';
              addScore();
              comboCounter += 1;
              down['75'] = true;
              hitAnimation();
              feedback();
              setTimeout(function(){
                $kLastNote.remove();
              }, 300);
            } else {
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        default:
          break;
      }
      combo();
    });
    // When player releases key, reset down log.
    $(document).keyup(function(e){
      down[e.which] = null;
      return down;
    });
  }

  function createNote(){
    const $columns = $('.column');
    const $randomColumn = $columns[(Math.floor(Math.random() * 4))];   // Select a random column
    const $newNote = document.createElement('div');     //create a new note to add to the random column
    $newNote.className = 'notes';
    $randomColumn.append($newNote);
    return $randomColumn;
  }

  function translateNote(){
    const $notes = $('.notes');
    $notes.animate({
      bottom: '-1px'
    }, 5000, 'linear', function(){
      $notes.remove();  //Destroy note when animation finishes
    });
  }

  function addScore(){
    scores += 300;
    $score.html(`${scores}`);
    return $score;
  }

  function deductScore(){
    scores -= 200;
    $score.html(`${scores}`);
    return $score;
  }

  function feedback(){
    $('.feedback-text').html('300');
    $feedback.show();
    setTimeout(function(){
      $feedback.hide();
    }, 400);
  }

  function combo(){
    console.log(comboCounter);
    if (comboCounter > 10){
      $('.combo-text').html(`${comboCounter}`);
      $combo.show();
    } else {
      $combo.hide();
    }
  }

  function keypressAnimation(){
    $(document).keydown(function(e){
      switch(e.which){
        case 68:
          $('#d').addClass('pressed');
          break;
        case 70:
          $('#f').addClass('pressed-pink');
          break;
        case 74:
          $('#j').addClass('pressed-pink');
          break;
        case 75:
          $('#k').addClass('pressed');
          break;
        default:
          break;
      }
    });

    $(document).keyup(function(e){
      switch(e.which){
        case 68:
          $('#d').removeClass('pressed');
          $('.hitbox-1').removeClass('hit');
          break;
        case 70:
          $('#f').removeClass('pressed-pink');
          $('.hitbox-2').removeClass('hit');
          break;
        case 74:
          $('#j').removeClass('pressed-pink');
          $('.hitbox-3').removeClass('hit');
          break;
        case 75:
          $('#k').removeClass('pressed');
          $('.hitbox-4').removeClass('hit');
          break;
        default:
          break;
      }
    });
  }

  function hitAnimation(){
    if (down['68'] === true){
      $('.hitbox-1').addClass('hit');
    } else if (down['70'] === true){
      $('.hitbox-2').addClass('hit');
    } else if (down['74'] === true){
      $('.hitbox-3').addClass('hit');
    } else if (down['75'] === true){
      $('.hitbox-4').addClass('hit');
    }
  }

});
