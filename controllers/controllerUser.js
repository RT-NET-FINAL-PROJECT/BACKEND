// const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class ControllerUser {
    static async register(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {


        } catch (error) {
            next(error)
        }
    }

    //////CRUD USERS////

    static async findAllUser(req, res, next) {
        try {

        } catch (error) {
            next(error)
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