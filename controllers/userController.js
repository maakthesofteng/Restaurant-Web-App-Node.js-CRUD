const User = require("../models/userSchema");
const bcrypt = require('bcryptjs');

// Get User Controller
exports.getUserController = async (req, res) => {
    try{
        const user = await User.findById({_id : req.user.id})
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User not found"
            })
        }
        // Hide Password
        user.password = undefined;
        // Get user data
        res.status(200).send({
            success : true,
            message : "User Data fetched successfully",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in fetching user data",
            error
        })
    }
}

// Update User Controller
exports.updateUserController = async (req, res) => {
    try{
        const updateUser = await User.findById({_id : req.user.id})
        if(!updateUser){
            return res.status(404).send({
                success : false,
                message : "User not found"
            })
        }
        // Update user data
        const {userName, phoneNumber} = req.body
        if(userName) updateUser.userName = userName;
        if(phoneNumber) updateUser.phoneNumber = phoneNumber;
        await updateUser.save()
        res.status(200).send({
            success : true,
            message : "User Data updated successfully",
            updateUser
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in updating user data",
            error
        })
    }
}

// Update Password Controller
exports.updatePasswordController = async (req, res) => {
    try{
        // Find user
        const user = await User.findById({_id : req.user.id})
        if(!user){
            return res.status(404).send({
                success : false,
                message : "User not found"
            })
        }
        // Update Password
        // Get data from user
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success : false,
                message : "Old Password and New Password are required"
            })
        }
        // Check old password
         const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(!isMatch){
                return res.status(500).send({
                    success: false,
                    message: "Invalid Credentials",
                })
            }
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success : true,
            message : "Password updated successfully",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false, 
            messsage : "Error in updating password",
            error
        })
    }
}

// Reset Password Controller
exports.resetPasswordController = async (req, res) => {
    try{
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success : false,
                message : "All fields are required"
            })
        }
        // Check User
        const user = await User.findOne({email, answer})
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Wrong Email or Answer"
            })
        }
        // Hash new password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success : true,
            message : "Password reset successfully",
            user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Errror in reseting password",
            error
        })
    }
}


// Delete User Controller
exports.deleteUserController = async (req, res) => {
    try{
        const userId = req.params.id
        await User.findByIdAndDelete(userId)
        res.status(200).send({
            success : true,
            message : "User deleted successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in deleting user",
            error
        })
    }
}