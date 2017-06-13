function getKey(key: string, length: number): number[] {
  return key
    .repeat(Math.ceil(length / key.length))
    .split('')
    .map(c => c.charCodeAt(0) - 'a'.charCodeAt(0));
}

export default {
  encrypt(message: string, key: string): Promise<string> {
    const shift = getKey(key, message.length);
    return new Promise<string>(resolve => {
      const encrypted = message
        .split('')
        .map((c, i) => c.charCodeAt(0) + shift[i])
        .map(code => String.fromCharCode(code))
        .join('');
      resolve(encrypted);
    });
  },
  decrypt(message: string, key: string): Promise<string> {
    const shift = getKey(key, message.length);
    return new Promise<string>(resolve => {
      const decrypted = message
        .split('')
        .map((c, i) => c.charCodeAt(0) - shift[i])
        .map(code => String.fromCharCode(code))
        .join('');
      resolve(decrypted);
    });
  }
};
