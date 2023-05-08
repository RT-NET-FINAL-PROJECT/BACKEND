// const { User } = require("../models");
// const nodemailer = require("nodemailer");

// async function sendEmailToResidents(event) {
//     // Konfigurasi SMTP transport
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: "oldtoon35@gmail.com",
//             pass: "Oldtton35!0098",
//         },
//     });

//     const residents = await User.findAll({
//         attributes: ['email'],
//         where: { role: 'Warga' }
//     });


//     // Mengirim email ke setiap warga
//     for (let i = 0; i < residents.length; i++) {
//         const mailOptions = {
//             from: "oldtoon35@gmail.com",
//             to: residents[i].email,
//             subject: "Pemberitahuan Event Baru",
//             text: `Halo, ada event baru nih di RT kita. Berikut adalah detailnya:\n\n` +
//                 `Nama Event: ${event.name}\n` +
//                 `Deskripsi: ${event.deskripsi}\n` +
//                 `Kategori: ${event.kategori}\n` +
//                 `Lokasi: ${event.lokasi}\n` +
//                 `Biaya: ${event.biaya}\n\n` +
//                 `Ayo ikutan yaa...`
//         };

//         await transporter.sendMail(mailOptions);
//     }
// }

// module.exports = { sendEmailToResidents }