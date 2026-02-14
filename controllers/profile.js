const User = require('../model/user');

const updateUsername = async (req, res) => {
    try {
        const userId = req.params.id;
        const {newUsername} = req.body;

        const updatedUsername = await User.findByIdAndUpdate(userId, {username: newUsername}, {new: true});

        if(updatedUsername) {
            return res.status(200).json({
                success: true,
                message: `Username updated successfully.`,
                newUsername: updatedUsername.username
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

const updateBio = async (req, res) => {
    try {
        const userId = req.params.id;
        const {newBio} = req.body;

        const updatedBio = await User.findByIdAndUpdate(userId, {bio: newBio}, {new: true});

        if(updatedBio) {
            return res.status(200).json({
                success: true,
                message: `Bio updated successfully.`,
                newBio: updatedBio.bio
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
                message: `User deleted successfully.`,
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

module.exports = {updateUsername, updateBio, deleteUser};