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
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('checks if /api/images/ has been connected to server', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request.get('/api/images');
            expect(response.status).toBe(200);
        }
        catch (err) {
            console.log('error in indexSpecTesting');
        }
    }));
    it('checks if /api/imags/ throws a 404 server connection error', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield request.get('/api/imags');
            expect(response.status).toBe(404);
        }
        catch (err) {
            console.log('error in indexSpecTesting');
        }
    }));
});
