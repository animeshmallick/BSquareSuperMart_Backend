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
const similarProductsRouter = require("../routes/similarProducts");

const app = express();
app.use('/', similarProductsRouter);

//ToDo: Complete the tests

describe('Similar Products Route',() => {
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
    //
    // it('GET / should return error message', async () => {
    //     const response = await request(app).get('/');
    //     expect(response.status).toBe(400);
    //     expect(response.body).toEqual({'error': 'Invalid Router'});
    // })
    //
    // it('GET /3 should return an array with products similar to productID:3', async () => {
    //     const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.SIMILAR_PRODUCTS.name);
    //     mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));
    //
    //     const response = await request(app).get('/:productId');
    //     expect(response.status).toBe(200);
    //     expect(response.length).toBe(4);
    //     response.forEach((item) => {
    //         expect(item.productId).not.toBe(null);
    //     })
    // })

    // it('GET /xyz should return a blank array', async () => {
    //     const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.INVALID_PRODUCT.name);
    //     mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));
    //
    //     const response = await request(app).get('/:productId');
    //     expect(response.status).toBe(200);
    //     expect(Object.keys(response.body).length).toEqual(0);
    // })
})