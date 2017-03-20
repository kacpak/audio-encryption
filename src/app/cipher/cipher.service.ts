import {Injectable} from '@angular/core';

@Injectable()
export class CipherService {

  encode(message: string, shift: number): string {
    return this.shift(message, shift);
  }

  decode(message: string, shift: number): string {
    return this.shift(message, -shift);
  }

  private shift(message: string, shift: number): string {
    return message
      .split('')
      .map(c => c.charCodeAt(0))
      .map(c => c + shift)
      .map(c => String.fromCharCode(c))
      .join('');
  }

}
