/**
 * Global error handler middleware.
 * Catches any unhandled errors thrown inside route handlers.
 */
const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.message || err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export default errorHandler;
