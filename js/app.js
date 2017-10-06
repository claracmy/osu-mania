$(() => {
  // Setup
  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $buttons = $('.button');
  const $welcome = $('.welcome');


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
  });

  function hideWelcome(){
    $welcome.hide();
  }


  // Display Keyboard and score.
  function showKeyboard(){
    const $gameboard = $('.gameboard');
    const $keyboard = $('.keyboard');
    $keyboard.show();
    $gameboard.show()
  }

  // Once start is pressed, count down 3 secs


  // Display notes




});
