const User = require("../models/authmodel");

exports.deleteU = async (req, res) => {
  try {
    const userId = req.user.id;
    const userE = User.findById(userId);
    if (!userE) {
      res.status(404).json({
        msg: "user not found",
      });
    }
    await User.findByIdAndDelete(userId);

    req.status(200).json({ msg: "user eliminated" });
  } catch (error) {
    res.status(500).json({
      msg: "error to delete user",
    });
  }
};
