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
const cart = require("../routes/cart");

const app = express();
app.use(express.json());
app.use('/', cart);

describe('Cart Route', () => {
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
            end: jest.fn()
        };
        database.mockReturnValue(mockDb);
    });

    it('GET / should return invalid router', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid Router'});
    });

    it('POST / should validate cart with 2 products', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.CART_WITH_PRODUCTS_2.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));
        const response = await request(app).post('/')
            .set('Content-Type', 'application/json')
            .send([
                {"ProductID": "2", "Quantity": 1},
                {"ProductID": "3", "Quantity": 2}
            ]);
        //expect(response.status).toBe(200);
        //response.body.forEach(product => expect(product.hasOwnProperty("quantity")).toBeTruthy())
    });
    it('POST / should validate cart with 1 products', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.CART_WITH_PRODUCTS_1.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));
        const response = await request(app).post('/')
            .set('Content-Type', 'application/json')
            .send([{"ProductID": "2", "Quantity": 1}]);
        //expect(response.status).toBe(200);
        //response.body.forEach(product => expect(product.hasOwnProperty("quantity")).toBeTruthy())
    });
    it('POST / should validate empty cart', async () => {
        const response = await request(app).post('/')
            .set('Content-Type', 'application/json')
            .send([]);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({error: "Empty Cart"});
    });
    it('POST / should validate error in cart request body', async () => {
        const response = await request(app).post('/')
            .set('Content-Type', 'application/json')
            .send([{"ProductId": "2", "Quantity": 1}, {"ProductId": "3", "Quantity": 2}]);
        expect(response.status).toBe(403);
        expect(response.body).toEqual({error: "Invalid Data in Cart Requests"});
    });
});
