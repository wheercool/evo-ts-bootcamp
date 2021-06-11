import { Transform, TransformCallback } from 'stream';

class Caesar extends Transform {
  private readonly upperCase: string[];
  private readonly lowerCase: string[];

  constructor(private shift: number) {
    super();
    this.upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    this.lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    const str = chunk.toString();
    let result = '';
    for (const char of str) {
      let index;
      index = this.upperCase.indexOf(char);
      if (index >= 0) {
        result += this.upperCase[(index + this.shift) % this.upperCase.length];
      } else {
        index = this.lowerCase.indexOf(char);
        if (index >= 0) {
          result += this.lowerCase[(index + this.shift) % this.lowerCase.length];
        } else {
          result += char;
        }
      }
    }
    callback(null, result);
  }
}

export const caeasar = (shift: number) => ({
  encode: () => new Caesar(shift),
  decode: () => new Caesar(-shift)
})
