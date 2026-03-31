import express from "express"
import wrapAsync from "../utils/wrapAsync.js";
import { signup,login,logout } from '../controllers/user.js';
import passport from "passport";

const router = express.Router();

// console.log(userController);

router.route('/signup')
    .post(wrapAsync(signup))

router.route('/login')
    .post(passport.authenticate('local',{
    }),login);

router.post('/logout',logout);
export default router;