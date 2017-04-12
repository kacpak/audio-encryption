import {Audio} from '../services/audio';

export class AudioController {
  private originalMessageHash: string;
  private audio: Audio;

  constructor(startRecordingButton: HTMLButtonElement, stopRecordingButton: HTMLButtonElement) {
    this.audio = new Audio();
    startRecordingButton.addEventListener('click', () => this.startRecording());
    stopRecordingButton.addEventListener('click', () => this.stopRecording());
  }

  startRecording(): void {
    this.audio.startRecording();
  }

  stopRecording(): Promise<string> {
    return this.audio.stopRecording()
      .then(data => this.originalMessageHash = data);
  }

  getMessage(): string {
    return this.originalMessageHash;
  }

}
