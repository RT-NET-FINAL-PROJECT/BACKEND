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

let service_test;

describe("Services Test", () => {
    describe("GET /services", () => {
        it("200 Success Get all services data", async () => {
              const login = await request(app).post("/rt/login").send(userRt);
              const response = await request(app).get("/services").set({"access_token": login.body.access_token});
              expect(response.status).toBe(200);
              expect(response.body).toBeInstanceOf(Array);
              expect(response.body[0]).toBeInstanceOf(Object);
              expect(response.body[0]).toHaveProperty("id", expect.any(Number));
              expect(response.body[0]).toHaveProperty("name", expect.any(String));
              expect(response.body[0]).toHaveProperty("dokumen_pendukung", expect.any(String || null));
              expect(response.body[0]).toHaveProperty("rt_id", expect.any(Number));
              expect(response.body[0]).toHaveProperty("user_id", expect.any(Number));
              expect(response.body[0]).toHaveProperty("deskripsi", expect.any(String));
              expect(response.body[0]).toBeInstanceOf(Object);
        });

        it("200 Success Get all services data as 'warga'", async () => {
            const login = await request(app).post("/login").send(userWarga);
            const response = await request(app).get("/services").set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body[0]).toBeInstanceOf(Object);
            expect(response.body[0]).toHaveProperty("id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("name", expect.any(String));
            expect(response.body[0]).toHaveProperty("dokumen_pendukung", expect.any(String || null));
            expect(response.body[0]).toHaveProperty("rt_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("user_id", expect.any(Number));
            expect(response.body[0]).toHaveProperty("deskripsi", expect.any(String));
            expect(response.body[0]).toBeInstanceOf(Object);
      });

        it("ERROR: 401 get without access token", async () => {
            const response = await request(app).get("/services")
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", 'Invalid Token');
        });

        it("ERROR: 401 access token error", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/services").set({"access_token": login.body.access_token+"h20"});
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", 'Invalid Token');
        });
    })

    describe("POST /services", () => {
        it("201 Success create service data", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            const bodyData = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta"
            }
            const response = await request(app).post("/services").set({"access_token": login.body.access_token}).send(bodyData);
            service_test = response.body.serviceId
            expect(response.status).toBe(201);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
            expect(response.body).toHaveProperty("serviceId", expect.any(Number));
        });

        
        it("400 no name inserted", async () => {
            const bodyData = {
                name: null,
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta"
            }

            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).post("/services").set({"access_token": login.body.access_token}).send(bodyData);
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Nama layanan dibutuhkan");
      });

      it("400 empty name inserted", async () => {
        const bodyData = {
            name: "",
            deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
            dokumen_pendukung: "link-peta"
        }

        const login = await request(app).post("/rt/login").send(userRt);
        const response = await request(app).post("/services").set({"access_token": login.body.access_token}).send(bodyData);
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("message", "Nama layanan dibutuhkan");
  });
    })

    describe("GET /services/:serviceId", () => {
        it("200 Success Get service details", async () => {
              const login = await request(app).post("/rt/login").send(userRt);
              const response = await request(app).get("/services/" + service_test).set({"access_token": login.body.access_token});
              expect(response.status).toBe(200);
              expect(response.body).toBeInstanceOf(Object);
              expect(response.body).toHaveProperty("id", expect.any(Number));
              expect(response.body).toHaveProperty("name", expect.any(String));
              expect(response.body).toHaveProperty("dokumen_pendukung", expect.any(String || null));
              expect(response.body).toHaveProperty("rt_id", expect.any(Number));
              expect(response.body).toHaveProperty("user_id", expect.any(Number));
              expect(response.body).toHaveProperty("deskripsi", expect.any(String));
        });

        it("ERROR: 401 get without access token", async () => {
            const response = await request(app).get("/services/" + service_test)
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", 'Invalid Token');
        });

        it("ERROR: 401 access token error", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/services/" + service_test).set({"access_token": login.body.access_token+"h2o"})
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", 'Invalid Token');
        });

        it("ERROR: 404 service not found", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).get("/services/" + service_test + 999).set({"access_token": login.body.access_token})
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", 'Layanan tidak ditemukan');
        });
    })

    describe("PUT /services/:serviceId", () => {

        it("200 Success edit service data", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            const bodyData = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta-revisi-lagi-final"

            }
            const response = await request(app).put("/services/" + service_test).set({"access_token": login.body.access_token}).send(bodyData);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        });

        it("400 No input name", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            const bodyData = {
                name: null,
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta-revisi-lagi-final"

            }
            const response = await request(app).put("/services/" + service_test).set({"access_token": login.body.access_token}).send(bodyData);
            expect(response.status).toBe(400);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Nama layanan dibutuhkan");
        });

        it("401 token error", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            const bodyData = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta-revisi-lagi-final"

            }
            const response = await request(app).put("/services/" + service_test).set({"access_token": login.body.access_token+"e23"}).send(bodyData);
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        });

        it("404 not found error", async () => {
            const login = await request(app).post("/rt/login").send(userRt);

            const bodyData = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta-revisi-lagi-final"

            }
            const response = await request(app).put("/services/" + 999 ).set({"access_token": login.body.access_token}).send(bodyData);
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Layanan tidak ditemukan");
        });

        it("401 No access token error", async () => {
            const bodyData = {
                name: "Pemilu 2024",
                deskripsi: "Accara pemilu 2024 diadakan besok di balai rw",
                dokumen_pendukung: "link-peta-re visi-lagi-final"

            }
            const response = await request(app).put("/services/" + service_test).send(bodyData);
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        });
    })

    describe("Delete /services/:serviceId", () => {
        it("200 Success delete service data", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).delete("/services/" + service_test).set({"access_token": login.body.access_token});
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        });

        it("404 No service found", async () => {
            const login = await request(app).post("/rt/login").send(userRt);
            const response = await request(app).delete("/services/999").set({"access_token": login.body.access_token});
            expect(response.status).toBe(404);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", "Layanan tidak ditemukan");
        });

        it("401 No access token error", async () => {
            const response = await request(app).delete("/services/" + service_test);
            expect(response.status).toBe(401);
            expect(response.body).toBeInstanceOf(Object);
            expect(response.body).toHaveProperty("message", expect.any(String));
        });
    })

});
