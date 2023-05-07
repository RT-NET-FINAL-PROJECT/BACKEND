module.exports = async (error, req, res, next) => {
  let message, status;

  switch (error.name) {
    case "SequelizeUniqueConstraintError":
      message= error.errors[0].message;
      status = 400;
      
    case "InvalidToken":
      message = "Invalid Token";
      status = 401;  
      break;
      
    case "POST_NOT_FOUND":
      message = "Post not found";
      status = 404;  
      break;

    default:
      message = "Internal Server Error";
      status = 500;
      break;
  }

  res.status(status).json({ message });
};
