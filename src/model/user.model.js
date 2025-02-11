import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true , "Provide Name"],
        trim: true
    },
    lastname: {
        type: String,
        require: [true , "Provide Name"],
        trim: true
    },
    email: {
        type: String,
        require: [true , "Provide Email"],
        trim: true

    },
    password: {
        type: String,
        require: [true , "Provide Password"],
        trim: true

    },
   
    refresh_token: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ["Pending", "Resolved" , "Closed"],
        default: 'Pending',
    },
    
    role: {
        type: String,
        enum: ["ADMIN", "USER"], // Removed the extra space from " USER"
        default: "USER",
    }
    

},{timestamps: true});

userSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next();
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_TIME
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
   
        return jwt.sign(
            {
                _id: this._id,
                // Include additional user data if needed
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
        );
    
};


export const UserModel = mongoose.model('User', userSchema);

