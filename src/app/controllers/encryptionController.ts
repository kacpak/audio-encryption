import {DES} from '../des/DES';
import {KeyGenerator} from '../des/KeyGenerator';

export class EncryptionController {
  roundKeys: string[];

  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement) {
    this.roundKeys = KeyGenerator.generateKeys(this.encryptionKeyInput.value);
  }

  getOriginalMessage(): string {
    return DES.decrypt(this.encryptedTextArea.value, this.roundKeys);
  }

  setEncryptedText(message: string): void {
    const encryptedMessage = DES.encrypt(message, this.roundKeys);
    this.encryptedTextArea.value = encryptedMessage;
  }
}
