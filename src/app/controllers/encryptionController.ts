import {Cipher} from '../services/cipher';
import {DES} from '../des/DES';
import {KeyGenerator} from '../des/KeyGenerator';

export class EncryptionController {
  cipher: Cipher;
  roundKeys: string[];

  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement) {
    this.cipher = new Cipher();
    this.roundKeys = KeyGenerator.generateKeys(this.encryptionKeyInput.value);
  }

  getOriginalMessage(): string {
    //return this.cipher.decrypt(this.encryptedTextArea.value, this.encryptionKeyInput.value);
    return DES.decrypt(this.encryptedTextArea.value, this.roundKeys);
  }

  setEncryptedText(message: string): void {
    //const encryptedMessage = this.cipher.encrypt(message, this.encryptionKeyInput.value);
    const encryptedMessage = DES.encrypt(message, this.roundKeys);
    this.encryptedTextArea.value = encryptedMessage;
  }
}
