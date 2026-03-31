import User from "../models/user.js";

export const signup = async (req, res, next) => {
    try {
        console.log(req.body);

        const { email, role, password } = req.body;

        const user = new User({ email, role });

        const registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            console.log("Success");

            res.status(201).json({
                message: "User registered successfully",
                user: registeredUser
            });
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }
};