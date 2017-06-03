export class DES {

  static encrypt(binaryString, roundKeys) {
    let result = "";
    let blocks = splitIntoBlocks(binaryString);

    for (let b of blocks) {
      result += encryptBlock(b, roundKeys);
    }

    return result;
  }

  static decrypt(binaryString, roundKeys) {
    for (let i = 0; i < roundKeys.length / 2; i++) {
      let temp = roundKeys[i];
      roundKeys[i] = roundKeys[roundKeys.length - i - 1];
      roundKeys[roundKeys.length - i - 1] = temp;
    }

    let result = "";
    let blocks = splitIntoBlocks(binaryString);

    for (let b of blocks) {
      result += decryptBlock(b, roundKeys);
    }

    return result;
  }

  static splitIntoBlocks(binaryString) {
    let bin = "";
    let binaryBlocks = new Array();
    for (let i = 0; i < binaryString.length(); i++) {
      bin += binaryString.charAt(i);
      if (bin.length() == 64) {
        binaryBlocks.push(bin);
        bin = "";
      }
    }

    if (bin.length() != 0) {
      while (bin.length() != 64)
        bin = "0" + bin;
      binaryBlocks.push(bin);
    }

    return binaryBlocks;
  }

  static encryptBlock(binaryStringBlock, roundKeys) {

    let ip = IP.initialPermutation(binaryStringBlock);

    let halves = Rounds.splitInHalf(ip);
    let halvesTemp = new Array(2);
    for (let j = 0; j < 16; j++) {
      halvesTemp = Rounds.round(halves[0], halves[1], roundKeys[j]);
      halves = halvesTemp;
    }

    //zamiana połówek stronami
    let temp = halves[0];
    halves[0] = halves[1];
    halves[1] = temp;

    temp = halves[0] + halves[1];

    return IP.inversePermutation(temp);
  }

  static decryptBlock(binaryStringBlock, roundKeys) {

    return encryptBlock(binaryStringBlock, roundKeys);
  }
}
