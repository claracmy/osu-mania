$(() => {

  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $welcome = $('.welcome');
  const $gameboard = $('.gameboard');
  const $keyboard = $('.keyboard');
  const $score = $('.score');
  const $feedback = $('.feedback');
  const $combo = $('.combo');
  const $display = $('.display');
  const $button = $('.button');
  const $results = $('.results-page');
  const $grade = $('.score-grade');
  const $back = $('#back');
  const $highscoreButton = $('#highscores');
  const $highscores = $('.highscores');
  const $records = $('.records');
  const $name = $('.name');

  let $d;
  let $dLastNote;
  let dPosition;
  let $f;
  let $fLastNote;
  let fPosition;
  let $j;
  let $jLastNote;
  let jPosition;
  let $k;
  let $kLastNote;
  let kPosition;
  let scores = 0;
  let comboCounter = 0;
  let timer = 0;
  let scoreGreat = 0;
  let scoreGood = 0;
  let scoreMissed = 0;
  let grade;
  let name;
  const totalScore = 110100;



  //Keeps track of keydown to ensure register of actual key presses not holds. Sets default to null.
  const down = {
    68: null,
    70: null,
    74: null,
    75: null
  };
  // Music setup
  const bgm = document.getElementById('bgm');
  bgm.src = 'bgm.mp3';
  bgm.volume = 0.8;
  const music = document.getElementById('music');
  music.src = 'music.mp3';
  const hit = document.getElementById('hit');
  hit.src = 'hit.wav';
  hit.volume = 0.3;
  const buttonHover = document.getElementById('button-hover');
  buttonHover.src = 'hover.mp3';
  const buttonClick= document.getElementById('button-click');
  buttonClick.src = 'click.wav';
  bgm.play();

  // Display instructions when instructions button is clicked and held

  $instruction.on('mousedown', showInstructions);
  $instruction.on('mouseup', hideInstructions);
  $button.mouseenter(function(){
    buttonHover.play();
  });
  $button.click(function(){
    buttonClick.play();
  });

  // Display highscores when highscores button is click and held

  $highscoreButton.on('mousedown', function(){
    $highscores.show();
  });

  $highscoreButton.on('mouseup', function(){
    $highscores.hide();
  });

  // Hide welcome screen and buttons once player has chosen game mode
  $oneplayer.on('click', function(){
    showKeyboard();
    $score.html(` ${scores}`);
    bgm.pause();
    bgm.currentTime = 0;
    $welcome.hide();
    countdown();
    endGame();
  });

  $back.on('click', function(){
    createPlayer();
    newHighscore();
    updateHighscore();
    $welcome.show();
    $results.hide();
    bgm.play();
  });

  function showInstructions(){
    $instructions.show();
  }
  function hideInstructions(){
    $instructions.hide();
  }
  function showKeyboard(){
    $keyboard.show();
    $gameboard.show();
  }
  function endGame(){
    setTimeout(function(){
      music.pause();
      $gameboard.hide();
      displayResult();
      $results.show();
      calculateGrade();
      displayGrade();
      updateHighscore();
    },177000);
  }

  // Once start is pressed, count down 3 secs
  function countdown(){
    $display.show();
    timerStart();
    setTimeout(function(){
      music.play();
      gameStart();
    }, 3240);
  }

  function gameRhythm(){    //Decides how often to spawn notes and ends game after 2:56 mins
    let noteInterval;
    let gameInterval;
    let gameInterval2;
    let gameInterval3;
    let gameInterval4;
    setInterval(function(){
      timer++;
      if (timer === 1) {
        clearInterval(gameInterval);
        noteInterval = 1296;
        gameInterval = setInterval(function(){
          createNote();
        }, noteInterval);
      }

      if (timer === 1296) {
        setTimeout(function(){
          gameInterval2 = setInterval(function(){
            createNote();
          }, noteInterval);
        }, 648);
      }

      if (timer === 3499) {
        setTimeout(function(){
          gameInterval3 = setInterval(function(){
            createNote();
          }, noteInterval);
        }, 324);
      }
      if (timer === 5799) {
        setTimeout(function(){
          gameInterval4 = setInterval(function(){
            createNote();
          }, noteInterval);
        }, 162);
      }

      if (timer === 8600) {
        clearInterval(gameInterval4);
      }

      if (timer === 13200){
        clearInterval(gameInterval);
        clearInterval(gameInterval2);
        clearInterval(gameInterval3);
        clearInterval(noteInterval);
        noteInterval = 162;
        gameInterval = setInterval(function(){
          createNote();
        }, noteInterval);
      }
      if (timer === 17000) {
        clearInterval(gameInterval);
        clearInterval(noteInterval);
      }
    },10);
  }

  function gameStart(){
    registerNote();
    gameRhythm();
    keypressAnimation();
  }

  function createNote(){
    const $columns = $('.column');
    const $randomColumn = $columns[(Math.floor(Math.random() * 4))];   // Select a random column
    const $newNote = $('<div/>', {'class': 'notes'});
    $newNote.appendTo($randomColumn);
    translateNote($newNote);
    return $randomColumn;
  }

  function translateNote(note){
    note.animate({
      bottom: '-1px'
    }, 3240, 'linear', function(){
      const $unhit = $keyboard.find('.notes'); // When notes are hit, they are removed from DOM. Therefore this returns only unhit notes.
      for (let i = 0; i < $unhit.length; i++){
        if (parseInt($unhit[i].style.bottom) < 0) {  // If unhit notes are at -1px, they've been missed.
          note.remove();
          feedbackMissed();
          deductScore();
          scoreMissed += 1;
          comboCounter = 0;
        }
      }
    });
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
            dPosition = parseInt($dLastNote.style.bottom, 10);
            if ((dPosition < 120 && dPosition > 95) || (dPosition < 70 && dPosition > 60)) {
              $dLastNote.remove();
              comboCounter += 1;
              down['68'] = true;
              hitAnimation();
              hit.play();
              addScoreGood();
              feedbackGood();
            } else if (dPosition <= 95 && dPosition >= 70) {
              $dLastNote.remove();
              comboCounter += 1;
              down['68'] = true;
              hitAnimation();
              hit.play();
              addScoreGreat();
              feedbackGreat();
            } else {
              feedbackMissed();
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 70:
          if (down['70'] === null){
            fPosition = parseInt($fLastNote.style.bottom, 10);
            if  ((fPosition < 120 && fPosition > 95) || (fPosition < 70 && fPosition > 60)) {
              $fLastNote.remove();
              comboCounter += 1;
              down['70'] = true;
              hitAnimation();
              hit.play();
              addScoreGood();
              feedbackGood();
            } else if (fPosition <= 95 && fPosition >= 70) {
              $fLastNote.remove();
              comboCounter += 1;
              down['70'] = true;
              hitAnimation();
              hit.play();
              addScoreGreat();
              feedbackGreat();
            } else {
              feedbackMissed();
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 74:
          if (down['74'] === null){
            jPosition = parseInt($jLastNote.style.bottom, 10);
            if  ((jPosition < 120 && jPosition > 95) || (jPosition < 70 && jPosition > 60)) {
              $jLastNote.remove();
              comboCounter += 1;
              down['74'] = true;
              hitAnimation();
              hit.play();
              addScoreGood();
              feedbackGood();
            } else if (jPosition <= 95 && jPosition >= 70) {
              $jLastNote.remove();
              comboCounter += 1;
              down['74'] = true;
              hitAnimation();
              hit.play();
              addScoreGreat();
              feedbackGreat();
            } else {
              feedbackMissed();
              deductScore();
              comboCounter = 0;
            }
          }
          break;
        case 75:
          if (down['75'] === null){
            kPosition = parseInt($kLastNote.style.bottom, 10);
            if ((kPosition < 120 && kPosition > 95) || (kPosition < 70 && kPosition > 60)){
              $kLastNote.remove();
              comboCounter += 1;
              down['75'] = true;
              hitAnimation();
              hit.play();
              addScoreGood();
              feedbackGood();
            } else if (kPosition <= 95 && kPosition >= 70) {
              $kLastNote.remove();
              comboCounter += 1;
              down['75'] = true;
              hitAnimation();
              hit.play();
              addScoreGreat();
              feedbackGreat();
            } else {
              feedbackMissed();
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

  function addScoreGreat(){
    scores += 300;
    $score.html(`${scores}`);
    scoreGreat += 1;
    return $score;
  }
  function addScoreGood(){
    scores += 200;
    $score.html(`${scores}`);
    scoreGood += 1;
    return $score;
  }

  function deductScore(){
    scores -= 200;
    $score.html(`${scores}`);
    return $score;
  }

  function feedbackGreat(){
    $('.feedback-text').html('GREAT');
    $('.feedback-text').addClass('great');
    $feedback.show();
    setTimeout(function(){
      $('.feedback-text').removeClass('great');
      $feedback.hide();
    }, 400);
  }

  function feedbackGood(){
    $('.feedback-text').addClass('good');
    $('.feedback-text').html('GOOD');
    $feedback.show();
    setTimeout(function(){
      $('.feedback-text').removeClass('good');
      $feedback.hide();
    }, 400);
  }

  function feedbackMissed(){
    $('.feedback-text').addClass('missed');
    $('.feedback-text').html('MISSED');
    $feedback.show();
    setTimeout(function(){
      $('.feedback-text').removeClass('missed');
      $feedback.hide();
    }, 400);
  }

  function combo(){
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
    const $keymap = {68: $('.hitbox-1'), 70: $('.hitbox-2'), 74: $('.hitbox-3'), 75: $('.hitbox-4')};
    const $keys = Object.keys($keymap);
    for (let i = 0; i < 4; i++) {
      if (down[$keys[i]] === true){
        $keymap[$keys[i]].addClass('hit');
      }
    }
  }

  function timerStart(){
    let time = 3;
    $display.html(`${time}`).addClass('animated zoomIn infinite');
    const startTimer = setInterval(function(){
      time -= 1;
      $display.html(`${time}`);
      checkTime();
    }, 1000);

    function checkTime(){
      if (time <= 0) {
        clearInterval(startTimer);
        $display.hide();
      }
    }
  }

  function displayResult(){
    const $scoreGreat = $('.score-great');
    const $scoreGood = $('.score-good');
    const $scoreMissed = $('.score-missed');
    const $scoreOverall = $('.score-overall');

    $scoreGreat.html(` ${scoreGreat}x`);
    $scoreGood.html(` ${scoreGood}x`);
    $scoreMissed.html(` ${scoreMissed}x`);
    $scoreOverall.html(` ${scores}`);
  }

  function calculateGrade(){
    if ( scores/totalScore >= 0.9 ){
      grade = 'S';
      $grade.css({'background': '-webkit-linear-gradient(gold, white, gold)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent', '-webkit-text-stroke': '2px white'});
    } else if (scores/totalScore >= 0.8){
      grade = 'A';
      $grade.css({'background': '-webkit-linear-gradient(green, yellow, green)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent', '-webkit-text-stroke': '2px white'});
    } else if (scores/totalScore >=0.7){
      grade = 'B';
      $grade.css({'background': '-webkit-linear-gradient(blue, #000080)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent', '-webkit-text-stroke': '2px white'});
    } else if (scores/totalScore >=0.7) {
      grade = 'C';
      $grade.css({'color': 'purple', '-webkit-text-stroke': '2px white'});
    } else if (scores/totalScore >=0.6) {
      grade = 'D';
      $grade.css({'color': 'red', '-webkit-text-stroke': '2px white'});
    } else if (scores/totalScore >=0.5) {
      grade = 'E';
      $grade.css({'color': 'red', '-webkit-text-stroke': '2px white'});
    } else {
      grade = 'Failed';
      $grade.css({'color': 'red', '-webkit-text-stroke': '2px white'});
    }
  }

  function displayGrade(){
    $grade.html(`${grade}`);
  }

  function createPlayer(){
    name = $name.val();
  }

  function newHighscore(){
    function highscore(name, scores){
      this.name = name;
      this.scores = scores;
    }
    const newRecord = new highscore(name, scores);
    localStorage.setItem(newRecord.name, JSON.stringify(newRecord.scores));
  }

  function updateHighscore(){
    for (let i = 0; i < localStorage.length; i++){
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      $records.append(`${key} : ${value}` + '<br>');
    }
    return $records;
  }
});
