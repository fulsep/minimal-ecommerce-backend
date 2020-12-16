const confirm = {
  id: {
    in: ['body'],
    customSanitizer: {
      options: (val) => {
        if (typeof val !== 'object') {
          if (val !== null) {
            return [val];
          }
          return [];
        }
        return val;
      },
    },
    optional: { options: { nullable: true } },
  },
};

module.exports = {
  confirm,
};
