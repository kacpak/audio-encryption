import {DES} from '../des/DES';
import {KeyGenerator} from '../des/KeyGenerator';
import {TextConversion} from '../des/TextConversion';
import md5 = require('blueimp-md5');

export class EncryptionController {
  roundKeys: string[];

  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement) {}

  getOriginalMessage(): string {
    this.generateRoundKeys();
    const binaryMessage: string  = TextConversion.convertTextToBinary(this.encryptedTextArea.value);
    const decryptedMessage: string = DES.decrypt(binaryMessage, this.roundKeys);
    return TextConversion.convertBinaryToText(decryptedMessage).trim();
  }

  setEncryptedText(message: string): void {
    this.generateRoundKeys();
    const binaryMessage: string  = TextConversion.convertTextToBinary(message);
    const encryptedMessage = DES.encrypt(binaryMessage, this.roundKeys);
    this.encryptedTextArea.value = TextConversion.convertBinaryToText(encryptedMessage);
  }

  generateRoundKeys(): void {
    let hash: string = md5(this.encryptionKeyInput.value);
    let key: string = TextConversion.convertHashToBinaryKey(hash);
    this.roundKeys = KeyGenerator.generateKeys(key);
  }
}
