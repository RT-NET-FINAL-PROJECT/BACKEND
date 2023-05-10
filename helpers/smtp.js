const { User } = require("../models");
const nodemailer = require("nodemailer");

async function sendEmailToResidents(event) {
    // Konfigurasi SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
            user: "bocahtelengria@gmail.com",
            pass: "2A1593F69C185F36642FDE0E3D7660EDE93F",
        },
    });

    const residents = await User.findAll({
        attributes: ['email'],
        where: { role: 'Warga' }
    });
    console.log(residents,"<<<<<<<<<<<<<<<<<<<<<<<<");


    // Mengirim email ke setiap warga
    for (let i = 0; i < residents.length; i++) {
        const mailOptions = {
            from: "RT-NET-SEKERTARIAT <bocahtelengria@gmail.com>",
            to: residents[i].email,
            subject: "Pemberitahuan Event Baru",
            text: `Halo, ada event baru nih di RT kita. Berikut adalah detailnya:\n\n` +
                `Nama Event: ${event.name}\n` +
                `Deskripsi: ${event.deskripsi}\n` +
                `Kategori: ${event.kategori}\n` +
                `Lokasi: ${event.lokasi}\n` +
                `Biaya: ${event.biaya}\n\n` +
                `Ayo ikutan yaa...`
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = { sendEmailToResidents }