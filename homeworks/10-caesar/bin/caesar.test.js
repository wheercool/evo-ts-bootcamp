"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var caesar_1 = require("./caesar");
var ReadableMemory = /** @class */ (function (_super) {
    __extends(ReadableMemory, _super);
    function ReadableMemory(text, opts) {
        var _this = _super.call(this, opts) || this;
        _this.text = text;
        _this.index = 0;
        return _this;
    }
    ReadableMemory.prototype._read = function (size) {
        if (this.index >= this.text.length) {
            this.push(null);
            return;
        }
        var buffer = Buffer.from(this.text[this.index], 'utf-8');
        this.index++;
        this.push(buffer);
    };
    return ReadableMemory;
}(stream_1.Readable));
var WritableMemory = /** @class */ (function (_super) {
    __extends(WritableMemory, _super);
    function WritableMemory() {
        var _this = _super.call(this) || this;
        _this.text = '';
        return _this;
    }
    WritableMemory.prototype._write = function (chunk, encoding, callback) {
        this.text += chunk.toString('utf-8');
        callback();
    };
    return WritableMemory;
}(stream_1.Writable));
describe('Caesar', function () {
    it('should encode/decode w\o changes', function (done) {
        var text = 'Hello, world';
        var read = new ReadableMemory('Hello, world');
        var write = new WritableMemory();
        read
            .pipe(caesar_1.caeasar(1).encode())
            .pipe(caesar_1.caeasar(1).decode())
            .pipe(write);
        write.on('finish', function () {
            expect(write.text).toEqual(text);
            done();
        });
    });
});
