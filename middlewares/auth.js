const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthUser = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            res.status(401).send({success: false, message:"Invalid token or Expired token"})
            return new Error;
        }
        const decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decodedData.id);
        next();
        
    } catch (error) {
        res.status(500).send({success: false, message:"Invalid User"})
    }

};