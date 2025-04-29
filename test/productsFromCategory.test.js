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
const productsFromCategoryRouter = require("../routes/productsFromCategory");

const app = express();
app.use('/', productsFromCategoryRouter);

describe('Products From Category Route', () => {
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
            end: jest.fn()
        };
        database.mockReturnValue(mockDb);
    });

    it('POST / should return an error message', async () => {
        const response = await request(app).post('/');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({'error': 'Invalid Router'});
    })

    it('GET /Dairy should return an array of products from the database grouped by category "Dairy"', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.PRODUCTS_FROM_CATEGORY.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const response = await request(app).get('/:category');

        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body).length > 0).toBe(true);
        expect(Array.isArray(response.body[Object.keys(response.body)[0]])).toBe(true);
    })

    it('GET / validate DB error', async () => {
        mockDb.query.mockImplementation((sql, callback) => callback(new Error('DB error')));

        const response = await request(app).get('/:category');

        expect(response.statusCode).toBe(500);
    })

    it('GET /xyz database returns blank array', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.PRODUCTS_WHEN_CATEGORY_INVALID.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const response = await request(app).get('/:category');

        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body).length).toEqual(0);
    })

    it('GET / Invalid call to DB', async () => {
        const response = await request(app).get('/');
        console.log(response.body);
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({error: "Invalid Category"});
    })
})