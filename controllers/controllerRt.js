const { User, Rt, Vehicle, Comment, Service, Guest } = require('../models')
class ControllerRt {

    static async registerRt(req, res, next) {
        try {
            console.log(req.body);
            let { namaLengkap, nomorTelp, email, password, rt_id } = req.body;
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
                nomorTelp,
                status: true
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async registerSekertariat(req, res, next) {
        try {
            console.log(req.body);
            let { namaLengkap, nomorTelp, email, password, rt_id } = req.body;
            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                rt_id,
                role: "Sekertariat",
                nomorTelp,
                status: true
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }



    static async findAllWarga(req, res, next) {
        try {
            // Mendapatkan ID user dari objek request
            const userId = req.user.id;
            // Mencari data user berdasarkan ID
            const user = await User.findByPk(userId);
            // Jika user tidak ditemukan, lemparkan error
            if (!user) {
                throw { name: "UserNotFound" };
            }
            // Jika user adalah RT/Sekertariat, tampilkan data warga sesuai dengan RT nya
            const rtId = user.rt_id;
            const rt = await Rt.findByPk(rtId, {
                include: [
                    {
                        model: User,
                        attributes: { exclude: ["password"] },
                        include: [
                            {
                                model: Vehicle,
                            },
                            {
                                model: Service,
                            },
                            {
                                model: Comment,
                            },
                            {
                                model: Guest,
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            res.status(200).json(rt);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async createWarga(req, res, next) {
        try {
            const { namaLengkap, nomorTelp, email, password, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir } = req.body;

            const newUser = await User.create({
                namaLengkap,
                nomorTelp,
                email,
                password,
                role : "Warga",
                nomorKk,
                nomorKtp,
                status : true,
                rt_id: req.user.rt_id,
                status_keluarga,
                kkImg,
                ktpImg,
                photoUrl,
                aktaImg,
                agama,
                jenis_kelamin,
                status_perkawinan,
                pekerjaan,
                tempat_lahir,
                tanggal_lahir
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteWarga(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
    
            if (!user) {
                throw { name: "UserNotFound" };
            }
    
            await user.destroy();
    
            res.status(200).json({
                message: `Data warga dengan id ${id} berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    
    static async updateWarga(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}


module.exports = ControllerRt