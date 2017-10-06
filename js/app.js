$(() => {
  // Setup
  const $instruction = $('#instructions');
  const $instructions = $('.instructions');
  const $oneplayer = $('#one-player');
  const $buttons = $('.button');
  const $welcome = $('.welcome');


  // Display instructions
  function showInstructions(){
    $instructions.show();
  }
  function hideInstructions(){
    $instructions.hide();
  }

  // Display instruction
  $instruction.on('mousedown', showInstructions);
  $instruction.on('mouseup', hideInstructions);

  // Hide welcome screen

  // Display Keyboard


  // Once start is pressed, count down 3 secs
  // Display notes




});
