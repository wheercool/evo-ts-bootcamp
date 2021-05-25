#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importStar(require("commander"));
var fs_1 = __importDefault(require("fs"));
var caesar_1 = require("./caesar");
var json = require('../package.json');
var programm = commander_1.default.program;
var actionOption = new commander_1.Option('-a, --action  <type>   [required]', 'Specify what action you want to perform')
    .choices(['decode', 'encode']);
actionOption.makeOptionMandatory();
programm
    .version(json.version)
    .name('node')
    .usage('caesar-cli options')
    .requiredOption('-s, --shift   <number> [required]', 'Set the shift for decode/encode data', intParser)
    .addOption(actionOption)
    .option('-i, --input   <path>', 'Specify the file where to get the data from')
    .option('-o, --output  <path>', 'Specify the file to save the data to')
    .addHelpText('after', "\n  Examples:\n  node caesar-cli --shift=7 --action=encode        Encode data from stdin with shift 7 and print result to stdout\n  node caesar-cli -s 2 -a decode -i topsecret.txt  Decode topsecret.txt with shift 2 and print result to stdout\nN.B.: 1. If the output file doesn't exist it wouldn't be created. You can write output stream only to the existing file.\n      2. If --input option is omitted - STDIN is used as an input source. Use Ctrl+C for break input.\n      3. If --output option is omitted - STDOUT is used as an output destination.\n      4. --shift value can be negative and can exceed the size of the alphabet.\n      5. Only English alphabet characters are encoded/decoded, all other characters will be kept intact.\n      6. If --help is given the help is displayed and other options are ignored.\n      7. If --version is given and --help has omitted the version of the app is displayed and other options are ignored.\nValues for options can be set like \"--action encode\" (whitespace separated) or \"--action=encode\" (= separated). It doesn't matter.")
    .action(function (options) {
    var inputStream = options.input ? fs_1.default.createReadStream(options.input) : process.stdin;
    var outputStream = options.output ? fs_1.default.createWriteStream(options.output) : process.stdout;
    var caesarAlgorithm = caesar_1.caeasar(options.shift);
    var transformer = options.action === 'decode' ? caesarAlgorithm.decode() : caesarAlgorithm.encode();
    inputStream.pipe(transformer)
        .pipe(outputStream);
})
    .parse(process.argv);
function intParser(value, dummyPrevious) {
    // parseInt takes a string and a radix
    var parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new commander_1.default.InvalidOptionArgumentError('Not a number.');
    }
    return parsedValue;
}
function caesar(caesar, stdout) {
    throw new Error('Function not implemented.');
}
