// const { Rt } = require('../models')
class ControllerRt {

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