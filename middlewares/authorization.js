const { User } = require('../models')

async function authorizationRt(req, res, next) {
    try {
        const { role } = req.user; // ambil informasi user dan role dari token
        
        // jika role user adalah "warga"
        if (role === "Warga") throw { name: "Unauthorized" };

        // lewati middleware jika tidak ada error
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authorizationRt }