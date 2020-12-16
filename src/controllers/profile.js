const { response } = require('../helpers');
const { User, UserDetail } = require('../models/index');

exports.info = async (req, res) => {
  const { id: userId } = req.authUser;
  const results = await UserDetail.findOne({
    where: { userId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
  });
  if (results) {
    return response(res, 'Profile info', { results });
  }
  return response(res, 'Bad Request', {}, 404);
};
