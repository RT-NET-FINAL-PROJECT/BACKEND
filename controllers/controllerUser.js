const { User, Rt, Submission, Vehicle, Service, Guest } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class ControllerUser {
    static async register(req, res, next) {
        try {
            console.log(req.body);
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
                status: false // set status pengajuan ke "Pending"
            });

            // tambahkan data pengajuan
            await Submission.create({
                user_id: newUser.id,
                rt_id,
                jenisPengajuan: "Register Warga",
                status: false
            });

            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async approveUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                throw { name: "UserNotFound" };
            }

            user.status = true; // ubah status user menjadi "Aktif"
            await user.save();

            const pengajuan = await Submission.findOne({
                where: {
                    user_id: id
                }
            });
            if (!pengajuan) {
                throw { name: "PengajuanNotFound" };
            }

            pengajuan.status = true; // ubah status pengajuan menjadi "Disetujui"
            await pengajuan.save();

            res.status(200).json(user);
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
            if (findUser.status === false) throw { name: "account_pending" }
            const passwordValidated = comparePassword(password, findUser.password)

            if (!passwordValidated) throw { name: "invalid_email/password" }
            const payload = {
                id: findUser.id,
            }

            const access_token = createToken(payload)
            console.log(access_token);

            const response = {
                access_token,
                email: findUser.email
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

    static async createUser(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    static async deleteUser(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}


module.exports = ControllerUser