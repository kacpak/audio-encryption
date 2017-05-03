import {Audio} from '../services/audio';

export class AudioController {
  private originalMessageHash: string;
  private audio: Audio;
  private seconds: number;
  private minutes: number;
  private hours: number;
  private timeoutId: number;

  constructor(startRecordingButton: HTMLButtonElement, stopRecordingButton: HTMLButtonElement, private clockElement: HTMLElement) {
    this.audio = new Audio();
    startRecordingButton.addEventListener('click', () => this.startRecording());
    stopRecordingButton.addEventListener('click', () => this.stopRecording());
  }

  startRecording(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timeoutId = setInterval(() => this.updateTimer(), 1000);
    this.audio.startRecording();
  }

  stopRecording(): Promise<string> {
    clearInterval(this.timeoutId);
    return this.audio.stopRecording()
      .then(data => this.originalMessageHash = data);
  }

  getMessage(): string {
    return this.originalMessageHash;
  }

  private updateTimer(): void {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    this.clockElement.textContent = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
  }
}
