const { User, Rt, Submission, Vehicle, Service, Guest, Comment } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class ControllerUser {
    static async register(req, res, next) {
        try {
            const {
                namaLengkap,
                nomorTelp,
                email,
                password,
                nomorKtp,
                status_keluarga,
                rt_id
            } = req.body;

            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }

            const newUser = await User.create({
                namaLengkap,
                email,
                password,
                nomorKtp,
                rt_id,
                role: "Warga",
                status_keluarga,
                nomorTelp,
                status: "pending" // set status pengajuan ke "Pending"
            });

            // tambahkan data pengajuan
            await Submission.create({
                user_id: newUser.id,
                rt_id: newUser.rt_id,
                keterangan: "Register Warga",
                status: "pending"
            });

            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) throw { name: "email_required" }
            if (!password) throw { name: "password_required" }

            const findUser = await User.findOne({
                where: {
                    email,
                }
            })


            if (!findUser) throw { name: "invalid_email/password" }
            if (findUser.status === "pending") throw { name: "account_pending" }
            const passwordValidated = comparePassword(password, findUser.password)

            if (!passwordValidated) throw { name: "invalid_email/password" }
            const payload = {
                id: findUser.id,
            }

            const access_token = createToken(payload)
            console.log(access_token);

            const response = {
                access_token,
                email: findUser.email,
                userId: findUser.id
            }

            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }



    //////CRUD USERS////
    static async detailUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id, {
                include: [
                    {
                        model: Rt,
                        attributes: {
                            exclude: ['nik_rt']
                        }
                    },
                    {
                        model: Vehicle,
                    },
                    {
                        model: Service,
                    },
                    {
                        model: Guest,
                    },
                ],

                attributes: {
                    exclude: ['password']
                }
            });

            if (!user) {
                throw {
                    name: "User Not Found",
                };
            }

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async findAllKeluargaById(req, res, next) {
        try {
            // Find the user by id
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Find all users with the same nomorKk
            const users = await User.findAll({
                where: {
                    nomorKk: user.nomorKk
                },
                attributes: {
                    exclude: ['password']
                }
            });
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { namaLengkap, nomorTelp, email, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                throw {
                    name: "UserNotFound",
                };
            }

            // Update user data
            await User.update(
                {
                    namaLengkap, nomorTelp, email, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir
                },
                { where: { id } }
            );

            res.status(201).json({
                message: "Success to update Profile",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    /////////////////////////CRUD KENDARAAN/////////////////////////////////////////////

    static async addKendaraan(req, res, next) {
        try {
            const { name, nomorPolisi } = req.body
            const add = await Vehicle.create({
                name,
                nomorPolisi,
                user_id: req.user.id
            })
            res.status(201).json(add);

        } catch (error) {
            next(error)
        }
    }


    static async updateKendaraan(req, res, next) {
        try {
            const { id } = req.params;
            const { name, nomorPolisi } = req.body
            const vehicle = await Vehicle.findByPk(id);
            if (!vehicle) {
                throw {
                    name: "VehicleNotFound",
                };
            }

            // Update kendaraan data
            await Vehicle.update(
                {
                    name, nomorPolisi
                },
                { where: { id } }
            );

            res.status(201).json({
                message: "Success to update Kendaraan",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteKendaraan(req, res, next) {
        try {
            const { id } = req.params;
            const vehicle = await Vehicle.findByPk(id);

            await Vehicle.destroy({ where: { id } });

            res.status(200).json({
                message: `Kendaraan berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    ///////////CRUD TAMU/////////////////
    static async addTamu(req, res, next) {
        try {
            const { name, nomorKtp } = req.body
            const add = await Guest.create({
                name,
                nomorKtp,
                user_id: req.user.id
            })
            res.status(201).json(add);

        } catch (error) {
            next(error)
        }
    }

    static async deleteTamu(req, res, next) {
        try {
            const { id } = req.params;
            const guest = await Guest.findByPk(id);

            await Guest.destroy({ where: { id } });

            res.status(200).json({
                message: `Tamu berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    ///////////CRUD COMMENT SECTION/////////////////
    static async addComment(req, res, next) {
        try {
            const { comment, post_id } = req.body;
            const add = await Comment.create({
                comment,
                post_id,
                user_id: req.user.id
            })
            res.status(201).json(add);

        } catch (error) {
            next(error)
        }
    }

    static async deleteComment(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id);

            await Comment.destroy({ where: { id } });

            res.status(200).json({
                message: `Komentar berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}


module.exports = ControllerUser