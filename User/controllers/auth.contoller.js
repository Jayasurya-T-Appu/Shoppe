const userModel = require("../Models/User.model");
const JWT_bcrypt_Helper = require("../helper/jwt_bcrypt.helper");
const authController = {
  signIn(req, res) {
    userModel.findOne({ email: req.body.email }).then(async (doc) => {
      if (doc) {
        let authenticate = await JWT_bcrypt_Helper.validatePass(
          req.body.password,
          doc.password
        );
        if (authenticate) {
          res.status(200).json({
            status: "OK",
            token:doc.token,
            message: "User Login succesfull",
          });
        } else {
          res.status(200).json({
            status: "FAILED",
            message: "User Login failed, Invalid password",
          });
        }
      } else {
        res.status(404).json({
          status: "ERROR",
          message: "Email Id doesnt exist",
        });
      }
    });
  },

};

module.exports = authController;
