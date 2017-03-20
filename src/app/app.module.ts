import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AudioRecorderComponent} from './audio-recorder';
import {MessageEncrypterComponent} from './message-encrypter/message-encrypter.component';
import {CipherService} from './cipher/cipher.service';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, AudioRecorderComponent, MessageEncrypterComponent],
  providers: [CipherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
