const User = require("./../models/userModel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const signToken = (id) => {
  return jwt.sign({ id }, 'almighty-secret-password-no-one-can-figure-it-out-pppp', {
    expiresIn: '90d',
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  });
  user.password=undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// Signup
exports.signup = async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!(await user.correctPassword(password, user.password)) || !user) {
    return next();
  }

  createSendToken(user, 200, res);
};

// protect routes
exports.protect = async (req, res, next) => {
  // get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log("you are not logged in!");
    return next();
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, 'almighty-secret-password-no-one-can-figure-it-out-pppp');

  // check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) return next();
  // check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    console.log("please log in again");
    return next();
  }
  req.user = freshUser;
  next();
};

// permissions
exports.restricTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array
    if (!roles.includes(req.user.role)) {
      console.log("you are not allowed to do this");
      return next();
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  // get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next();
  // generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // send it back as an email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/users/resetPassword/${resetToken}`;
  const message = `if you forget your password go to this Link to create a new one : ${resetURL} if you didn't forget it just ignore this message`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset Token (valid for only 10min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    next();
  }
};

exports.resetPassword = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResedToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    console.log("error");
    return next();
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  createSendToken(user, 200, res);

  next();
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    console.log("error");
    return next();
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 200, res);
};

// refresh token
exports.refreshToken= async(req,res,next)=>{
    const refreshToken= jwt.sign(req.user._id)
}
