const uploadToCloudinary = require('../config/cloudinaryHelper');
const Posts = require('../model/log');

const postLog = async (req, res) => {
    try {
        const userId = req.params.id;
        const {caption} = req.body;
        let url = null;
        let publicId = null;

        if(req.file.path) {
            const result = await uploadToCloudinary(req.file.path);

            if(result) {
                url = result.url;
                publicId = result.publicId;
            }
        }

        const newLog = await Posts.create({
            image: {
                url: url,
                publicId: publicId
            },
            caption,
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

module.exports = postLog;