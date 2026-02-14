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

module.exports = {updateUsername}