const uploadToCloudinary = require('../config/cloudinaryHelper');
const Logs = require('../model/log');

const postLog = async (req, res) => {
    try {
        const userId = req.params.id;
        const {caption} = req.body;
        let url = null;
        let publicId = null;

        if(req.file) {
            const result = await uploadToCloudinary(req.file.path);

            if(result) {
                url = result.url;
                publicId = result.publicId;
            }
        }

        const newLog = await Logs.create({
            image: {
                url: url,
                publicId: publicId
            },
            caption,
            fav: false,
            postedBy: userId
        })

        if(newLog) {
            return res.status(200).json({
                success: true,
                message: 'Log posted successfully.',
                image: newLog.image.url,
                caption: newLog.caption,
                postedBy: newLog.postedBy
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Something went wrong, try again.`
            })
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : `Something went wrong, try again.`
        })
    }
};

const getLogs = async (req, res) => {
    try {
        const {userId} = req.body;

        const allLogs = await Logs.find({
            loggedBy: userId
        });

        if(allLogs) {
            return res.status(200).json({
                success : true,
                message : `Logs retrieved successfully!`,
                allLogs : allLogs || null
            });
        } else {
            return res.status(401).json({
                success : false,
                message : `Something went wrong, try again.`
            });
        }
        
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success : false,
            message : `Something went wrong, try again.`
        })
    }
}

const updateLog = async (req, res) => {
    try {
        const logId = req.params.id;
        const {newCaption} = req.body;

        const updatedCaption = await Logs.findByIdAndUpdate(logId, {caption: newCaption}, {new: true});

        if(updatedCaption) {
            return res.status(200).json({
                success: true,
                message: `Caption updated successfully.`,
                newCaption: updatedCaption.caption
            })
        } else {
            res.status(400).json({
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

const updateFav = async (req, res) => {
    try {
        const logId = req.params.id;

        const favLog = await Logs.findById(logId);

        if(favLog) {
            favLog.fav = !favLog.fav;

            await favLog.save();

            return res.status(200).json({
                success: true,
                message: favLog.fav == true ? `Log added to Favourite.` : favLog.fav == false ? `Log removed from Favourite` : ``,
                fav: favLog.fav
            })
        } else {
            res.status(400).json({
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

module.exports = {postLog, updateLog, updateFav, getLogs};