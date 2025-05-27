jest.mock('../internal/database', () => {
    return jest.fn(() => ({
        query: jest.fn(),
        end: jest.fn()
    }));
});

const request = require('supertest');
const express = require('express');
const testHelper = require("../helpers/TestHelper.js");
const database = require('../internal/database');
const productRouter = require("../routes/product");

const app = express();
app.use('/', productRouter);

describe('Product Route',() => {
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
            end: jest.fn()
        };
        database.mockReturnValue(mockDb);
    })

    it('POST / should return an error message', async () => {
        const response = await request(app).post('/');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({'error': 'Invalid Router'});
    })

    it('GET / should return error message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({'error': 'Invalid ProductID'});
    })

    it('GET /3 should return a product object for the productID:3', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.PRODUCT.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const response = await request(app).get('/:productId');
        expect(response.status).toBe(200);
        expect(typeof response.body === 'object').toBe(true);
    })

    it('GET /xyz should return a blank object', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.INVALID_PRODUCT.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const response = await request(app).get('/:productId');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({'error': 'Invalid ProductId'});
    })

})