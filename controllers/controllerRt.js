const { User,Rt } = require('../models')
class ControllerRt {

    static async register(req, res, next) {
        try {
            console.log(req.body);
            let { namaLengkap, noTelp, email, password, rt_id } = req.body;
            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                rt_id,
                role: "RT",
                noTelp
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }








    static async findAllRt(req, res, next) {
        try {
            res.send("masuk RT")
        } catch (error) {
            next(error)
        }
    }

    static async detailRt(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async createRt(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async updateRt(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    static async deleteRt(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}


module.exports = ControllerRt