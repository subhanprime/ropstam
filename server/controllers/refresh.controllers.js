const jwt = require("jsonwebtoken");
const userModal = require("../models/users.js");
const CustomError = require("../errorHandler/customError.js");
const refreshToken = async (req, res) => {
  const refreshToken = req?.query?.refResh;
  const foundUser = await userModal.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(409);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || decoded?.userInfo?.email != foundUser?.email) {
      return next(new CustomError("token is not valid", 409));
    }
    const token = jwt.sign(
      {
        userInfo: {
          email: decoded?.userInfo?.email,
          id: decoded?.userInfo?.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "360s" }
    );

    res.json({ accessToken: token });
  });
};

module.exports = refreshToken;
