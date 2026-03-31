import mongoose from "mongoose";
import pkg from "passport-local-mongoose";

const passportLocalMongoose = pkg.default || pkg;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim: true,
        unique: true   
    },
    role: {
        type: String,
        enum: ["recruiter", "candidate"],
        required: true
    }
});
console.log(typeof passportLocalMongoose);

userSchema.plugin(passportLocalMongoose, {
    usernameField: "email"
});

export default mongoose.model("User", userSchema);