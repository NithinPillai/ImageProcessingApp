import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('checks if /api/images/ has been connected to server', async () => {
        try {
            const response = await request.get('/api/images');
            expect(response.status).toBe(200);
        } catch (err) {
            console.log('error in indexSpecTesting');
        }
    });

    it('checks if /api/imags/ throws a 404 server connection error', async () => {
        try {
            const response = await request.get('/api/imags');
            expect(response.status).toBe(404);
        } catch (err) {
            console.log('error in indexSpecTesting');
        }
    });
});
