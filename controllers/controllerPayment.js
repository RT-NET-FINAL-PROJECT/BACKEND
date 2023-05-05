// const { Payment } = require('../models')
class ControllerPayment {

    static async findAllPayment(req, res, next) {
        try {
            res.send("masuk payment")

        } catch (error) {
            next(error)
        }
    }

    
    static async createPayment(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }


}


module.exports = ControllerPayment