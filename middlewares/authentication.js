const { login } = require("../controllers/controllerUser");
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { Op } = require('sequelize')

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers;

        if (!access_token) {
            throw {
                name: "InvalidToken",
            };
        }

        const payload = verifyToken(access_token);
        const user = await User.findByPk(payload.id);

        if (!user) {
            throw {
                name: "InvalidToken",
            };
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            rt_id : user.rt_id
        };

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { authentication }
