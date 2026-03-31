import dotenv from 'dotenv'
if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}
import express from 'express';
import cors from "cors";
import mongoose from "mongoose"; // ✅ added
import candidateRouter from './routes/candidate.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import pkg from 'passport-local'; // ✅ fixed
import User from './models/user.js';
import userRouter from './routes/user.js';

const LocalStrategy = pkg.Strategy; // ✅ fixed

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173"
}));

const db_url = process.env.ATLAS_DB_URL;

main()
.then(()=> console.log("Connected to Database"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(db_url);
}

app.listen(8080,()=>{
    console.log('app is listening on 8080');
});

// ✅ fixed (removed new)
const store = MongoStore.create({
    mongoUrl: db_url,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error",(e)=>{
    console.log("Mongo Store Error:",e);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false, // ✅ improved
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }
};

app.use(session(sessionOption));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: "email" }, User.authenticate())); // ✅ better
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/candidate', candidateRouter);
app.use('/', userRouter);