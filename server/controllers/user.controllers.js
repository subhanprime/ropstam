const userModal = require("../models/users.js");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError= require('../errorHandler/customError.js')
const userSignup = async (req, res) => {
  sgMail.setApiKey(process.env.SG_GRID_KEY);
  const { email, firstName, lastName } = req.body;

  const foundUser = await userModal.findOne({ email });
  if (foundUser) {
    return res
      .status(400)
      .json({ message: "Email Already Register.", status: false });
  }

  const token = Math.floor(100000 + Math.random() * 900000);
  const hashPassword = await bcrypt.hash(`${token}`, 10);

  const output = `
             <h1>Welcome Ropstam !!</h1>
             <h3>Please  use this password for this Email ${email}</h3>
            <h1>${token}</h1>
             `;

  let msgConfigurations = {
    to: email,
    from: "baberbao80026@gmail.com",
    subject: "Account Verification",
    text: "please enter this password to login",
    html: output,
  };

  sgMail
    .send(msgConfigurations)
    .then(async () => {
      console.log("email send");
    })
    .catch((error) => {
      console.error("email not send", error);
    });

  const response = await userModal.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });

  if (response) {
    return res.status(201).json({
      message: "User Register Successfully please Check Your Email.",
      status: true,
    });
  } else {
    return res
      .status(400)
      .json({ message: "User Register Failed.", status: false });
  }
};

const userLogin = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please Enter Valid Email and Password.",
      status: false,
    });
  }

  const foundUser = await userModal.findOne({ email });

  if (!foundUser) {
    return res.status(400).json({
      message: "Email not Register Please signUp First",
      status: false,
    });
  }

  const result = await bcrypt.compare(password, foundUser?.password);

  if (!result) {
    return res.status(401).json({
      message: "Your Password Not Matched",
      status: false,
    });
  }

  const accessToken = jwt.sign(
    { userInfo: { email: foundUser?.email, id: foundUser?._id } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "360s" }
  );

  const refreshToken = jwt.sign(
    { userInfo: { email: foundUser?.email, id: foundUser?._id } },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();
  // sameSite:"None"
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    refreshToken,
    accessToken,
    email: foundUser?.email,
    id: foundUser?._id,
    message: "Login Successfully",
    status: "success",
  });
};

const userInfo = async (req, res) => {
  if (!req?.email) {
    return res
      .status(400)
      .json({ message: "User Information Failed", status: false, data: null });
  }
  const foundUser = await userModal.findOne(
    { email: req?.email },
    { email: 1, firstName: 1, lastName: 1 }
  );
  if (foundUser) {
    return res
      .status(200)
      .json({ message: "User Information", status: true, data: foundUser });
  } else {
    return res
      .status(400)
      .json({ message: "User Information", status: false, data: null });
  }
};

module.exports = { userSignup, userLogin, userInfo };
