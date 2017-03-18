const RecordRTC = require('recordrtc');

export class Audio {
  private recordRTC: any;

  constructor() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(audioStream => this.onMicrophoneAvailable(audioStream))
      .catch(error => this.onError(error));
  }

  startRecording() {
    this.recordRTC.startRecording();
  }

  stopRecording(): Promise<string> {
    return new Promise(resolve => {
      this.recordRTC.stopRecording((audioURL: string) => {
        this.recordRTC.getDataURL((dataURL: string) => resolve(dataURL));
      });
    })
  }

  private onMicrophoneAvailable(audioStream: MediaStream) {
    this.recordRTC = RecordRTC(audioStream, {
      type: 'audio'
    });
  }

  private onError(error: Error) {
    console.error('Error getting audio stream!', error);
  }
}
