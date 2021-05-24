import EventEmitter from 'events';
import csv from 'csvtojson';
import * as fs from 'fs';
import { ReadStream } from 'fs';

const EVENT_NAME = 'dirwatch:changed';

export class Importer {
  constructor(private messageBus: EventEmitter) {
  }

  import(path: string): Promise<Record<string, any>> {
    return fs.promises.readFile(path)
      .then(file => csv().fromString(file.toString()))
  }

  importSync(path: string) {
    const file = fs.readFileSync(path);
    return csv().fromString(file.toString());
  }

  listen() {
    this.messageBus.addListener(EVENT_NAME, this.listener)
  }

  stopListening() {
    this.messageBus.removeListener(EVENT_NAME, this.listener)
  }

  listener = (data: { added: string[], removed: string[] }) => {
    if (data.added.length) {
      console.log('Added: ', data.added);
      for (let path of data.added) {
        this.import(path).then(console.log)
      }
    }
    if (data.removed.length) {
      console.log('Removed: ', data.removed);
    }
  }
}
