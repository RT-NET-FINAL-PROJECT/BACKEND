module.exports = async (error, req, res, next) => {
  let message, status;

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
      message = error.errors.map((el) => {
        return (el = el.message);
      });
      status = 400;
      break;

    case "SequelizeUniqueConstraintError":
      message = "Email sudah terdaftar";
      status = 400;

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

    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ message });
};