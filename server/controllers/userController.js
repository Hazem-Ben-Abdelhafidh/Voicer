const User = require("../models/userModel");
const factory= require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  for (const key in obj) {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  }
  return newObject;
};
exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
};

exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    console.log("error");
    return next();
  }
  const filteredBody = filterObj(req.body, "name", "email");
  const updatedUser = User.findById(req.body.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteMe = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.getUser= factory.getOne(User);

// Do not Update PASSWORDS with this
exports.deleteUser= factory.deleteOne(User);
exports.updateUser= factory.updateOne(User);
