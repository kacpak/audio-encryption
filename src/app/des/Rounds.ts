import {Util} from './Util';
import {SBox} from './SBox';

export class Rounds {

  //podział 64-bitowego bloku na połówki
  static splitInHalf(input: string): string[] {
    let half1: string = input.substring(0, input.length / 2);
    let half2: string = input.substring(input.length / 2, input.length);
    let halves: string[] = [half1, half2];
    return halves;
  }

  //runda DES
  static round(leftHalf: string, rightHalf: string, key: string): string[] {
    let halves: string[] = new Array(2);
    halves[0] = rightHalf;
    //funkcja rozszerzająca E
    let e: string = Util.transformBitsByVector(rightHalf, Util.expansionVector);
    //xorowanie z kluczem
    let ek: string = Util.xor(e, key);
    //sboxy
    let cf: string = '';
    let c: string[] = new Array(8);

    for (let i: number = 0; i < c.length; i++) {
      c[i] = SBox.convert(i + 1, ek.substring(i * 6, i * 6 + 6));
      cf += c[i];
    }

    //funkcja permutacji P
    let f: string = Util.transformBitsByVector(cf, Util.fixedPermutationVector);
    halves[1] = Util.xor(leftHalf, f);
    return halves;
  }
}
