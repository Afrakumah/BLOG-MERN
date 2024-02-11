import User from '../models/user.model.js'
import asyncHandler from "express-async-handler";
import bcryptjs from 'bcryptjs'



export const signup = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const {username, email, password } =req.body;

    if(!username || !email || !password || username === "" || email === "" || password === "") {
        return res.status(400).json({message: "All fields are required"})
    }


//hashing password
const hashedPassword = bcryptjs.hashSync(password, 10)



    //storing new user's model in database
    const newUser = new User({
        username,
        email,
        password:hashedPassword
    });

    await newUser.save()
    res.json('signup successful')
})