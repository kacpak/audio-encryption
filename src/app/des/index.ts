import {DES} from './DES';
import {KeyGenerator} from './KeyGenerator';
import {TextConversion} from './TextConversion';
import md5 = require('blueimp-md5');

function generateRoundKeys(plainEncryptionKey: string): string[] {
  let hash: string = md5(plainEncryptionKey);
  let key: string = TextConversion.convertHashToBinaryKey(hash);
  return KeyGenerator.generateKeys(key);
}

export default {
  encrypt(message: string, key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const roundKeys: string[] = generateRoundKeys(key);
        const binaryMessage: string = TextConversion.convertTextToBinary(message);
        const encryptedMessage = DES.encrypt(binaryMessage, roundKeys);
        resolve(TextConversion.convertBinaryToText(encryptedMessage));
      }, 0);
    });
  },

  decrypt(message: string, key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        const roundKeys: string[] = generateRoundKeys(key);
        const binaryMessage: string  = TextConversion.convertTextToBinary(message);
        const decryptedMessage: string = DES.decrypt(binaryMessage, roundKeys);
        resolve(TextConversion.convertBinaryToText(decryptedMessage).trim());
      }, 0);
    });
  }
}
