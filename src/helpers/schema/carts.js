const addToCart = {
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

module.exports = {
  addToCart,
  list,
};
