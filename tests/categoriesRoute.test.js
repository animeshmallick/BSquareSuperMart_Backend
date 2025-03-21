const request = require('supertest');
const app = require('../app');

function allValuesAreArray(result) {
    return Object.values(result).every(value => Array.isArray(value) && value.length > 0);
}

describe('Categories Route', () => {
    it('should return all categories', async () => {
        const response = await request(app).get('/categories');
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBeGreaterThan(0);
        expect(allValuesAreArray(response.body)).toBe(true);
    });
});