const User = require("../models/authmodel");

exports.editU = async (req, res) => {
  try {
    const userId = req.user.id;
    const UpUser = req.body;
    const UserE = User.findById(userId);
    if (!UserE) {
      res.status(404).json({
        msg: "user not found",
      });
    }
    await User.findByIdAndUpdate(userId, UpUser);
    res.status(200).json({
      msg: "user updated",
    });
  } catch (error) {
    res.status(500).json({
      msg: "error to updated User",
    });
  }
};
