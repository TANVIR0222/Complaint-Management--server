import { Router } from "express";
import { getSingleUser, loginUser, logoutUser, refreshAccessToken, registerUser, } from "../controller/user.controller.js";

const router = Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/single-user/:id').get(getSingleUser)


// secured routes
router.route('/logout').post(logoutUser)
router.route('/refresh-token').post( refreshAccessToken )

export default router;