// const { Event } = require('../models')
class ControllerEvent {
    static async findAllEvent(req, res, next) {
        try {
           res.send("masuk event")
        } catch (error) {
            next(error)
        }
    }

    static async detailEvent(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async createEvent(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async updateEvent(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }
    static async deleteEvent(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}


module.exports = ControllerEvent