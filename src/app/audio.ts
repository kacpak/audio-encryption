const RecordRTC = require('recordrtc');

export class Audio {
  constructor() {
    navigator.getUserMedia(
      { audio: true },
      () => this.onMicrophoneAvailable(),
      () => this.onError()
    );
  }

  onMicrophoneAvailable(audioStream) {
    console.log(audioStream);
  }

  onError(error) {
    console.error('Error getting audio stream!', error);
  }
}
