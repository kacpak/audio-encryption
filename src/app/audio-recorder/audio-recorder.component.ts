import * as path from 'path';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'audio-recorder',
  templateUrl: path.join(__dirname, 'audio-recorder.component.html')
})
export class AudioRecorderComponent implements OnInit {
  @Output() record: EventEmitter<string> = new EventEmitter();
  isRecordingInProgress: boolean;
  private recordRTC: any;

  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(audioStream => this.recordRTC = RecordRTC(audioStream, { type: 'audio' }))
      .catch(error => console.error('Error getting audio stream!', error));
  }

  startRecording(): void {
    if (!this.isRecordingInProgress) {
      this.recordRTC.startRecording();
    }
    this.isRecordingInProgress = true;
  }

  stopRecording(): void {
    if (!this.isRecordingInProgress) {
      return;
    }

    this.isRecordingInProgress = false;
    this.recordRTC.stopRecording((audioURL: string) => {
      this.recordRTC.getDataURL((dataURL: string) => this.record.emit(dataURL));
    });
  }
}
