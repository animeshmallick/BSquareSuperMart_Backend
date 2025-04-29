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
const categoriesRouter = require("../routes/categories");

const app = express();
app.use('/', categoriesRouter);

describe('Categories Route', () => {
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
            end: jest.fn()
        };
        database.mockReturnValue(mockDb);
    });

    it('GET / should return all categories grouped correctly', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.CATEGORIES.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(Object.keys(response.body).length > 0).toBe(true);
        expect(Array.isArray(response.body[Object.keys(response.body)[0]])).toBe(true);
    });

    it('POST / should return an error message', async () => {
        const response = await request(app).post('/');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid Router' });
    });
});
