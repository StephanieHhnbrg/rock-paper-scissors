# Rock Paper Scissors
[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](https://angular.dev/)
[![Google AI Edge](https://img.shields.io/badge/Google_AI_Edge-4285F4?logo=google&logoColor=white)](https://developers.google.com/edge)
[![Media Pipe](https://img.shields.io/badge/Media_Pipe-428504?logo=google&logoColor=white)](https://developers.google.com/edge/mediapipe/solutions)

### 📌 Introduction
The main goal of this project, *Rock Paper Scissors*, was to learn more about camera-based interactions and machine learning.


The open-source project *MediaPipe* by *Google AI Edge* provides plenty of pre-trained, ready-to-run models.
For this use case the [hand landmark model](https://developers.google.com/edge/mediapipe/solutions/vision/gesture_recognizer#hand_landmark_model_bundle),
classifying hand gestures, fits particularly well. It can be set up (see [gesture-detector.ts](./src/app/services/gesture-detector.ts)) to detect the landmarks of a user's hand in a video stream, which can then be used to recognize the three different playing moves:
* Rock ✊ closed fist 
* Paper ✋ open hand 
* Scissors ✌️ index and middle finger extended 

The detected gesture is used as the player's move, while the computer randomly selects its own move. 
The two moves are then compared to determine the winner of the round (see [game-engine.ts](./src/app/services/game-engine.ts)).

Possible future improvements could include an online multiplayer.
The game logic could eventually be moved to a server, allowing two players on different devices to play against each other in real time. \
Furthermore, the game feedback could be refined by additional animations and sound effects, enhancing th UX of the game.

### 🛠️ Local Setup
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.7. \
The live version is deployed as a <a href='https://stephaniehhnbrg.github.io/rock-paper-scissors/' target='_blank'>Github Page</a>.

In case you would like to run it locally:
- Install the dependencies `npm install`
- Start project `npm run start`
- Navigate to <a href='http://localhost:4200/' target='_blank'>http://localhost:4200/ </a>



