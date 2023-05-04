export const errorhandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
};

export const errorHandler = (status, message, res) => {
  res.status(status).json({ message });
};
