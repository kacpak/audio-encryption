import {Audio} from './audio';
import {Cipher} from './cipher';

const audio: Audio = new Audio();
const cipher: Cipher = new Cipher();

function onLoad() {
  const startButton = document.querySelector('#start-recording');
  const stopButton = document.querySelector('#stop-recording');
  const playOriginalButton = document.querySelector('#play-original');
  const playEncodedButton = document.querySelector('#play-encrypted');

  const originalTextArea = document.querySelector('#original');
  const encryptedTextArea = document.querySelector('#encrypted');

  startButton.addEventListener('click', event => {
    audio.startRecording();
  });
  stopButton.addEventListener('click', event => {
    audio.stopRecording()
      .then(data => {
        originalTextArea.value = data;
        encryptedTextArea.value = cipher.encode(data, 5);
      });
  });
  playOriginalButton.addEventListener('click', playOriginal);
  playEncodedButton.addEventListener('click', playEncoded);
}

function playOriginal() {
  const originalTextArea = document.querySelector('#original');
  playAudio(originalTextArea.value);
}

function playEncoded() {
  const encryptedTextArea = document.querySelector('#encrypted');
  playAudio(encryptedTextArea.value);
}

function playAudio(src: string) {
  const audioPlayer = document.querySelector('#audio-player');
  audioPlayer.src = src;
  audioPlayer.play();
}

window.addEventListener('DOMContentLoaded', onLoad);
