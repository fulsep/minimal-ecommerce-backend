const login = {
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Wrong email format',
  },
  password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Password must be provided',
  },
};

const register = {
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Field name minimal 4 characters',
      options: {
        min: 4,
      },
    },
  },
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Wrong email format',
  },
  password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Password must be provided',
  },
};

const resetRequest = {
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'Wrong email format',
  },
};

const resetPassword = {
  code: {
    in: ['params'],
    notEmpty: true,
  },
  new_password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'New password cannot be empty',
  },
  confirm_password: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Confirm password cannot be empty',
    custom: {
      errorMessage: 'Confirm password must be same as new password',
      options: (val, { req }) => {
        if (val === req.body.new_password) {
          return true;
        }
        return false;
      },
    },
  },
};

module.exports = {
  login,
  register,
  resetRequest,
  resetPassword,
};
