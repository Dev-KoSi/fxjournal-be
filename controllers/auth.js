const User = require('../model/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const signUp = async (req, res) => {
    function isValidPassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return passwordRegex.test(password);
    }

    try {
        const {email, password} = req.body;

        if(!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: `Invalid email!`
            })
        };

        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: `User is already registered, log in.`
            })
        };

        if(!isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                message: `Weak password!`
            })
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            password: hashPassword
        });

        if(newUser) {
            return res.status(200).json({
                success : true,
                message : `Account created successfully, log in.`,
                user : newUser
            })
        } else {
            res.status(400).json({
                success : false,
                message : `Something went wrong, try again.`
            });
        }
        

    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Something went wrong, please try again.`,
            error : error
        })
    }
}

const logIn = async (req, res) => {
    try {
        const {email, password} = req.body;

        const checkUser = await User.findOne({email});

        if(!checkUser) {
            return res.status(400).json({
                success: false,
                message : `User does not exist, sign up.`
            })
        }

        const checkpassword = await bcrypt.compare(password, checkUser.password);

        if(!checkpassword) {
            return res.status(400).json({
                success: false,
                message: `Wrong password!`
            })
        }

        const accessToken = await jwt.sign({
            userId: checkUser._id,
            email : checkUser.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '30d'
        })

        res.status(200).json({
            success : true,
            message : `Logged in successfully, you are welcome.`,
            email : checkUser.email,
            accessToken,
            userId : checkUser._id
        });
        
    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Something went wrong, please try again.`,
            error : error
        })
    }
}

module.exports = {signUp, logIn}



























// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/google/callback"
//     },
//         function(accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//         });
//     }
// ));