import DES from '../des';
import Ceasar from '../ceasar';

export interface Cipher {
  encrypt(message: string, key: string): Promise<string>;
  decrypt(message: string, key: string): Promise<string>;
}

export interface LoadingIndicator {
  (state: 'show'|'hide'): void;
}

export class EncryptionController {
  private cipher: Cipher = Ceasar;

  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement,
              private toDecryptTextArea: HTMLTextAreaElement, private decryptionKeyInput: HTMLInputElement,
              private loadingIndicator: LoadingIndicator) {}

  async getOriginalMessage(): Promise<string> {
    this.loadingIndicator('show');
    const originalText = await this.cipher.decrypt(this.toDecryptTextArea.value, this.decryptionKeyInput.value);
    this.loadingIndicator('hide');

    return originalText;
  }

  async setEncryptedText(message: string) {
    this.loadingIndicator('show');
    this.encryptedTextArea.value = await this.cipher.encrypt(message, this.encryptionKeyInput.value);
    this.loadingIndicator('hide');
  }
}
