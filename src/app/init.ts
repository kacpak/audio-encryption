import '../styles/main.less';
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
  const toDecryptTextArea = document.querySelector('#encrypted-message2') as HTMLTextAreaElement;
  const encryptionKey = document.querySelector('#encryption-key') as HTMLInputElement;
  const decryptionKey = document.querySelector('#decryption-key') as HTMLInputElement;
  const encryptionController = new EncryptionController(
    encryptedTextArea, encryptionKey,
    toDecryptTextArea, decryptionKey,
    loadingIndicator
  );

  const encryptMessageButton = document.querySelector('#encrypt-recording') as HTMLButtonElement;
  encryptMessageButton.addEventListener('click', () => {
    const originalMessage = audioController.getMessage();
    encryptionController.setEncryptedText(originalMessage);
  });

  // Play new message
  const playNewMessageButton = document.querySelector('#play-message') as HTMLButtonElement;
  playNewMessageButton.addEventListener('click', () => playMessage(audioController.getMessage()));

  // Play decrypted message
  const playDecryptedMessageButton = document.querySelector('#play-decrypted-message') as HTMLButtonElement;
  playDecryptedMessageButton.addEventListener('click', async () => {
    const decryptedMessage = await encryptionController.getOriginalMessage();
    playMessage(decryptedMessage);
  });
}

function playMessage(source: string): void {
  try {
    const audioPlayer = document.querySelector('#audio-player') as HTMLAudioElement;
    audioPlayer.src = source;
    audioPlayer.play();
  } catch (err) {
    console.debug(err);
    alert('Wystąpił błąd podczas odtwarzania dźwięku')
  }
}

function loadingIndicator(state: 'show'|'hide'): void {
  const indicator: HTMLElement = document.querySelector('#loading-indicator') as HTMLElement;
  if (state === 'show') {
    indicator.classList.remove('hidden');
  } else {
    indicator.classList.add('hidden');
  }
}

window.addEventListener('DOMContentLoaded', onLoad);
