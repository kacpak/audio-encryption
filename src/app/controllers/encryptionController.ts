import {Cipher} from '../services/cipher';

export class EncryptionController {
  cipher: Cipher;

  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement) {
    this.cipher = new Cipher();
  }

  getOriginalMessage(): string {
    return this.cipher.decrypt(this.encryptedTextArea.value, this.encryptionKeyInput.value);
  }

  setEncryptedText(message: string): void {
    const encryptedMessage = this.cipher.encrypt(message, this.encryptionKeyInput.value);
    this.encryptedTextArea.value = encryptedMessage;
  }
}
