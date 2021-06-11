#!/usr/bin/env node
import commander, { Option } from 'commander';
import fs from 'fs';
import { caeasar } from './caesar';

interface Options {
  shift: number;
  action: 'encode' | 'decode';
  input?: string;
  output?: string;
}


const json = require('../package.json');
const programm = commander.program;

const actionOption = new Option('-a, --action  <type>   [required]', 'Specify what action you want to perform')
  .choices(['decode', 'encode']);
actionOption.makeOptionMandatory()

programm
  .version(json.version)
  .name('node')
  .usage('caesar-cli options')
  .requiredOption('-s, --shift   <number> [required]', 'Set the shift for decode/encode data', intParser)
  .addOption(actionOption)
  .option('-i, --input   <path>', 'Specify the file where to get the data from')
  .option('-o, --output  <path>', 'Specify the file to save the data to')
  .addHelpText('after', `
  Examples:
  node caesar-cli --shift=7 --action=encode        Encode data from stdin with shift 7 and print result to stdout
  node caesar-cli -s 2 -a decode -i topsecret.txt  Decode topsecret.txt with shift 2 and print result to stdout
N.B.: 1. If the output file doesn't exist it wouldn't be created. You can write output stream only to the existing file.
      2. If --input option is omitted - STDIN is used as an input source. Use Ctrl+C for break input.
      3. If --output option is omitted - STDOUT is used as an output destination.
      4. --shift value can be negative and can exceed the size of the alphabet.
      5. Only English alphabet characters are encoded/decoded, all other characters will be kept intact.
      6. If --help is given the help is displayed and other options are ignored.
      7. If --version is given and --help has omitted the version of the app is displayed and other options are ignored.
Values for options can be set like "--action encode" (whitespace separated) or "--action=encode" (= separated). It doesn't matter.`)
  .action((options: Options) => {
    const inputStream = options.input ? fs.createReadStream(options.input) : process.stdin;
    const outputStream = options.output ? fs.createWriteStream(options.output) : process.stdout;
    const caesarAlgorithm = caeasar(options.shift);
    const transformer = options.action === 'decode' ? caesarAlgorithm.decode() : caesarAlgorithm.encode();

    inputStream.pipe(transformer)
      .pipe(outputStream);
  })
  .parse(process.argv)

function intParser(value: string, dummyPrevious: string) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.');
  }
  return parsedValue as any;
}

function caesar(caesar: any, stdout: NodeJS.WriteStream & { fd: 1; }) {
  throw new Error('Function not implemented.');
}

