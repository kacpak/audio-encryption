export class Util {

  static expansionVector = [32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12,
    13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25,
    26, 27, 28, 29, 28, 29, 30, 31, 32, 1];

  static fixedPermutationVector = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31,
    10, 2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];

  static addPaddingToBinary(value: string, sizeRequired: number): string {
    if (value.length < sizeRequired) {
      let temp: string = '';
      for (let i: number = 0; i < sizeRequired; i++) {
        temp += '0';
      }
      temp += value;
      return temp.substring(temp.length - sizeRequired, temp.length);
    }
    return value;
  }

  static xor(aS: string, bS: string): string {
    if (aS.length != bS.length) {
      throw 'IllegalArgumentException';
    }

    let result: string = '';

    for (let i: number = 0; i < aS.length; i++) {
      if (aS.charAt(i) != bS.charAt(i)) {
        result += '1';
      } else {
        result += '0';
      }
    }

    return result;
  }

  static transformBitsByVector(inputValueS: string, transformVector: number[]): string {
    let output: string = '';
    for (let i: number = 0; i < transformVector.length; i++) {
      output += inputValueS.charAt(transformVector[i] - 1);
    }

    return output;
  }
}
