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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const image_size_1 = __importDefault(require("image-size"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test middleware', () => {
    it('checks if error is thrown when the path does not lead to an image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=asdf&width=600&height=600');
        expect(response.text).toEqual('File does not exist.');
    }));
    it('checks if error is not thrown when the path does lead to an image', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=argentina&width=600&height=600');
        expect(response.text).not.toEqual('File does not exist.');
        fs_1.promises.unlink(path_1.default.resolve(__dirname + '../../../../assets/thumb/argentina_thumb.jpg'));
    }));
    it('checks if image was processed correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.get('/api/images?filename=argentina&width=600&height=600');
        const dimensions = (0, image_size_1.default)(path_1.default.resolve(__dirname + '../../../../assets/thumb/argentina_thumb.jpg'));
        fs_1.promises.unlink(path_1.default.resolve(__dirname + '../../../../assets/thumb/argentina_thumb.jpg'));
        expect(dimensions.width).toEqual(600);
        expect(dimensions.height).toEqual(600);
    }));
});
