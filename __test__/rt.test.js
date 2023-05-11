const request = require("supertest");
const app = require("../app");

const userRt = {
    email: "bondanherutomo35@gmail.com",
    password: "bondan123",
};

const userWarga = {
    email: "oldtoon18@gmail.com",
    password: "heru123",
}

const rtRegister = {
    namaLengkap: 'Bondan',
    email: 'bondan@yahoo.com',
    password: "password123",
    nomorKtp: '120298',
    rt_id: 1,
    role: 'RT',
    status_keluarga: 'Kepala Keluarga',
    nomorTelp: '08123456789',
    status: 'approved',
};

describe("RT testing", () => {
    describe('POST /rt/login', () => { //LOGIN RT DONE
        it('should return success when account status is approve', async () => {

            const response = await request(app).post('/rt/login').send(userRt);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('email', expect.any(String));
            expect(response.body).toHaveProperty('userId', expect.any(Number));
        });
    
    
        it('should return success when account status is approve', async () => {
            const salahPassword = {
                email: 'bondanherutomo35@gmail.com',
                password: 'bondan123',
            }

            const response = await request(app).post('/rt/login').send(salahPassword);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token', expect.any(String));
        });
    
    
        it('should return error when warga login', async () => {
            const response = await request(app).post('/rt/login').send(userWarga);
    
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
    // });
    
    it('should register new RT account successfully', async () => { //REGISTER RT
        // Simulate a request body
        const requestBody = {
            namaLengkap: 'Bondan',
            nomorTelp: '08625176351',
            email: 'testrt@example.com',
            password: 'testpassword',
            nomorKtp: "120298"
        };
    
        // Send POST request to register new RT account
        const response = await request(app).post('/rt/register').send(requestBody);
    
        // Check if response status code is 201 (Created)
        expect(response.status).toBe(201);
        // Check if response body contains the newly registered RT account details
        expect(response.body).toHaveProperty('id', expect.any(Number));
        expect(response.body).toHaveProperty('namaLengkap', expect.any(String));
        expect(response.body).toHaveProperty('email', expect.any(String));
        expect(response.body).toHaveProperty('nomorTelp', expect.any(String));
        expect(response.body).toHaveProperty('nomorKtp', expect.any(String));
        expect(response.body).toHaveProperty('rt_id', expect.any(Number));
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
    
    // describe('GET /rt', () => { //GET ALL RT TANPA NIK LINK WA
    //     it('should return all RTs', async () => {
    //         const response = await request(app).get('/rt');
    //         expect(response.status).toBe(200);
    //         expect(response.body).toBeInstanceOf(Array);
    //         expect(response.body.length).toBeGreaterThan(0);
    //         expect(response.body[0]).not.toHaveProperty('nik_rt');
    //         expect(response.body[0]).not.toHaveProperty('link_grup_wa');
    //     });
    // });
    
    // describe('registerSekretariat', () => {
    //     test('should register new sekretariat', async () => {
    //         const response = await request(app)
    //             .post('/sekretariat/register')
    //             .send({
    //                 namaLengkap: 'Sekretaris RT',
    //                 nomorTelp: '081234567890',
    //                 email: 'sekretaris@rt.com',
    //                 password: '123456',
    //                 nomorKtp: '1234567890123456'
    //             })
    //             .set('access_token', tokenRt);
    
    //         expect(response.status).toBe(201);
    //         expect(response.body).toHaveProperty('namaLengkap', 'Sekretaris RT');
    //         expect(response.body).toHaveProperty('nomorTelp', '081234567890');
    //         expect(response.body).toHaveProperty('email', 'sekretaris@rt.com');
    //         expect(response.body).toHaveProperty('nomorKtp', '1234567890123456');
    //         expect(response.body).toHaveProperty('role', 'Sekretariat');
    //     });
    
    //     it('Unauthorize ERROR', async () => {
    //         const response = await request(app)
    //             .post('/sekretariat/register')
    //             .send({
    //                 namaLengkap: 'John Doe',
    //                 nomorTelp: '081234567890',
    //                 email: 'johndoe@example.com',
    //                 password: 'password123',
    //                 nomorKtp: '1221314221',
    //             })
    //             .set('access_token', token);
    
    //         expect(response.status).toBe(403);
    //         expect(response.body).toHaveProperty('message', 'Anda tidak memiliki hak akses');
    //     });
    
    //     it('ERROR 400 DATA TIDAK LENGKAP', async () => {
    //         const response = await request(app)
    //             .post('/sekretariat/register')
    //             .send({
    //                 nomorKtp: '1221314221',
    //             })
    //             .set('access_token', tokenRt);
    
    //         expect(response.status).toBe(400);
    //     });
    
    //     it('ERROR 401 INVALID TOKEN', async () => {
    //         const response = await request(app)
    //             .post('/sekretariat/register')
    //         expect(response.status).toBe(401);
    //     });
    // })
    
    
    // describe('GET /rt/users', () => { //GET ALL WARGA
    //     it('should return all Warga', async () => {
    //         const response = await request(app)
    //             .get('/rt/users')
    //             .set('access_token', tokenRt);
    //         expect(response.status).toBe(200);
    //         expect(response.body).toBeInstanceOf(Object);
    //     });
    
    // });
    
    // describe('POST /rt/users', () => {
    //     it('should create a new Warga', async () => {
    //         const response = await request(app)
    //             .post('/rt/users')
    //             .set('access_token', tokenRt)
    //             .send({
    //                 namaLengkap: 'John Doe',
    //                 nomorTelp: '081234567890',
    //                 email: 'john.doe@example.com',
    //                 password: 'password',
    //                 nomorKk: '1234567890123456',
    //                 nomorKtp: '1234567890123456',
    //                 status_keluarga: 'Kepala Keluarga',
    //                 kkImg: 'http://example.com/kk.jpg',
    //                 ktpImg: 'http://example.com/ktp.jpg',
    //                 photoUrl: 'http://example.com/photo.jpg',
    //                 aktaImg: 'http://example.com/akta.jpg',
    //                 agama: 'Islam',
    //                 jenis_kelamin: 'Laki-laki',
    //                 status_perkawinan: 'Belum Kawin',
    //                 pekerjaan: 'Wiraswasta',
    //                 tempat_lahir: 'Jakarta',
    //                 tanggal_lahir: '1990-01-01',
    //             });
    
    //         expect(response.status).toBe(201);
    //         expect(response.body).toHaveProperty('namaLengkap', 'John Doe');
    //         expect(response.body).toHaveProperty('nomorTelp', '081234567890');
    //         expect(response.body).toHaveProperty('email', 'john.doe@example.com');
    //         expect(response.body).toHaveProperty('nomorKk', '1234567890123456');
    //         expect(response.body).toHaveProperty('nomorKtp', '1234567890123456');
    //         expect(response.body).toHaveProperty('status_keluarga', 'Kepala Keluarga');
    //         expect(response.body).toHaveProperty('kkImg', 'http://example.com/kk.jpg');
    //         expect(response.body).toHaveProperty('ktpImg', 'http://example.com/ktp.jpg');
    //         expect(response.body).toHaveProperty('photoUrl', 'http://example.com/photo.jpg');
    //         expect(response.body).toHaveProperty('aktaImg', 'http://example.com/akta.jpg');
    //         expect(response.body).toHaveProperty('agama', 'Islam');
    //         expect(response.body).toHaveProperty('jenis_kelamin', 'Laki-laki');
    //         expect(response.body).toHaveProperty('status_perkawinan', 'Belum Kawin');
    //         expect(response.body).toHaveProperty('pekerjaan', 'Wiraswasta');
    //         expect(response.body).toHaveProperty('tempat_lahir', 'Jakarta');
    //         expect(response.body).toHaveProperty('tanggal_lahir', '1990-01-01T00:00:00.000Z');
    //     });
    
    //     it('ERROR 400 DATA KOSONG', async () => {
    //         const response = await request(app)
    //             .post('/rt/users')
    //             .set('access_token', tokenRt)
    //             .send({
    //                 namaLengkap: 'John Doe',
    //             });
    
    //         expect(response.status).toBe(400);
    //     });
    // });
    
    // describe('GET /rt/users/:id', () => {
    //     it('should get a user by id', async () => {
    //         const user = await User.create({
    //             namaLengkap: 'John Doe',
    //             nomorTelp: '081234567890',
    //             email: 'johndoe@example.com',
    //             password: 'password',
    //             role: 'Warga',
    //             nomorKk: '1234567890',
    //             nomorKtp: '1234567890123456',
    //             status: 'approved',
    //             rt_id: 1,
    //             status_keluarga: 'Kepala Keluarga',
    //             kkImg: 'http://example.com/kk.jpg',
    //             ktpImg: 'http://example.com/ktp.jpg',
    //             photoUrl: 'http://example.com/photo.jpg',
    //             agama: 'Islam',
    //             jenis_kelamin: 'Laki-laki',
    //             status_perkawinan: 'Belum Kawin',
    //             pekerjaan: 'PNS',
    //             tempat_lahir: 'Jakarta',
    //             tanggal_lahir: '1990-01-01'
    //         });
    
    //         const response = await request(app)
    //             .get(`/rt/users/${user.id}`)
    //             .set('access_token', tokenRt);
    
    //         expect(response.status).toBe(200);
    //         expect(response.body).toHaveProperty('namaLengkap', 'John Doe');
    //         expect(response.body).toHaveProperty('nomorTelp', '081234567890');
    //         expect(response.body).toHaveProperty('email', 'johndoe@example.com');
    //         expect(response.body).toHaveProperty('role', 'Warga');
    //         expect(response.body).toHaveProperty('status', 'approved');
    //         expect(response.body).toHaveProperty('rt_id', 1);
    //         expect(response.body).toHaveProperty('status_keluarga', 'Kepala Keluarga');
    //         expect(response.body).toHaveProperty('kkImg', 'http://example.com/kk.jpg');
    //         expect(response.body).toHaveProperty('ktpImg', 'http://example.com/ktp.jpg');
    //         expect(response.body).toHaveProperty('photoUrl', 'http://example.com/photo.jpg');
    //         expect(response.body).toHaveProperty('agama', 'Islam');
    //         expect(response.body).toHaveProperty('jenis_kelamin', 'Laki-laki');
    //         expect(response.body).toHaveProperty('status_perkawinan', 'Belum Kawin');
    //         expect(response.body).toHaveProperty('pekerjaan', 'PNS');
    //         expect(response.body).toHaveProperty('tempat_lahir', 'Jakarta');
    //         expect(response.body).toHaveProperty('tanggal_lahir', '1990-01-01T00:00:00.000Z');
    //     });
    // });    
    
    // describe('PUT /rt/users/:id', () => {
    //     it('should update user profile', async () => {
    //         // membuat user baru untuk diupdate
    //         const newUser = await User.create({
    //             namaLengkap: 'John Doe',
    //             nomorTelp: '081234567890',
    //             email: 'johndoe@example.com',
    //             nomorKk: '1234567890',
    //             nomorKtp: '0987654321',
    //             password: "123",
    //             role: "Warga",
    //             rt_id: 1,
    //             status_keluarga: 'Kepala Keluarga',
    //             kkImg: 'http://example.com/kk.jpg',
    //             ktpImg: 'http://example.com/ktp.jpg',
    //             photoUrl: 'http://example.com/photo.jpg',
    //             agama: 'Islam',
    //             jenis_kelamin: 'Laki-laki',
    //             status_perkawinan: 'Belum Menikah',
    //             pekerjaan: 'Mahasiswa',
    //             tempat_lahir: 'Jakarta',
    //             tanggal_lahir: '1999-01-01T00:00:00.000Z',
    //         });
    
    //         const response = await request(app)
    //             .put(`/rt/users/${newUser.id}`)
    //             .set('access_token', tokenRt)
    //             .send({
    //                 namaLengkap: 'Jane Doe',
    //                 nomorTelp: '081234567891',
    //                 email: 'janedoe@example.com',
    //                 nomorKk: '123456097890',
    //                 nomorKtp: '09876854321',
    //                 password: "123",
    //                 role: "Warga",
    //                 rt_id: 1,
    //                 status_keluarga: 'Anggota Keluarga',
    //                 kkImg: 'http://example.com/new-kk.jpg',
    //                 ktpImg: 'http://example.com/new-ktp.jpg',
    //                 photoUrl: 'http://example.com/new-photo.jpg',
    //                 agama: 'Kristen',
    //                 jenis_kelamin: 'Perempuan',
    //                 status_perkawinan: 'Menikah',
    //                 pekerjaan: 'Wiraswasta',
    //                 tempat_lahir: 'Bandung',
    //                 tanggal_lahir: '1995-01-01T00:00:00.000Z',
    //             });
    
    //         expect(response.status).toBe(201);
    //         expect(response.body.message).toBe('Success to update Profile');
    
    //         // memastikan data user telah diupdate
    //         const updatedUser = await User.findByPk(newUser.id);
    //         expect(updatedUser.namaLengkap).toBe('Jane Doe');
    //         expect(updatedUser.nomorTelp).toBe('081234567891');
    //         expect(updatedUser.email).toBe('janedoe@example.com');
    //         expect(updatedUser.nomorKk).toBe('123456097890');
    //         expect(updatedUser.nomorKtp).toBe('09876854321');
    //         expect(updatedUser.status_keluarga).toBe('Anggota Keluarga');
    //         expect(updatedUser.kkImg).toBe('http://example.com/new-kk.jpg');
    //         expect(updatedUser.ktpImg).toBe('http://example.com/new-ktp.jpg');
    //         expect(updatedUser.photoUrl).toBe('http://example.com/new-photo.jpg');
    //         expect(updatedUser.agama).toBe('Kristen');
    //         expect(updatedUser.jenis_kelamin).toBe('Perempuan');
    //         expect(updatedUser.status_perkawinan).toBe('Menikah');
    //         expect(updatedUser.pekerjaan).toBe('Wiraswasta');
    //         expect(updatedUser.tempat_lahir).toBe('Bandung');
    //         expect(updatedUser.tanggal_lahir.toISOString()).toBe('1995-01-01T00:00:00.000Z');
    //     });
    
    //     it('suser not found', async () => {
    //         // membuat user baru untuk diupdate
    //         const response = await request(app)
    //             .put(`/rt/users/${88888}`)
    //             .set('access_token', tokenRt)
    //             .send({
    //                 namaLengkap: 'Jane Doe',
    //                 nomorTelp: '081234567891',
    //                 email: 'janedoe@example.com',
    //                 nomorKk: '123456097890',
    //                 nomorKtp: '09876854321',
    //                 password: "123",
    //                 role: "Warga",
    //                 rt_id: 1,
    //                 status_keluarga: 'Anggota Keluarga',
    //             });
    //         expect(response.status).toBe(404);
    //         expect(response.body).toHaveProperty('message', 'RT Tidak ditemukan');
    //     });
    
    // });
    
    // describe('DELETE /rt/users/:id', () => {
    //     it('should delete user by id', async () => {
    //         const response = await request(app)
    //             .delete(`/rt/users/${1}`)
    //             .set('access_token', tokenRt);
    
    //         expect(response.status).toBe(200);
    //         expect(response.body.message).toBe(`Data warga dengan id ${1} berhasil dihapus`);
    //     });
    
    //     it('should return UserNotFound error when user ID is not valid', async () => {
    //         const response = await request(app)
    //             .delete(`/rt/users/${999999}`)
    //             .set('access_token', tokenRt);
    
    //         expect(response.status).toBe(404);
    //     });
    });
})