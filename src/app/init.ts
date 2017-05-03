import {AudioController} from './controllers/audioController';
import {EncryptionController} from './controllers/encryptionController';

function onLoad() {
  // Setup recording
  const startButton = document.querySelector('#start-recording') as HTMLButtonElement;
  const stopButton = document.querySelector('#stop-recording') as HTMLButtonElement;
  const timerElement = document.querySelector('#clock') as HTMLElement;
  const audioController = new AudioController(startButton, stopButton, timerElement);

  // Setup encryption handling
  const encryptedTextArea = document.querySelector('#encrypted-message') as HTMLTextAreaElement;
  const encryptionKey = document.querySelector('#encryption-key') as HTMLInputElement;
  const encryptionController = new EncryptionController(encryptedTextArea, encryptionKey);

  const encryptMessageButton = document.querySelector('#encrypt-recording') as HTMLButtonElement;
  encryptMessageButton.addEventListener('click', () => {
    const originalMessage = audioController.getMessage();
    encryptionController.setEncryptedText(originalMessage);
  });

  // Play message
  const playMessageButton = document.querySelector('#play-message') as HTMLButtonElement;
  playMessageButton.addEventListener('click', () => playMessage(encryptionController.getOriginalMessage()));
}

function playMessage(source: string) {
  const audioPlayer = document.querySelector('#audio-player') as HTMLAudioElement;
  audioPlayer.src = source;
  audioPlayer.play();
}

window.addEventListener('DOMContentLoaded', onLoad);
