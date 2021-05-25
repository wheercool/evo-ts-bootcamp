import EventEmitter from 'events';
import * as fs from 'fs';

export type Path = string;
export type Delay = number;

export class DirWatcher {
  private timerId?: NodeJS.Timeout;

  constructor(
    private messageBus: EventEmitter) {
  }

  watch(path: Path, delay: Delay) {
    let prevFiles: Path[] = [];
    (async () => {
      this.timerId = setInterval(async () => {
        const files = await getDirectoryInfo(path);
        const diffResult = diff(prevFiles, files);
        prevFiles = files;
        if (diffResult.added.length > 0 || diffResult.removed.length > 0) {
          this.messageBus.emit('dirwatch:changed', diffResult);
        }
      }, delay)
    })();
  }

  stopWatch() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}

function getDirectoryInfo(path: Path): Promise<Path[]> {
  return new Promise<Path[]>((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
        process.exit(1);
      }
      resolve(files.map(file => path + '/' + file));
    })
  })
}

interface Changes {
  added: Path[];
  removed: Path[]
}

function diff(oldFiles: Path[], newFiles: Path[]): Changes {
  let added: Path[] = [];
  let removed: Path[] = [];
  for (const newFile of newFiles) {
    if (!oldFiles.includes(newFile)) {
      added.push(newFile);
    }
  }

  for (const oldFile of oldFiles) {
    if (!newFiles.includes(oldFile)) {
      removed.push(oldFile);
    }
  }

  return {
    added,
    removed
  };
}
