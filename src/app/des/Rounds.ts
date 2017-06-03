import {Util} from "./Util";
import {SBox} from "./SBox";

class Rounds {

  //podział 64-bitowego bloku na połówki
  static splitInHalf(input) {
    let half1 = input.substring(0, input.length() / 2);
    let half2 = input.substring(input.length() / 2, input.length());
    let halves = [half1, half2];
    return halves;
  }

  //runda DES
  static round(leftHalf, rightHalf, key) {
    let halves = new Array(2);
    halves[0] = rightHalf;
    //funkcja rozszerzająca E
    let e = Util.transformBitsByVector(rightHalf, Util.expansionVector);
    //xorowanie z kluczem
    let ek = Util.xor(e, key);
    //sboxy
    let cf = "";
    let c = new Array(8);

    for (let i = 0; i < c.length; i++) {
      c[i] = SBox.convert(i + 1, ek.substring(i * 6, i * 6 + 6));
      cf += c[i];
    }

    //funkcja permutacji P
    let f = Util.transformBitsByVector(cf, Util.fixedPermutationVector);
    halves[1] = Util.xor(leftHalf, f);
    return halves;
  }

  //złączenie dwóch 32-bitowych bloków
  static joinTheHalves(half1, half2) {
    return half1 + half2;
  }
}
