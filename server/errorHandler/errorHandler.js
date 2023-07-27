const errorHandler = (error, req, res, next) => {


  if (error.code === 11000) {
    error.message = "Email already exists.";
    error.statusCode = 400;
  }
  
  error.message = error.message || "internal Server Error";
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({ message: error.message, status: false });
};

module.exports = errorHandler;
