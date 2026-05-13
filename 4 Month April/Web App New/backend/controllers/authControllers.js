// jsonwebtoken (jwt) is used to create a token after login/register
// Token is like a digital ID card that proves user is logged in
const jwt = require("jsonwebtoken")

// Import Users model so we can save and find users in MongoDB
const Users = require("../models/userModel")


// ----------------------
// REGISTER - Create new user account
// ----------------------
const register = async (req, res) => {
    try {
        // Read the data sent from frontend register form
        // req.body contains the data frontend sent in the request
        const { name, email, pass, city, mobileNo } = req.body

        // Check if a user with this email already exists in database
        // findOne() searches for one document that matches the condition
        const existingUser = await Users.findOne({ email: email })

        // If user already exists, stop here and send error message
        // return stops the function from running further
        if (existingUser) {
            return res.status(400).json({ message: "This Email Id Already Registered" })
        }

        // If email is new, create and save the new user in MongoDB
        // Users.create() saves a new document in the Users collection
        const user = await Users.create({
            name,
            email,
            city,
            mobileNo,
            passowrd: pass   // saving as 'passowrd' to match the schema field name
        })

        // Create a JWT token for the new user
        // jwt.sign() creates a token with userId and email stored inside it
        // process.env.JWT_SECRET_KEY is the secret key used to sign the token
        // expiresIn: "30d" means token will expire after 30 days
        const token = jwt.sign(

            { userId: user._id, email: email },


            process.env.JWT_SECRET_KEY,


            { expiresIn: "30d" }


        )

        // Send success response with user data and token back to frontend
        // status 201 means "Created" - new resource was created successfully
        res.status(201).json({
            message: "Register Account successful",
            data: user,
            token: token
        })

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(404).json({
            message: "Error while Register Account",
            error: error.message
        })
    }
}


// ----------------------
// LOGIN - Check user credentials and return token
// ----------------------
const login = async (req, res) => {
    try {
        // Read email and password sent from frontend login form
        const { email, pass } = req.body

        // Search for user in database with matching email AND password
        // If both match, user is found. If not, user will be null
        const user = await Users.findOne({ email, passowrd: pass })

        // Create a JWT token
        // user?._id uses optional chaining - if user is null, it won't crash
        const token = jwt.sign(
            { userId: user?._id, email: email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )

        // If user was found in database, login is successful
        if (user) {
            res.status(201).json({
                message: "Login successful",
                token: token   // send token to frontend so it can save in localStorage
            })
        } else {
            // If user not found, send error response
            res.status(404).json({
                message: "Login failed - wrong email or password"
            })
        }

    } catch (error) {
        // If any error happens, print it and send error response
        console.log(error)
        res.status(404).json({
            message: "Error while Login",
            error: error.message
        })
    }
}

// Export both functions so we can use them in server.js
module.exports = { login, register }
