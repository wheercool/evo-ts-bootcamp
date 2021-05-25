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
exports.caeasar = void 0;
var stream_1 = require("stream");
var Caesar = /** @class */ (function (_super) {
    __extends(Caesar, _super);
    function Caesar(shift) {
        var _this = _super.call(this) || this;
        _this.shift = shift;
        _this.upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        _this.lowerCase = 'abcdefghijklmnopqrstuvwxyz'.split('');
        return _this;
    }
    Caesar.prototype._transform = function (chunk, encoding, callback) {
        var str = chunk.toString();
        var result = '';
        for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
            var char = str_1[_i];
            var index = void 0;
            index = this.upperCase.indexOf(char);
            if (index >= 0) {
                result += this.upperCase[(index + this.shift) % this.upperCase.length];
            }
            else {
                index = this.lowerCase.indexOf(char);
                if (index >= 0) {
                    result += this.lowerCase[(index + this.shift) % this.lowerCase.length];
                }
                else {
                    result += char;
                }
            }
        }
        callback(null, result);
    };
    return Caesar;
}(stream_1.Transform));
var caeasar = function (shift) { return ({
    encode: function () { return new Caesar(shift); },
    decode: function () { return new Caesar(-shift); }
}); };
exports.caeasar = caeasar;
