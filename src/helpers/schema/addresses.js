const detail = {
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    errorMessage: 'Parameter must be an integer',
  },
};

const list = {
  page: {
    in: ['query'],
    isInt: true,
    toInt: true,
    customSanitizer: {
      options: (val) => {
        if (!val || val < 0) {
          return 1;
        }
        return val;
      },
    },
    optional: { options: { nullable: true } },
  },
  limit: {
    in: ['query'],
    isInt: true,
    toInt: true,
    customSanitizer: {
      options: (val) => {
        if (!val || val < 0 || val > 50) {
          return 1;
        }
        return val;
      },
    },
    optional: { options: { nullable: true } },
  },
  search: {
    in: ['query'],
    optional: { options: { nullable: true } },
  },
};

const create = {
  name: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Name must be filled',
  },
  address: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Address must be filled',
  },
  recipient: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Recipient must be filled',
  },
  phone: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Phone must be filled',
  },
  lat: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Address name must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  lng: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Address name must be filled',
    optional: {
      options: { nullable: true },
    },
  },
};

const edit = {
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,
    errorMessage: 'Parameter must be an integer',
  },
  name: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Name must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  address: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Address must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  recipient: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Recipient must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  phone: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Phone must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  lat: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Latitude must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  lng: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'Logitude must be filled',
    optional: {
      options: { nullable: true },
    },
  },
  isPrimary: {
    in: ['body'],
    isBoolean: true,
    toBoolean: true,
    errorMessage: 'Logitude must be filled',
    optional: {
      options: { nullable: true },
    },
  },
};

module.exports = {
  detail,
  list,
  create,
  edit,
};
