const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createAndSendToken = (user, statusCode, res)=> {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    res.status(statusCode).json({
        success: true,
        token,
        user
    });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if email and password exist
        if (!email || !password) {
            res.status(401).json({
                status: "failed",
                message: "Please enter your correct credentials"
            });;
        }

        //Check if user exists && password is correct
        const user = await User.findOne({ email })
    
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                status: "failed",
                message: "Please enter your correct credentials"
            });;
        };

        user.password = undefined
    
        //Create and sending token to client
        createAndSendToken(user, 200, res);

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
    
  };
  

exports.register = async (req, res, next)=> {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
    
        newUser.password = undefined
        newUser.passwordConfirm = undefined

        createAndSendToken(newUser, 201, res);
        
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        });
    }
    
};

exports.verifyToken = async(req, res, next)=> {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access denied")
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
};


  

