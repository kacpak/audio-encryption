import DES from '../des';
import Ceasar from '../ceasar';

export interface LoadingIndicator {
  (state: 'show'|'hide'): void;
}

export class EncryptionController {
  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement,
              private toDecryptTextArea: HTMLTextAreaElement, private decryptionKeyInput: HTMLInputElement,
              private loadingIndicator: LoadingIndicator) {}

  async getOriginalMessage(): Promise<string> {
    this.loadingIndicator('show');
    // const originalText = await DES.decrypt(this.toDecryptTextArea.value, this.decryptionKeyInput.value);
    const originalText = await Ceasar.decrypt(this.toDecryptTextArea.value, this.decryptionKeyInput.value);
    this.loadingIndicator('hide');

    // console.groupCollapsed('encrypted -> plain');
    // console.log('encrypted:');
    // console.log(this.toDecryptTextArea.value);
    // console.log('key:');
    // console.log(this.decryptionKeyInput.value);
    // console.log('decrypted:');
    // console.log(originalText);
    // console.groupEnd();

    return originalText;
  }

  async setEncryptedText(message: string) {
    this.loadingIndicator('show');
    this.encryptedTextArea.value = await Ceasar.encrypt(message, this.encryptionKeyInput.value);
    // this.encryptedTextArea.value = await DES.encrypt(message, this.encryptionKeyInput.value);
    this.loadingIndicator('hide');

    // console.groupCollapsed('plain -> encrypted');
    // console.log('plain:');
    // console.log(message);
    // console.log('key:');
    // console.log(this.encryptionKeyInput.value);
    // console.log('encrypted:');
    // console.log(this.encryptedTextArea.value);
    // console.groupEnd();
  }
}
