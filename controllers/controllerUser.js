const { User, Rt } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class ControllerUser {
    static async register(req, res, next) {
        try {
            console.log(req.body);
            let { namaLengkap, noTelp, email, password, ktp, status_keluarga, rt_id } = req.body;
            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                ktp,
                rt_id,
                role: "Warga",
                status_keluarga,
                noTelp
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
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

    static async findAllUser(req, res, next) {
        try {
            const allUser = await Rt.findAll({
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['password'] } 
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ],
            
            });
            res.status(200).json(allUser);
        } catch (error) {
            console.log(error);
            next(error);
        }

    }

    static async detailUser(req, res, next) {
        try {

        } catch (error) {
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