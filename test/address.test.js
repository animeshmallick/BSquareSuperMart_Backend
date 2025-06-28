const express = require("express");
const address = require("../routes/address");
const database = require("../internal/database");
const request = require("supertest");
const testHelper = require("../helpers/TestHelper");
const token = require("../internal/token");

jest.mock('../internal/database', () => {
    return jest.fn(() => ({
        query: jest.fn(),
        end: jest.fn()
    }));
});

const app = express();
app.use(express.json());
app.use('/', address);

describe('Address Route', () => {
    let mockDb;
    beforeEach(() => {
        mockDb = {
            query: jest.fn(),
            end: jest.fn()
        };
        database.mockReturnValue(mockDb);
    });
    it('GET / should not return address without authToken', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(403);
        expect(response.body).toStrictEqual({"message": "Authorization Token Missing"});
    });

    it('GET / should return address with authToken of user without saved address', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.NO_ADDRESS_FOUND.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const authToken = token.getToken("test_user");
        const response = await request(app).get('/').set('x-authorization', `Bearer ${authToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("storeAddress");
        expect(response.body).toHaveProperty("userAddress");
        expect(response.body.userAddress.length).toBe(0);
    });

    it('GET / should return address with authToken of user without saved address', async () => {
        const mockData = testHelper.get_sql_mock_data(testHelper.mock_data_key.ADDRESS_FOUND.name);
        mockDb.query.mockImplementation((sql, callback) => callback(null, mockData));

        const authToken = token.getToken("test_user")
        const response = await request(app).get('/').set('x-authorization', `Bearer ${authToken}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("storeAddress");
        expect(response.body).toHaveProperty("userAddress");
        expect(response.body.userAddress.length).toBeGreaterThan(0);
        response.body.userAddress.forEach(address => expect(address).toHaveProperty("address_id"));
    });

    it('GET / should return an error if there is a database error', async () => {
        mockDb.query.mockImplementation((sql, callback) => callback(new Error('DB Error')));
        const authToken = token.getToken("test_user");
        const response = await request(app).get('/').set('x-authorization', `Bearer ${authToken}`);
        console.log(response.body);
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({error: "DB Error"});
    });
});