const request = require('supertest');
const app = require('../app');
const { User, Rt, sequelize, Post } = require('../models');

const userRt = {
    email: "bondanherutomo35@gmail.com",
    password: "bondan123",
};

const userWarga = {
    email: "oldtoon18@gmail.com",
    password: "heru123",
}

describe('API', () => {
    let token;
    let tokenRt;
    beforeAll(async () => {
        const response = await request(app)
            .post('/rt/login')
            .send();

        const loginRt = await request(app).post('/rt/login').send({
                email: 'bondanherutomo35@gmail.com',
                password: 'bondan123'
            });
        token = response.body.access_token;
        tokenRt = loginRt.body.access_token;
    });

    describe('POST /login', () => { //LOGIN USER DONE

        it('should return success when account status is approve', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    email: 'bondanherutomo35@gmail.com',
                    password: 'bondan123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
        });

        it('should return error when account status is pending', async () => {
            const response = await request(app).post('/login').send({
                email: 'john.doe@example.com',
                password: 'password123',
            });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", 'Akun Sedang Menunggu Persetujuan RT');
        });

        it('should return error when email is missing', async () => {
            const response = await request(app).post('/login').send({
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Email Dibutuhkan!');
        });
        it('should return error when password is missing', async () => {
            const response = await request(app).post('/login').send({
                email: "bondanherutomo35@gmail.com"
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Password Dibutuhkan!');
        });
        it('should return error when email or password is invalid', async () => {
            const response = await request(app).post('/login').send({
                email: "john.doexample.com",
                password: 'password12',
            });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Email/Password Salah!');
        });
    });

    describe('POST /users/register', () => { //REGISTER USER
        it('REGISTER SUKSES', async () => {
            const user = {
                namaLengkap: "John Doe",
                nomorTelp: "08123456789",
                email: "john.doe@example.com",
                password: "password123",
                nomorKtp: "1234567890123456",
                status_keluarga: "Kepala Keluarga",
                rt_id: 1,
            };

            const response = await request(app).post("/users/register").send(user);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("user");
            expect(response.body.user).toHaveProperty("id");
            expect(response.body.user).toHaveProperty("namaLengkap", user.namaLengkap);
            expect(response.body.user).toHaveProperty("nomorTelp", user.nomorTelp);
            expect(response.body.user).toHaveProperty("email", user.email);
            expect(response.body.user).toHaveProperty("nomorKtp", user.nomorKtp);
            expect(response.body.user).toHaveProperty("status_keluarga", user.status_keluarga);
            expect(response.body.user).toHaveProperty("rt_id", user.rt_id);
            expect(response.body.user).toHaveProperty("role", "Warga");
            expect(response.body.user).toHaveProperty("status", "pending");
            expect(response.body).toHaveProperty("submission");
            expect(response.body.submission).toHaveProperty("id");
            expect(response.body.submission).toHaveProperty("user_id", response.body.user.id);
            expect(response.body.submission).toHaveProperty("rt_id", user.rt_id);
            expect(response.body.submission).toHaveProperty("keterangan", "Register Warga");
            expect(response.body.submission).toHaveProperty("status", "pending");
        });
        it("should return error when rt_id is not found", async () => {
            const user = {
                namaLengkap: "John Doe",
                nomorTelp: "08123456789",
                email: "john.doe@example.com",
                password: "password123",
                nomorKtp: "1234567890123456",
                status_keluarga: "Kepala Keluarga",
                rt_id: 999,
            };
            const response = await request(app).post("/users/register").send(user);
            expect(response.status).toBe(404);

        })

        it("ERROR 400 DATA KOSONG", async () => {
            const user = {
                namaLengkap: "John Doe",
            };
            const response = await request(app).post("/users/register").send(user);
            expect(response.status).toBe(404);

        })
    });

    describe('POST /admin/register', () => { //MENDAFTARKAN ADMIN DONE

        test('Should create new RT data', async () => {
            console.log("token: ", token);
            const response = await request(app)
                .post('/admin/register')
                .set('access_token', token) // Use 'access-token' instead of 'Authorization'
                .send({
                    kepala_rt: 'John Doe',
                    nik_rt: '1234567890123456',
                    rt: '001',
                    rw: '002',
                    kelurahan: 'Menteng',
                    kecamatan: 'Menteng',
                    kotaKabupaten: 'Jakarta Pusat',
                    provinsi: 'DKI Jakarta',
                    link_grup_wa: 'https://chat.whatsapp.com/xxxxxxxxxxxxxx'
                });

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('kepala_rt', 'John Doe');
            expect(response.body).toHaveProperty('rt', '001');
            expect(response.body).toHaveProperty('rw', '002');
            expect(response.body).toHaveProperty('kelurahan', 'Menteng');
            expect(response.body).toHaveProperty('kecamatan', 'Menteng');
            expect(response.body).toHaveProperty('kotaKabupaten', 'Jakarta Pusat');
            expect(response.body).toHaveProperty('provinsi', 'DKI Jakarta');
            expect(response.body).toHaveProperty('link_grup_wa', 'https://chat.whatsapp.com/xxxxxxxxxxxxxx');

        });


        it('Should return 401 if token is not provided', async () => {//ERROR 401
            const response = await request(app)
                .post('/admin/register')
                .send({
                    kepala_rt: 'John Doe',
                    nik_rt: '1234567890123456',
                    rt: '001',
                    rw: '002',
                    kelurahan: 'Menteng',
                    kecamatan: 'Menteng',
                    kotaKabupaten: 'Jakarta Pusat',
                    provinsi: 'DKI Jakarta',
                    link_grup_wa: 'https://chat.whatsapp.com/xxxxxxxxxxxxxx'
                });

            expect(response.statusCode).toBe(401);
        });

        it('Should return 403 if user is not authorized', async () => {//KALO PAKE TOKEN RT ERROR
            const response = await request(app)
                .post('/admin/register')
                .send({
                    kepala_rt: 'John Doe',
                    nik_rt: '1234567890123456',
                    rt: '001',
                    rw: '002',
                    kelurahan: 'Menteng',
                    kecamatan: 'Menteng',
                    kotaKabupaten: 'Jakarta Pusat',
                    provinsi: 'DKI Jakarta',
                    link_grup_wa: 'https://chat.whatsapp.com/xxxxxxxxxxxxxx'
                })
                .set('access_token', tokenRt);

            expect(response.statusCode).toBe(403);
        });

        it('Should return 400 if required fields are missing', async () => {
            const response = await request(app)
                .post('/admin/register')
                .send({
                    nik_rt: '1234567890123456',
                    rw: '002',
                    kelurahan: 'Menteng',
                    kecamatan: 'Menteng',
                    kotaKabupaten: 'Jakarta Pusat',
                    provinsi: 'DKI Jakarta',
                    link_grup_wa: 'https://chat.whatsapp.com/xxxxxxxxxxxxxx'
                })
                .set('access_token', token);

            expect(response.status).toBe(400);
        });
    });

    /// TDD EVENT
    describe('GET /event', () => { //GET ALL EVENT KELAR 
        it('should return all events', async () => {

            const event1 = await Post.create({
                name: 'Event 1',
                deskripsi: 'Deskripsi Event 1',
                kategori: 'event',
                rt_id: 1,
            });

            const event2 = await Post.create({
                name: 'Event 2',
                deskripsi: 'Deskripsi Event 2',
                kategori: 'event',
                rt_id: 1,
            });

            const response = await request(app)
                .get('/event')
                .set('access_token', tokenRt);

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0].name).toBe(event1.name);
            expect(response.body[1].deskripsi).toBe(event2.deskripsi);
        });


        it('should return all Post', async () => {

            const event1 = await Post.create({
                name: 'Event 1',
                deskripsi: 'Deskripsi Event 1',
                kategori: 'event',
                rt_id: 1,
            });

            const response = await request(app)
                .get('/posts')
                .set('access_token', tokenRt);

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe(event1.name);
        });


        it('should return all Pengumuman', async () => { //PENGUMUMAN DONE

            const event1 = await Post.create({
                name: 'Event 1',
                deskripsi: 'Deskripsi Event 1',
                kategori: 'pengumuman',
                rt_id: 1,
            });

            const response = await request(app)
                .get('/pengumuman')
                .set('access_token', tokenRt);

            expect(response.status).toBe(200);
            expect(response.body[0].name).toBe(event1.name);
        });

        ///CREATE EVENTTT

        describe('Event creation endpoint', () => {
            describe('POST /event', () => {
                it('should create a new event', async () => {
                    const newEvent = {
                        name: 'Test Event',
                        deskripsi: 'Ini adalah deskripsi test event',
                        kategori: 'event',
                        lokasi: 'Lokasi test event',
                        biaya: 100000,
                    };

                    const response = await request(app)
                        .post('/event')
                        .set('access_token', tokenRt)
                        .send(newEvent)
                        .expect(201);

                    expect(response.body).toHaveProperty('id');
                    expect(response.body.name).toEqual(newEvent.name);
                    expect(response.body.deskripsi).toEqual(newEvent.deskripsi);
                    expect(response.body.kategori).toEqual(newEvent.kategori);
                    expect(response.body.lokasi).toEqual(newEvent.lokasi);
                    expect(response.body.biaya).toEqual(newEvent.biaya);
                }, 10000);

                it('should return 400 if missing required fields', async () => {
                    const newEvent = {
                        name: 'Test Event',
                        deskripsi: 'Ini adalah deskripsi test event',
                        kategori: 'event',
                        lokasi: 'Lokasi test event',
                    };

                    const response = await request(app)
                        .post('/event')
                        .set('access_token', tokenRt)
                        .send(newEvent)
                        .expect(400);

                    expect(response.body).toHaveProperty('message', 'Fields required');
                });
            });
        });

        //UPDATE EVENT/POST
        describe('POST /event/:id', () => {
            it('should return status 200 and a success message', async () => {
                const response = await request(app)
                    .post(`/event/${1}`)
                    .set('access_token', tokenRt)
                    .send({
                        name: 'Updated Event',
                        deskripsi: 'Deskripsi acara yang diupdate',
                        kategori: 'Musik',
                        lokasi: 'Jakarta',
                        biaya: 50000
                    });

                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Event with id 1 has ben updated');
            });

            it('should return status 400 for missing input', async () => {
                const response = await request(app)
                    .post(`/event/${1}`)
                    .set('access_token', tokenRt)
                    .send({
                        name: '',
                        deskripsi: '',
                        kategori: '',
                        lokasi: '',
                        biaya: ''
                    });

                expect(response.status).toBe(400);
            });

            it('should return status 404 for non-existent post', async () => {
                const response = await request(app)
                    .post(`/event/${19999}`)
                    .set('access_token', tokenRt)
                    .send({
                        name: 'Updated Event',
                        deskripsi: 'Deskripsi acara yang diupdate',
                        kategori: 'Musik',
                        lokasi: 'Jakarta',
                        biaya: 50000
                    });

                expect(response.status).toBe(404);
            });
        });

    });

});

// afterAll(async () => {
//     await sequelize.close();
// });
