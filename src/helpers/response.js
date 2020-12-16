const response = (res, message, additionalData = {}, status = 200, _success = null) => {
  const pattern = /^(2[0-9][0-9])$/;
  let success = false;
  if (status && pattern.test(status)) {
    success = true;
  }
  return res.status(status).send({
    success: _success || success,
    message: message || 'Something happened',
    ...additionalData,
  });
};

module.exports = response;
