import {DES} from './DES';
import {KeyGenerator} from './KeyGenerator';
import {TextConversion} from './TextConversion';
import md5 = require('blueimp-md5');

function generateRoundKeys(plainEncryptionKey: string): string[] {
  let hash: string = md5(plainEncryptionKey);
  let key: string = TextConversion.convertHashToBinaryKey(hash);
  return KeyGenerator.generateKeys(key);
}

function encryptPart(message: string, key: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const roundKeys: string[] = generateRoundKeys(key);
      const binaryMessage: string = TextConversion.convertTextToBinary(message);
      const encryptedMessage: string = DES.encrypt(binaryMessage, roundKeys);
      resolve(TextConversion.convertBinaryToText(encryptedMessage));
    }, 0);
  });
}

function decryptPart(message: string, key: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      const roundKeys: string[] = generateRoundKeys(key);
      const binaryMessage: string  = TextConversion.convertTextToBinary(message);
      const decryptedMessage: string = DES.decrypt(binaryMessage, roundKeys);
      resolve(TextConversion.convertBinaryToText(decryptedMessage));
    }, 0);
  });
}

export default {
  async encrypt(message: string, key: string): Promise<string> {
    let combined: string = '';
    let messagePart: string;
    let value: number = Math.ceil(message.length / 1000);
    for (let i: number = 0; i < value; i++) {
      messagePart = message.substr(i * 1000, 1000);
      combined += await encryptPart(messagePart, key);
    }
    return combined;
  },

  async decrypt(message: string, key: string): Promise<string> {
    let combined: string = '';
    let messagePart: string;
    let value: number = Math.ceil(message.length / 1000);
    for (let i: number = 0; i < value; i++) {
      messagePart = message.substr(i * 1000, 1000);
      combined += await decryptPart(messagePart, key);
    }
    return combined.trim();
  }
};
