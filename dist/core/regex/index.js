"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRegex = void 0;
class RootRegex {
    static stripWhiteSpaces(str) {
        return str.replace(this.whiteSpace, "-");
    }
}
exports.RootRegex = RootRegex;
RootRegex.whiteSpace = /\s+/g;
