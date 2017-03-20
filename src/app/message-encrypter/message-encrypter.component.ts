import * as path from 'path';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'encypter',
  templateUrl: path.join(__dirname, 'message-encrypter.component.html')
})
export class MessageEncrypterComponent {
  @Input('message') recordedMessage: string;

  playOriginalMessage(): void {
    const audio: HTMLAudioElement = new Audio();
    audio.src = this.recordedMessage;
    console.log(this.recordedMessage);
    audio.play();
  }
}
