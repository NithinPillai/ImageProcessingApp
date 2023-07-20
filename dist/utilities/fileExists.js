"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fileExists = (req, res, next) => {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');
    const filename = queries[0].substring(9);
    if (fs_1.default.existsSync(`assets/full/${filename}.jpg`)) {
        // console.log('middleware success');
        res.statusCode = 200;
        next();
    }
    else {
        // console.log('middleware fail');
        res.send('File does not exist.');
        res.statusCode = 400;
    }
};
exports.default = fileExists;
