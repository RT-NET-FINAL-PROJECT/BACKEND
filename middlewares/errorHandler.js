module.exports = async (error, req, res, next) => {
  let message, status;

  console.log(error);
  switch (error.name) {
    case "NO_INPUT":
      message = "Fields required";
      status = 400;
      break;

    case "account_pending":
      message = "Akun Sedang Menunggu Persetujuan RT";
      status = 404;
      break;

    case "SequelizeValidationError":
    case "SequelizeUniqueConstainError":
      status = 400;
      message = error.errors[0].message;
      console.log(error);
      break;

    case "invalid_email/password":
      message = "Email/Password Salah!";
      status = 401;
      break;

    case "email_required":
      message = "Email Dibutuhkan!";
      status = 400;
      break;

    case "password_required":
      message = "Password Dibutuhkan!";
      status = 400;
      break;

    case "SequelizeUniqueConstraintError":
      message = "Email / nomor telephone sudah terdaftar";
      status = 400;
      break;

    case "account_pending":
      message = "Pendaftaran belum disetujui";
      status = 401;
      break;
      
    case "invalid_email/password":
      message = "Email / password salah";
      status = 401;
      break;

    case "JsonWebTokenError":
    case "InvalidToken":
      message = "Invalid Token";
      status = 401;
      break;

    case "Unauthorized":
      message = "Anda tidak memiliki hak akses";
      status = 403;
      break;

    case "POST_NOT_FOUND":
      message = "Post not found";
      status = 404;
      break;

    case "SUBMISSION_NOT_FOUND":
      message = "Permintaan layanan tidak ditemukan";
      status = 404;
      break;

    case "SERVICE_NOT_FOUND":
      message = "Layanan tidak ditemukan";
      status = 404;
      break;

    case "Forbidden":
      message = "Anda tidak memiliki akses!";
      status = 403;
      break;

    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ message });
};
