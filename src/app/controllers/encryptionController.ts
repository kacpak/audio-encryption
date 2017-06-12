import DES from '../des';

export interface LoadingIndicator {
  (state: 'show'|'hide'): void;
}

export class EncryptionController {
  constructor(private encryptedTextArea: HTMLTextAreaElement, private encryptionKeyInput: HTMLInputElement,
              private decryptionKeyInput: HTMLInputElement, private loadingIndicator: LoadingIndicator) {}

  async getOriginalMessage(): Promise<string> {
    this.loadingIndicator('show');
    const originalText = await DES.decrypt(this.encryptedTextArea.value, this.decryptionKeyInput.value);
    this.loadingIndicator('hide');
    return originalText;
  }

  async setEncryptedText(message: string) {
    this.loadingIndicator('show');
    this.encryptedTextArea.value = await DES.encrypt(message, this.encryptionKeyInput.value);
    this.loadingIndicator('hide');
  }
}
