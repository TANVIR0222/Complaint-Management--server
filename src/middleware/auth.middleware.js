import { UserModel } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


// verify Token
export const verifyToken = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token , process.env.JWT_ACCESS_SECRET_KEY);
    
        const user = await UserModel.findById(decodedToken._id).select('-password  -refreshToken' )
        if (!user) {
            throw new ApiError(404, "User not found");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized request");
    }
})
