const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const { User, ResetRequest, UserDetail } = require('../models/index');
const { response, mailer, jwt } = require('../helpers');

exports.login = async (req, res) => {
  const { email, password } = req.matchedData;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user !== null) {
    try {
      const verified = await bcrypt.compare(password, user.password);
      if (verified) {
        const { id } = user;
        console.log(id);
        const token = jwt.sign(id);
        return response(res, 'Login success', { token });
      }
    } catch (e) {
      return response(res, 'Wrong username or password', {}, 401);
    }
  } else {
    return response(res, 'Wrong username or password', {}, 401);
  }
  return response(res, null, {}, 500);
};

exports.register = async (req, res) => {
  try {
    const results = await User.create(req.matchedData);
    const token = jwt.sign(results.id);
    if (results) {
      await UserDetail.create({
        fullName: results.name,
        userId: results.id,
      });
      return response(res, 'Register Successfully', { token });
    }
  } catch (e) {
    return response(res, 'Register failed', {}, 400);
  }
  return response(res, null, {}, 500);
};

exports.resetRequest = async (req, res) => {
  const { email } = req.matchedData;
  try {
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      const { id: userId } = user;
      await ResetRequest.update(
        { isExpired: true },
        { where: { userId, isExpired: false } },
      );
      const reset = await ResetRequest.create({
        code: uuid(),
        requestTime: new Date(),
        userId,
      });
      mailer('RESET_PASSWORD', reset.code);
      return response(res, 'Reset code has been sent to email');
    }
    return response(res, 'Cannot find user', {}, 400);
  } catch (e) {
    return response(res, null, {}, 500);
  }
};

exports.resetPassword = async (req, res) => {
  const { code, new_password: newPassword } = req.matchedData;
  try {
    const request = await ResetRequest.findOne({ where: { code, isExpired: false } });
    if (request !== null) {
      await request.update({ isExpired: true });
      const { userId: id } = request;
      const user = await User.findOne({ where: { id } });
      const update = await user.update({ password: newPassword });
      if (update) {
        return response(res, 'Change password successfully', {});
      }
    }
    return response(res, 'Wrong reset code', {}, 400);
  } catch (e) {
    return response(res, null, {}, 500);
  }
};
