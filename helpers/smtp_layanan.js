const { User } = require("../models");
const nodemailer = require("nodemailer");

async function sendEmailToResidents(submission) {
    // Konfigurasi SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
            user: "oldtoon18@gmail.com",
            pass: "2A2074961839273045A01300E814E4EA0FE3",
        },
    });

    // Ambil email pengaju layanan
    const user = await User.findByPk(submission.user_id);
    console.log(user, "<<<<<<<<<<<<<<<");
    if (!user) throw { name: "USER_NOT_FOUND" };
    console.log(user.email, "email masuk <<<<<<<<<<<<<<<<<<<<<<<<");

    const mailOptions = {
        from: "RT-NET-SEKERTARIAT <oldtoon18@gmail.com>",
        to: "bondanherutomo35@gmail.com",
        subject: "Layanan Anda Telah Selesai Diproses",
        text: `Halo, layanan yang Anda ajukan dengan detail sebagai berikut telah selesai diproses:\n\n` +
            `Jenis Layanan: ${submission.keterangan}\n` +
            `Status: ${submission.status}\n\n` +
            `Dokumen fisik dengan tanda tangan basah bisa diambil dirumah pak RT Pada Pukul 19:00/21:00 WIB.`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmailToResidents };
