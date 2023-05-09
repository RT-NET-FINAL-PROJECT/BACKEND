const { Rt } = require('../models')
class ControllerAdmin {

    static async createDataRt(req, res, next) { // ini admin cuman ngedaftarin daftar rt yg mau pake aplikasinya, bukan ngeregister
        try {
            console.log(req.body);
            let { kepala_rt, nik_rt, rt, rw, kelurahan, kecamatan, kotaKabupaten, provinsi, link_grup_wa } = req.body;

            let dataRt = await Rt.create({
                kepala_rt, 
                nik_rt, 
                rt, 
                rw, 
                kelurahan, 
                kecamatan, 
                kotaKabupaten, 
                provinsi,
                link_grup_wa
            })
            res.status(201).json(dataRt)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}


module.exports = ControllerAdmin