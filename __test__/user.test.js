const request = require('supertest');
const app = require('../app');
const { User, Rt, sequelize, Post } = require('../models');

describe('API', () => {
    let token;
    let tokenRt;
    beforeAll(async () => {
        // await sequelize.sync({ force: true });
        // await Rt.create({
        //     kepala_rt: 'Bondan Herutomo',
        //     link_grup_wa: 'https://chat.whatsapp.com/Gumy5S3325g4aLMw5jT5A3',
        //     nik_rt: '120298',
        //     rt: '01',
        //     rw: '012',
        //     kelurahan: 'Bojong Pondok Terong',
        //     kecamatan: 'Cipayung',
        //     kotaKabupaten: 'Depok',
        //     provinsi: 'Jawa barat'
        // });
        
        // await Post.create({
        //     name: 'Updated Event',
        //     deskripsi: 'Deskripsi acara yang diupdate',
        //     kategori: 'Musik',
        //     rt_id :1,
        //     lokasi: 'Jakarta',
        //     biaya: 50000
        // })
        // await User.create({
        //     namaLengkap: 'John Doe',
        //     email: 'john.doe@example.com',
        //     password: 'password123',
        //     nomorKtp: '1234567890',
        //     rt_id: 1,
        //     role: 'Warga',
        //     status_keluarga: 'Kepala Keluarga',
        //     nomorTelp: '081234567890',
        //     status: 'pending',
        // });
        // await User.create({
        //     namaLengkap: 'Bondan',
        //     email: 'bondan@example.com',
        //     password: 'bondan123',
        //     nomorKtp: '120298',
        //     rt_id: 1,
        //     role: 'Warga',
        //     status_keluarga: 'Kepala Keluarga',
        //     nomorTelp: '0812345678970',
        //     status: 'approved',
        // });
        // await User.create({
        //     namaLengkap: 'Bondan',
        //     email: 'bondan@gmail.com',
        //     password: 'bondan123',
        //     nomorKtp: '120298',
        //     rt_id: 1,
        //     role: 'RT',
        //     status_keluarga: 'Kepala Keluarga',
        //     nomorTelp: '0812345678970',
        //     status: 'approved',
        // });
        // await User.create({
        //     namaLengkap: "admin",
        //     nomorTelp: "08123456789",
        //     nomorKtp: '1202989099',
        //     role: "Admin",
        //     rt_id: 1,
        //     email: "admin@admin.com",
        //     password: "admin123",
        //     status_keluarga: "Kepala Keluarga",
        //     status: "approved"
        // });
        // await User.create({
        //     namaLengkap: "admin",
        //     nomorTelp: "08123456789",
        //     nomorKtp: '1202989099',
        //     role: "Admin",
        //     rt_id: 1,
        //     email: 'admin@example.com',
        //     password: 'bondan123',
        //     status_keluarga: "Kepala Keluarga",
        //     status: "approved"
        // });
        
        const response = await request(app)
            .post('/rt/login')
            .send({
                email: 'admin@admin.com',
                password: 'admin123'
            });

        const loginRt = await request(app)
            .post('/rt/login')
            .send({
                email: 'bondan@gmail.com',
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
                    email: 'bondan@example.com',
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

    describe('POST /rt/login', () => { //LOGIN RT DONE
        it('should return success when account status is approve', async () => {
            const user = await User.create({
                namaLengkap: 'Bondan',
                email: 'bondan@yahoo.com',
                password: "password123",
                nomorKtp: '120298',
                rt_id: 1,
                role: 'RT',
                status_keluarga: 'Kepala Keluarga',
                nomorTelp: '08123456789',
                status: 'approved',
            });

            const response = await request(app)
                .post('/rt/login')
                .send({
                    email: user.email,
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('email', user.email);
            expect(response.body).toHaveProperty('userId', user.id);
        });


        it('should return success when account status is approve', async () => {
            const response = await request(app)
                .post('/rt/login')
                .send({
                    email: 'admin@example.com',
                    password: 'bondan123',
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
        });

        it('should return success sekretariat when account status is approve', async () => {
            const user = await User.create({
                namaLengkap: 'Bondan',
                email: 'bondan255@yahoo.com',
                password: "password123",
                nomorKtp: '120298',
                rt_id: 1,
                role: 'Sekretariat',
                status_keluarga: 'Kepala Keluarga',
                nomorTelp: '08123456789',
                status: 'approved',
            });

            const response = await request(app)
                .post('/rt/login')
                .send({
                    email: user.email,
                    password: 'password123',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('email', user.email);
            expect(response.body).toHaveProperty('userId', user.id);
        });

        it('should return error when warga login', async () => {
            const response = await request(app).post('/rt/login').send({
                email: 'bondan@example.com',
                password: 'bondan123',
            });

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('message', 'Anda tidak memiliki hak akses');
        });


        it('should return error when email is missing', async () => {
            const response = await request(app).post('/rt/login').send({
                password: 'password123',
            });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Email Dibutuhkan!');
        });


        it('should return error when password is missing', async () => {
            const response = await request(app).post('/rt/login').send({
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



    it('should register new RT account successfully', async () => { //REGISTER RT
        // Simulate a request body
        const rt = await Rt.findOne(); // Find any RT for testing
        const requestBody = {
            namaLengkap: 'Bondan',
            nomorTelp: '08123456789',
            email: 'testrt@example.com',
            password: 'testpassword',
            nomorKtp: rt.nik_rt
        };

        // Send POST request to register new RT account
        const response = await request(app)
            .post('/rt/register')
            .send(requestBody);

        // Check if response status code is 201 (Created)
        expect(response.status).toBe(201);

        // Check if response body contains the newly registered RT account details
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('namaLengkap', requestBody.namaLengkap);
        expect(response.body).toHaveProperty('email', requestBody.email);
        expect(response.body).toHaveProperty('nomorTelp', requestBody.nomorTelp);
        expect(response.body).toHaveProperty('nomorKtp', requestBody.nomorKtp);
        expect(response.body).toHaveProperty('rt_id', rt.id);
        expect(response.body).toHaveProperty('role', 'RT');
        expect(response.body).toHaveProperty('status', 'approved');
    });


    it('should return error when registering with unauthorized nik_rt', async () => {
        const response = await request(app)
            .post('/rt/register')
            .send({
                namaLengkap: 'John Doe',
                nomorTelp: '081234567890',
                email: 'johndoe@example.com',
                password: 'password123',
                nomorKtp: '1221314221',
            });

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message', 'Anda tidak memiliki hak akses');
    });

    describe('GET /rt', () => { //GET ALL RT TANPA NIK LINK WA
        it('should return all RTs', async () => {
            const response = await request(app).get('/rt');
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
            expect(response.body[0]).not.toHaveProperty('nik_rt');
            expect(response.body[0]).not.toHaveProperty('link_grup_wa');
        });
    });

    describe('registerSekretariat', () => {
        test('should register new sekretariat', async () => {
            const response = await request(app)
                .post('/sekretariat/register')
                .send({
                    namaLengkap: 'Sekretaris RT',
                    nomorTelp: '081234567890',
                    email: 'sekretaris@rt.com',
                    password: '123456',
                    nomorKtp: '1234567890123456'
                })
                .set('access_token', tokenRt);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('namaLengkap', 'Sekretaris RT');
            expect(response.body).toHaveProperty('nomorTelp', '081234567890');
            expect(response.body).toHaveProperty('email', 'sekretaris@rt.com');
            expect(response.body).toHaveProperty('nomorKtp', '1234567890123456');
            expect(response.body).toHaveProperty('role', 'Sekretariat');
        });


        it('Unauthorize ERROR', async () => {
            const response = await request(app)
                .post('/sekretariat/register')
                .send({
                    namaLengkap: 'John Doe',
                    nomorTelp: '081234567890',
                    email: 'johndoe@example.com',
                    password: 'password123',
                    nomorKtp: '1221314221',
                })
                .set('access_token', token);

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('message', 'Anda tidak memiliki hak akses');
        });

        it('ERROR 400 DATA TIDAK LENGKAP', async () => {
            const response = await request(app)
                .post('/sekretariat/register')
                .send({
                    nomorKtp: '1221314221',
                })
                .set('access_token', tokenRt);

            expect(response.status).toBe(400);
        });

        it('ERROR 401 INVALID TOKEN', async () => {
            const response = await request(app)
                .post('/sekretariat/register')
            expect(response.status).toBe(401);
        });
    })


    describe('GET /rt/users', () => { //GET ALL WARGA
        it('should return all Warga', async () => {
            const response = await request(app)
                .get('/rt/users')
                .set('access_token', tokenRt);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });

    });




    describe('POST /rt/users', () => {
        it('should create a new Warga', async () => {
            const response = await request(app)
                .post('/rt/users')
                .set('access_token', tokenRt)
                .send({
                    namaLengkap: 'John Doe',
                    nomorTelp: '081234567890',
                    email: 'john.doe@example.com',
                    password: 'password',
                    nomorKk: '1234567890123456',
                    nomorKtp: '1234567890123456',
                    status_keluarga: 'Kepala Keluarga',
                    kkImg: 'http://example.com/kk.jpg',
                    ktpImg: 'http://example.com/ktp.jpg',
                    photoUrl: 'http://example.com/photo.jpg',
                    aktaImg: 'http://example.com/akta.jpg',
                    agama: 'Islam',
                    jenis_kelamin: 'Laki-laki',
                    status_perkawinan: 'Belum Kawin',
                    pekerjaan: 'Wiraswasta',
                    tempat_lahir: 'Jakarta',
                    tanggal_lahir: '1990-01-01',
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('namaLengkap', 'John Doe');
            expect(response.body).toHaveProperty('nomorTelp', '081234567890');
            expect(response.body).toHaveProperty('email', 'john.doe@example.com');
            expect(response.body).toHaveProperty('nomorKk', '1234567890123456');
            expect(response.body).toHaveProperty('nomorKtp', '1234567890123456');
            expect(response.body).toHaveProperty('status_keluarga', 'Kepala Keluarga');
            expect(response.body).toHaveProperty('kkImg', 'http://example.com/kk.jpg');
            expect(response.body).toHaveProperty('ktpImg', 'http://example.com/ktp.jpg');
            expect(response.body).toHaveProperty('photoUrl', 'http://example.com/photo.jpg');
            expect(response.body).toHaveProperty('aktaImg', 'http://example.com/akta.jpg');
            expect(response.body).toHaveProperty('agama', 'Islam');
            expect(response.body).toHaveProperty('jenis_kelamin', 'Laki-laki');
            expect(response.body).toHaveProperty('status_perkawinan', 'Belum Kawin');
            expect(response.body).toHaveProperty('pekerjaan', 'Wiraswasta');
            expect(response.body).toHaveProperty('tempat_lahir', 'Jakarta');
            expect(response.body).toHaveProperty('tanggal_lahir', '1990-01-01T00:00:00.000Z');
        });

        it('ERROR 400 DATA KOSONG', async () => {
            const response = await request(app)
                .post('/rt/users')
                .set('access_token', tokenRt)
                .send({
                    namaLengkap: 'John Doe',
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /rt/users/:id', () => {
        it('should get a user by id', async () => {
            const user = await User.create({
                namaLengkap: 'John Doe',
                nomorTelp: '081234567890',
                email: 'johndoe@example.com',
                password: 'password',
                role: 'Warga',
                nomorKk: '1234567890',
                nomorKtp: '1234567890123456',
                status: 'approved',
                rt_id: 1,
                status_keluarga: 'Kepala Keluarga',
                kkImg: 'http://example.com/kk.jpg',
                ktpImg: 'http://example.com/ktp.jpg',
                photoUrl: 'http://example.com/photo.jpg',
                agama: 'Islam',
                jenis_kelamin: 'Laki-laki',
                status_perkawinan: 'Belum Kawin',
                pekerjaan: 'PNS',
                tempat_lahir: 'Jakarta',
                tanggal_lahir: '1990-01-01'
            });

            const response = await request(app)
                .get(`/rt/users/${user.id}`)
                .set('access_token', tokenRt);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('namaLengkap', 'John Doe');
            expect(response.body).toHaveProperty('nomorTelp', '081234567890');
            expect(response.body).toHaveProperty('email', 'johndoe@example.com');
            expect(response.body).toHaveProperty('role', 'Warga');
            expect(response.body).toHaveProperty('status', 'approved');
            expect(response.body).toHaveProperty('rt_id', 1);
            expect(response.body).toHaveProperty('status_keluarga', 'Kepala Keluarga');
            expect(response.body).toHaveProperty('kkImg', 'http://example.com/kk.jpg');
            expect(response.body).toHaveProperty('ktpImg', 'http://example.com/ktp.jpg');
            expect(response.body).toHaveProperty('photoUrl', 'http://example.com/photo.jpg');
            expect(response.body).toHaveProperty('agama', 'Islam');
            expect(response.body).toHaveProperty('jenis_kelamin', 'Laki-laki');
            expect(response.body).toHaveProperty('status_perkawinan', 'Belum Kawin');
            expect(response.body).toHaveProperty('pekerjaan', 'PNS');
            expect(response.body).toHaveProperty('tempat_lahir', 'Jakarta');
            expect(response.body).toHaveProperty('tanggal_lahir', '1990-01-01T00:00:00.000Z');
        });
    });


    describe('PUT /rt/users/:id', () => {
        it('should update user profile', async () => {
            // membuat user baru untuk diupdate
            const newUser = await User.create({
                namaLengkap: 'John Doe',
                nomorTelp: '081234567890',
                email: 'johndoe@example.com',
                nomorKk: '1234567890',
                nomorKtp: '0987654321',
                password: "123",
                role: "Warga",
                rt_id: 1,
                status_keluarga: 'Kepala Keluarga',
                kkImg: 'http://example.com/kk.jpg',
                ktpImg: 'http://example.com/ktp.jpg',
                photoUrl: 'http://example.com/photo.jpg',
                agama: 'Islam',
                jenis_kelamin: 'Laki-laki',
                status_perkawinan: 'Belum Menikah',
                pekerjaan: 'Mahasiswa',
                tempat_lahir: 'Jakarta',
                tanggal_lahir: '1999-01-01T00:00:00.000Z',
            });

            const response = await request(app)
                .put(`/rt/users/${newUser.id}`)
                .set('access_token', tokenRt)
                .send({
                    namaLengkap: 'Jane Doe',
                    nomorTelp: '081234567891',
                    email: 'janedoe@example.com',
                    nomorKk: '123456097890',
                    nomorKtp: '09876854321',
                    password: "123",
                    role: "Warga",
                    rt_id: 1,
                    status_keluarga: 'Anggota Keluarga',
                    kkImg: 'http://example.com/new-kk.jpg',
                    ktpImg: 'http://example.com/new-ktp.jpg',
                    photoUrl: 'http://example.com/new-photo.jpg',
                    agama: 'Kristen',
                    jenis_kelamin: 'Perempuan',
                    status_perkawinan: 'Menikah',
                    pekerjaan: 'Wiraswasta',
                    tempat_lahir: 'Bandung',
                    tanggal_lahir: '1995-01-01T00:00:00.000Z',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Success to update Profile');

            // memastikan data user telah diupdate
            const updatedUser = await User.findByPk(newUser.id);
            expect(updatedUser.namaLengkap).toBe('Jane Doe');
            expect(updatedUser.nomorTelp).toBe('081234567891');
            expect(updatedUser.email).toBe('janedoe@example.com');
            expect(updatedUser.nomorKk).toBe('123456097890');
            expect(updatedUser.nomorKtp).toBe('09876854321');
            expect(updatedUser.status_keluarga).toBe('Anggota Keluarga');
            expect(updatedUser.kkImg).toBe('http://example.com/new-kk.jpg');
            expect(updatedUser.ktpImg).toBe('http://example.com/new-ktp.jpg');
            expect(updatedUser.photoUrl).toBe('http://example.com/new-photo.jpg');
            expect(updatedUser.agama).toBe('Kristen');
            expect(updatedUser.jenis_kelamin).toBe('Perempuan');
            expect(updatedUser.status_perkawinan).toBe('Menikah');
            expect(updatedUser.pekerjaan).toBe('Wiraswasta');
            expect(updatedUser.tempat_lahir).toBe('Bandung');
            expect(updatedUser.tanggal_lahir.toISOString()).toBe('1995-01-01T00:00:00.000Z');
        });

        it('suser not found', async () => {
            // membuat user baru untuk diupdate
            const response = await request(app)
                .put(`/rt/users/${88888}`)
                .set('access_token', tokenRt)
                .send({
                    namaLengkap: 'Jane Doe',
                    nomorTelp: '081234567891',
                    email: 'janedoe@example.com',
                    nomorKk: '123456097890',
                    nomorKtp: '09876854321',
                    password: "123",
                    role: "Warga",
                    rt_id: 1,
                    status_keluarga: 'Anggota Keluarga',
                });
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'RT Tidak ditemukan');
        });

    });

    describe('DELETE /rt/users/:id', () => {
        it('should delete user by id', async () => {
            const response = await request(app)
                .delete(`/rt/users/${1}`)
                .set('access_token', tokenRt);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe(`Data warga dengan id ${1} berhasil dihapus`);
        });

        it('should return UserNotFound error when user ID is not valid', async () => {
            const response = await request(app)
                .delete(`/rt/users/${999999}`)
                .set('access_token', tokenRt);

            expect(response.status).toBe(404);
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
