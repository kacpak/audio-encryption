export class KeyGenerator {

  static PC1Left = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36];
  static PC1Right = [63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
  static PC2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
  static Shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

  static generateKeys(masterKey: string): string[] {
  if (masterKey == null || masterKey.length < 64) {
    throw 'IllegalArgumentException';
  }

  //permutacja PC1
  let C0: string = '';
  for (let i: number = 0; i < KeyGenerator.PC1Left.length; i++) {
    C0 += masterKey.charAt(KeyGenerator.PC1Left[i] - 1);
  }

  let D0: string = '';
  for (let i: number = 0; i < KeyGenerator.PC1Right.length; i++) {
    D0 += masterKey.charAt(KeyGenerator.PC1Right[i] - 1);
  }

  let C1: string = '';
  let D1: string = '';
  let K0: string, K1: string;
  let ShiftsCounter: number = 0;
  let generatedKeys: string[] = new Array(16);
  let shiftedKeys: string[] = new Array(16);

  //generacja 16 kluczy
  while (ShiftsCounter < 16) {
  //przesunięcie bitowe w lewo obu ciągów
    for (let i: number = 0; i < KeyGenerator.Shifts[ShiftsCounter]; i++) {
      let temp: string = C0.charAt(0);
      C1 = C0.substring(1) + temp;

      temp = D0.charAt(0);
      D1 = D0.substring(1) + temp;

      C0 = C1;
      D0 = D1;
    }
  shiftedKeys[ShiftsCounter] = C1 + D1;
  ShiftsCounter++;
  }

  ShiftsCounter = 0;

  //permutacja PC2
  while (ShiftsCounter < 16) {
    K0 = shiftedKeys[ShiftsCounter];
    K1 = '';
    for (let i: number = 0; i < KeyGenerator.PC2.length; i++) {
      K1 += K0.charAt(KeyGenerator.PC2[i] - 1);
    }

  //gotowy klucz
  generatedKeys[ShiftsCounter] = K1;

  ShiftsCounter++;
  }

  return generatedKeys;
  }
}
