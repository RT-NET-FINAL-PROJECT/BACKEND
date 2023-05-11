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

let service_test ;
let submission_id_test;

describe("Submission testing", () => {
    describe("POST /submissions", () => {
        it("201 success create submission", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            // membuat service untuk digunakan submission
            const bodyService = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta"
            }
            const serviceResponse = await request(app).post("/services").set({"access_token": login.body.access_token}).send(bodyService);
            service_test = serviceResponse.body.serviceId;


            const bodyData = {
                keperluan: "Validasi surat pemilu",
                lampiran: {
                    fieldname:"lampiran1",
                    buffer: "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f",
                }
            }
            const response = await request(app).post("/submissions/" + service_test).set({"access_token": login.body.access_token}).send(bodyData);
            submission_id_test = response.body.submissionId
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })
    })

    describe("GET /submissions", () => {
        it("200 success get all submissions", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/submissions").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty("id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("user_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("rt_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("service_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("dokumen_pendukung", expect.any(String));
            expect(response.body[0]).toHaveProperty("status", expect.any(String));
            expect(response.body[0]).toHaveProperty("keterangan", expect.any(String))
            expect(response.body[0]).toHaveProperty("keperluan", expect.any(String))
        })
    })

    describe("GET /submissions/mysubmission", () => {
        it("200 success get all user submissions", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/submissions/mysubmission").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty("id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("user_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("rt_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("service_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("dokumen_pendukung", expect.any(String));
            expect(response.body[0]).toHaveProperty("status", expect.any(String));
            expect(response.body[0]).toHaveProperty("keterangan", expect.any(String))
            expect(response.body[0]).toHaveProperty("keperluan", expect.any(String))
        })
    })

    describe("GET /submissions/services", () => {
        it("200 success get all service only submissions", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/submission/services").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty("id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("user_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("rt_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("service_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("dokumen_pendukung", expect.any(String));
            expect(response.body[0]).toHaveProperty("status", expect.any(String));
            expect(response.body[0]).toHaveProperty("keterangan", expect.any(String))
            expect(response.body[0]).toHaveProperty("keperluan", expect.any(String))
        })
    })

    describe("GET /submissions/registerwarga", () => {
        it("200 success get all service only register from users", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/submission/registerwarga").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        })
    })


    describe("GET /submissions/:submissionId", () => {
        it("200 success get details of submissions", async () => {
            console.log(submission_id_test);
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/submissions/" + submission_id_test).set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("id", expect.any(Number));
            expect(response.body).toHaveProperty("user_id", expect.any(Number));
            expect(response.body).toHaveProperty("rt_id", expect.any(Number));
            expect(response.body).toHaveProperty("service_id", expect.any(Number));
            expect(response.body).toHaveProperty("dokumen_pendukung", expect.any(String));
            expect(response.body).toHaveProperty("status", expect.any(String));
            expect(response.body).toHaveProperty("keterangan", expect.any(String))
            expect(response.body).toHaveProperty("keperluan", expect.any(String))
        })
    })

    describe("PUT /submissions", () => {
        it("200 success edit submission", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const bodyData = {
                keperluan: "Validasi surat pemilu",
                lampiran: {
                    fieldname:"lampiran1",
                    buffer: "ffd8ffe000104a46494600010100000100010000ffdb004300080606070605080707070909080a0c140d0c0b0b0c1912130f",
                }
            }
            const response = await request(app).put("/submissions/" + submission_id_test).set({"access_token": login.body.access_token}).send(bodyData);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })
    })

    describe("PATCH /submissions", () => {
        it("200 success update submission to approved", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).patch("/services/2/submissions/" + submission_id_test + "?inputStatus=approved").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })

        it("200 success update submission to in progress", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).patch("/services/2/submissions/" + submission_id_test + "?inputStatus=in%20progress").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })

        
        it("200 success update submission to done", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).patch("/services/2/submissions/" + submission_id_test + "?inputStatus=done").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })
    })

    describe("DELETE /submissions", () => {
        it("200 success delete submission", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).delete("/submissions/" + submission_id_test).set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        })
    })
})