const User = require('../model/user');

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const {newUsername, newBio} = req.body;

        const updatedProfile = await User.findByIdAndUpdate(userId, {username: newUsername, bio: newBio}, {new: true});

        if(updatedProfile) {
            return res.status(200).json({
                success: true,
                message: `Profile updated successfully.`,
                newProfile: {
                    username: updatedProfile.username,
                    bio: updatedProfile.bio
                }
            })
        } else {
            return res.status(400).json({
                success : false,
                message : `Something went wrong, try again.`
            })
        }
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : `Something went wrong, try again.`
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const delUser = await User.findByIdAndDelete(userId);

        if(delUser) {
            return res.status(200).json({
                success: true,
                message: `Account deleted successfully.`,
                deletedUser: {
                    email: delUser.email,
                    username: delUser.username
                }
            })
        } else {
            return res.status(400).json({
                success : false,
                message : `Something went wrong, try again.`
            })
        }
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : `Something went wrong, try again.`
        })
    }
}

module.exports = {updateProfile, deleteUser};