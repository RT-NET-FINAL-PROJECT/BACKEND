const request = require('supertest');
const app = require('../app');
const { User, Rt, sequelize } = require('../models');

describe('POST /users/register', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        await Rt.create({
            namaRt: 'RT 01'
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create new user and response with status code 201', async () => {
        const bodyData = {
            namaLengkap: 'Bondan Hertomo',
            nomorTelp: '987009900',
            status_keluarga: 'Kepala Keluarga',
            nomorKtp: '12323212',
            rt_id: 1,
            email: 'bondaa12@gmail.com',
            password: 'bondan123',
        };

        const response = await request(app).post('/users/register').send(bodyData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('email', bodyData.email);
        expect(response.body).toHaveProperty('role', 'Warga');
        expect(response.body).toHaveProperty('status', 'pending');
    });

    it('should response with error when rt not found', async () => {
        const bodyData = {
            namaLengkap: 'Bondan Hertomo',
            nomorTelp: '987009900',
            status_keluarga: 'Kepala Keluarga',
            nomorKtp: '12323212',
            rt_id: 9999,
            email: 'bondaa12@gmail.com',
            password: 'bondan123',
        };

        const response = await request(app).post('/users/register').send(bodyData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Rt not found');
    });

    it('should response with error when required data is missing', async () => {
        const bodyData = {
            namaLengkap: 'Bondan Hertomo',
            nomorTelp: '987009900',
            status_keluarga: 'Kepala Keluarga',
            nomorKtp: '12323212',
            rt_id: 1,
            password: 'bondan123',
        };

        const response = await request(app).post('/users/register').send(bodyData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Validation error: Email is required');
    });

    it('should response with error when email already registered', async () => {
        const bodyData = {
            namaLengkap: 'Bondan Hertomo',
            nomorTelp: '987009900',
            status_keluarga: 'Kepala Keluarga',
            nomorKtp: '12323212',
            rt_id: 1,
            email: 'bondaa12@gmail.com',
            password: 'bondan123',
        };

        const existingUser = await User.create({
            ...bodyData,
            role: 'Warga',
            status: 'active'
        });

        const response = await request(app).post('/users/register').send(bodyData);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Email is already registered');
    });
});
