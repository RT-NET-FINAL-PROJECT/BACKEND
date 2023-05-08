const { User, Vehicle, Guest, Comment } = require('../models')

async function authorizationRt(req, res, next) {
    try {
        const { role } = req.user; // ambil informasi user dan role dari token

        // jika role user adalah "warga"
        if (role === "Warga" || role === "Admin") throw { name: "Unauthorized" };

        // lewati middleware jika tidak ada error
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}
async function authorizationAdmin(req, res, next) {
    try {
        const { role } = req.user; // ambil informasi user dan role dari token

        // jika role user adalah "warga"
        if (role === "Warga" || role === "RT" || role === "Sekertariat") throw { name: "Unauthorized" };

        // lewati middleware jika tidak ada error
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function authorizationKendaraan(req, res, next) {
    try {
        let vehicleId = req.params.id
        let vehicle = await Vehicle.findByPk(vehicleId)
        if (!vehicle) throw { name: "VehicleNotFound" }
        if (req.user.id !== vehicle.user_id) {
            throw ({ name: "Forbidden" })
        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}


async function authorizationTamu(req, res, next) {
    try {
        let guestId = req.params.id
        let guest = await Guest.findByPk(guestId)
        if (!guest) throw { name: "GuestNotFound" }
        if (req.user.id !== guest.user_id) {
            throw ({ name: "Forbidden" })
        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

async function authorizationComment(req, res, next) {
    try {
        let commentId = req.params.id
        let comment = await Comment.findByPk(commentId)
        if (!comment) throw { name: "CommentNotFound" }
        if (req.user.id !== comment.user_id) {
            throw ({ name: "Forbidden" })
        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = { authorizationRt, authorizationAdmin, authorizationKendaraan, authorizationTamu, authorizationComment }