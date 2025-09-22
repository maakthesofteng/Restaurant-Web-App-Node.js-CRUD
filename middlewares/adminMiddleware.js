// const userSchema = require("../models/userSchema");

// module.exports = async (req, res, next) => {
//   try {
//      const user = await userSchema.findById(req.body.id)
//      if(user.userType !== 'admin'){
//         return res.status(404).send({
//             success : false,
//             message : "Only Adimn can access",
//             user
//         })
//      }else{
//         next();
//      }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Un-Authorized Access",
//       error
//     });
//   }
// };


const User = require("../models/userSchema");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    if (user.userType !== "admin") {
      return res.status(403).send({
        success: false,
        message: "Only Admin can access"
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Un-Authorized Access",
      error
    });
  }
};

