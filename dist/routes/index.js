"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fileExists_1 = __importDefault(require("../utilities/fileExists"));
const validUrl_1 = __importDefault(require("../utilities/validUrl"));
const routes = express_1.default.Router();
routes.get('/images/', fileExists_1.default, validUrl_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.url;
    url = url.substring(url.indexOf('?') + 1);
    const queries = url.split('&');
    const filename = queries[0].substring(9);
    const width = parseInt(queries[1].substring(6));
    const height = parseInt(queries[2].substring(7));
    makeImage(filename, width, height);
    setTimeout(() => {
        res.sendFile(path_1.default.resolve(__dirname + `/../../assets/thumb/${filename}_thumb.jpg`));
    }, 250);
}));
function makeImage(filename, width, height) {
    (0, sharp_1.default)(`assets/full/${filename}.jpg`)
        .resize(width, height)
        .toFile(`assets/thumb/${filename}_thumb.jpg`, function (err) {
        if (err != null)
            console.log(err);
    });
}
exports.default = routes;
