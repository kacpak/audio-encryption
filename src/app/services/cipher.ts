export class Cipher {
  encrypt(message: string, encryptionKey: string): string {
    const shift = parseFloat(encryptionKey);
    return this.shift(message, shift);
  }

  decrypt(message: string, encryptionKey: string): string {
    const shift = parseFloat(encryptionKey);
    return this.shift(message, -shift);
  }

  shift(message: string, shift: number): string {
    return message
      .split('')
      .map(c => c.charCodeAt(0))
      .map(c => c + shift)
      .map(c => String.fromCharCode(c))
      .join('');
  }
}
