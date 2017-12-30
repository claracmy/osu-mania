# Osu Mania! - A Javascript Rhythm Game 
## Stack
- HTML5
- CSS3
- Javascript (ES6)
- jQuery

## The Game
A mock of the popular rhythm game ‘Osu Mania’. Notes fall from the top of the window and the player has to hit the corresponding key when each note reach the bottom. The spawning of the notes are calculated according to the song’s BPM to provide satisfaction when the player hits them on the beat. There are four different speed modes throughout the song and the score is calculated according to the overall accuracy of the player.

## Features

- **Four Difficulties throughout:** Notes falling from four different columns randomly, spaced 1/4 beat apart. 1/8 and 1/16 beats are added later on as difficulty increases.

- **Combo system:** Combo appears as player hit the correct notes consecutively for 10+ times.

- **Scoring system:** If a note is hit close to the target, 300 points is awarded. If a note is hit too late or too early, 200 points is awarded. If a note is missed, 200 points is deducted. The score is calculate at the end to give a final grade (S, A, B, C, D, E or Failed).

- **Cheat prevention:** If the player presses a key that does not have a note within range, score is deducted and combo is broken. Player cannot hold down one key and score constantly.

- **Osu styling:** The pink and white colors and the rainbow texts are taken from the original game. The halo effect and sound effect when a note is hit provides satisfaction and helps the player recognise the rhythm.

## Challenges/Learning Points

- Targetting the note closest to the target and removing it not only from the DOM, but from the script.
- Introducing and removing note intervals.

## Screenshots

![Homepage](https://imgur.com/QnYaIip.png)
![Gameplay](https://imgur.com/KCZ0Cpu.png)
![Scores](https://imgur.com/yceHjPX.png)

## Play the game [HERE](https://osu-mania.herokuapp.com)
