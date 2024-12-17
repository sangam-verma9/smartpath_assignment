const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"],
        minLength: [3, "name should not less than 3 character"],
        maxLength: [20, "name should not max than 20 character"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validate: [validator.isEmail, "please enter correct email address"],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "password should be greater or equal to 6 character"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        // if we not modify password then not hash again
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
});

//generate jwt token
userSchema.methods.generatejwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

//password match
userSchema.methods.passwordCompare = async function (enteredpassword) {
    return await bcryptjs.compare(enteredpassword, this.password);
};


module.exports = mongoose.model("user", userSchema);
