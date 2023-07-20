import supertest from 'supertest';
import app from '../../index';
import sizeOf from 'image-size';
import { promises as fs } from 'fs';
import path from 'path';

const request = supertest(app);
describe('Test middleware', () => {
    it('checks if error is thrown when the path does not lead to an image', async () => {
        const response = await request.get(
            '/api/images?filename=asdf&width=600&height=600'
        );

        expect(response.text).toEqual('File does not exist.');
    });

    it('checks if error is not thrown when the path does lead to an image', async () => {
        const response = await request.get(
            '/api/images?filename=argentina&width=600&height=600'
        );
        expect(response.text).not.toEqual('File does not exist.');

        fs.unlink(
            path.resolve(
                __dirname + '../../../../assets/thumb/argentina_thumb.jpg'
            )
        );
    });

    it('checks if image was processed correctly', async () => {
        await request.get(
            '/api/images?filename=argentina&width=600&height=600'
        );
        const dimensions = sizeOf(
            path.resolve(
                __dirname + '../../../../assets/thumb/argentina_thumb.jpg'
            )
        );

        fs.unlink(
            path.resolve(
                __dirname + '../../../../assets/thumb/argentina_thumb.jpg'
            )
        );
        expect(dimensions.width).toEqual(600);
        expect(dimensions.height).toEqual(600);
    });
});
