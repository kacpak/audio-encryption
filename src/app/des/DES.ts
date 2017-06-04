import {Rounds} from './Rounds';
import {IP} from './IP';

export class DES {

  static encrypt(binaryString: string, roundKeys: string[]): string {
    let result: string = '';
    let blocks: string[] = DES.splitIntoBlocks(binaryString);

    for (let b of blocks) {
      result += DES.encryptBlock(b, roundKeys);
    }

    return result;
  }

  static decrypt(binaryString: string, roundKeys: string[]): string {
    for (let i: number = 0; i < roundKeys.length / 2; i++) {
      let temp: string = roundKeys[i];
      roundKeys[i] = roundKeys[roundKeys.length - i - 1];
      roundKeys[roundKeys.length - i - 1] = temp;
    }

    let result = '';
    let blocks = DES.splitIntoBlocks(binaryString);

    for (let b of blocks) {
      result += DES.decryptBlock(b, roundKeys);
    }

    return result;
  }

  static splitIntoBlocks(binaryString: string): string[] {
    let bin: string = '';
    let binaryBlocks: string[] = [];
    for (let i: number = 0; i < binaryString.length; i++) {
      bin += binaryString.charAt(i);
      if (bin.length == 64) {
        binaryBlocks.push(bin);
        bin = '';
      }
    }

    if (bin.length != 0) {
      while (bin.length != 64) {
        bin = '0' + bin;
      }
      binaryBlocks.push(bin);
    }

    return binaryBlocks;
  }

  static encryptBlock(binaryStringBlock: string, roundKeys: string[]): string {

    let ip: string = IP.initialPermutation(binaryStringBlock);

    let halves: string[] = Rounds.splitInHalf(ip);
    let halvesTemp: string[] = new Array(2);
    for (let j: number = 0; j < roundKeys.length; j++) {
      halvesTemp = Rounds.round(halves[0], halves[1], roundKeys[j]);
      halves = halvesTemp;
    }

    //zamiana połówek stronami
    let temp: string = halves[0];
    halves[0] = halves[1];
    halves[1] = temp;

    temp = halves[0] + halves[1];

    return IP.inversePermutation(temp);
  }

  static decryptBlock(binaryStringBlock: string, roundKeys: string[]): string {
    return DES.encryptBlock(binaryStringBlock, roundKeys);
  }
}
