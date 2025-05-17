const request = require('supertest');
const express = require('express');
const pingTest = require('../routes/ping');
const testHelper = require("../helpers/TestHelper.js");

const app = express();
app.use('/', pingTest);

describe('Ping Router', () => {
    it('GET / Call to Ping Router', async () => {
        const res = await request(app).get('/');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(testHelper.get_mock_data(testHelper.mock_data_key.PING.name));
    });

    it('POST / Call to Ping Router', async () => {
        const res = await request(app).post('/');

        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual(testHelper.get_mock_data(testHelper.mock_data_key.UNAUTHORIZED.name));
    });
});
