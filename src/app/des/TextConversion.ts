export class TextConversion {

  static convertTextToBinary(text: string): string {
    let mod: number = text.length % 8;
    if (mod != 0) {
      for (let i: number = 8; i > mod; i--) {
        text += ' ';
      }
    }

    //zamiana znaków na ciąg bitów gotowy do zaszyfrowania
    let binaryString: string = '';
    let count: number = 0;
    for (let j: number = 0; j < text.length; j++) {
      let val: number = text.charCodeAt(j);
      for (let i: number = 0; i < 8; i++) { // zamieniamy znak na reprezentację binarną (robimy to 8 razy, by uzyskać 8 bitów)
        binaryString += ((val & 128) == 0 ? 0 : 1);
        val <<= 1;
      }

      count++;
    }
    console.log(text.length);
    console.log(count);
    console.log(binaryString.length);
    return binaryString;
  }

  static convertBinaryToText(binary: string): string {
    let text: string = '';
    let bin: string = '';
    let charCode: number;
    for (let i: number = 0; i < binary.length; i++) {
      bin += binary.charAt(i);
      if (bin.length % 8 == 0) {
        charCode = parseInt(bin, 2); // zamieniamy ciąg binarny na liczbę dziesiętną
        text += String.fromCharCode(charCode); // zamieniamy liczbę dziesiętną na znak ASCII i dopisujemy do textu
        bin = '';
      }
    }

    return text;
  }

  static convertHashToBinaryKey(hash: string): string {
    let key: string = '';
    let val: string;
    for (let i: number = 0; i < hash.length; i++) {
      val = hash.charCodeAt(i).toString(2);
      key += val;
      if (key.length >= 64) {
        key = key.substring(0, 64);
        break;
      }
    }

    return key;
  }
}
