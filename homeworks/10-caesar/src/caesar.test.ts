import { Readable, ReadableOptions, Writable } from 'stream';
import { caeasar } from './caesar';

class ReadableMemory extends Readable {
  private index: number;

  constructor(private text: string, opts?: ReadableOptions) {
    super(opts);
    this.index = 0;
  }

  _read(size: number) {
    if (this.index >= this.text.length) {
      this.push(null);
      return;
    }

    const buffer = Buffer.from(this.text[this.index], 'utf-8');
    this.index++;
    this.push(buffer)
  }
}


class WritableMemory extends Writable {
  text = '';

  constructor() {
    super();
  }

  _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
    this.text += chunk.toString('utf-8');
    callback();
  }
}

describe('Caesar', () => {
  it('should encode/decode w\o changes', (done) => {
    const text = 'Hello, world';
    const read = new ReadableMemory('Hello, world');
    const write = new WritableMemory();

    read
      .pipe(caeasar(1).encode())
      .pipe(caeasar(1).decode())
      .pipe(write);


    write.on('finish', () => {
      expect(write.text).toEqual(text);
      done();

    })
  })
})
