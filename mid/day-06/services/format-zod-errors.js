module.exports = function formatZodErrors(error) {
  return error.errors.reduce((acc, err) => {
    const field = err.path.join('.');
    acc[field] = err.message;
    return acc;
  }, {});
}
