const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const accessToken = jwt.sign({ id: newUser.id }, process.env.ACCESS_TOKEN, {
    expiresIn: "10s",
  });
  const refreshToken = jwt.sign({ id: newUser.id }, process.env.REFRESH_TOKEN, {
    expiresIn: "30d",
  });
  newUser.refreshToken = refreshToken;
  await newUser.save();
  newUser.refreshToken = undefined;
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    accessToken,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password").exec();
  if (!user || !user.correctPassword(password, user.password)) {
    return next(new AppError("Credentials are wrong", 404));
  }
  const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN, {
    expiresIn: "60s",
  });
  const refreshToken = jwt.sign(
    { name: user.name },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "30d",
    }
  );
  user.refreshToken = refreshToken;
  await user.save();
  user.refreshToken = undefined;
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });
  res.status(200).json({
    status: "success",
    accessToken,
    data: { user },
  });
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return next(new AppError("you need to connect first", 401));
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.id !== decoded.id)
      return next(new AppError("who are you?", 403));
    const accessToken = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10s" }
    );
    res.json({ accessToken });
  });
});

exports.logout = catchAsync(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  res.sendStatus(204);
});
