class ErrorHandler extends Error {
    constructor(statusCode, message, errors) {
      super();
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
    }
  }
  const handleError = (err, res) => {
    const { statusCode, message, errors } = err;
    res.status(statusCode || 500).send({
      status: statusCode,
      statusCode,
      message,
      errors,
    });
  };
  module.exports = {
    ErrorHandler,
    handleError,
  };