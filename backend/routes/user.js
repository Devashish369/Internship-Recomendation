import express from "express"
import wrapAsync from "../utils/wrapAsync.js";
import { signup } from '../controllers/user.js';

const router = express.Router();

// console.log(userController);

router.route('/signup')
    .post(wrapAsync(signup))

export default router;