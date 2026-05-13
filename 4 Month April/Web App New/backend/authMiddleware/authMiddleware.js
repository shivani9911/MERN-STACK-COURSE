// jsonwebtoken (jwt) is used to create and verify tokens
// Token is like a digital ID card that proves user is logged in
const jwt = require("jsonwebtoken")

// authMiddleware is a function that runs BEFORE protected routes
// It checks if the request has a valid token
// req = incoming request, res = response we send back, next = go to next function
const authMiddleware = async (req, res, next) => {
    try {
        // Read token from request headers
        // Frontend sends token in "x-auth-token" header
        // OR in "Authorization" header as "Bearer <token>" - we remove "Bearer " part
        const token = req.header("x-auth-token") || req.header("Authorization")?.replace("Bearer ", "")

        // Check if token exists
        if (token) {

            // jwt.verify() checks if the token is valid and not expired
            // process.env.JWT_SECRET_KEY is the secret key used to verify the token
            // decode contains the data we stored inside the token (userId, email)
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // Print decoded token data in console for debugging
            console.log(decode, "=== ==>")

            // Save the userId from token into req object
            // Now any controller function can use req.userId to know who is logged in
            req.userId = decode.userId

            // next() means "token is valid, go ahead and run the next actual route function"
            next()

        } else {
            // If no token found, send 401 Unauthorized response
            // 401 means user is not authenticated
            res.status(401).json({ message: "No token available" })
        }

    } catch (error) {
        // If token is invalid or expired, print error in console
        console.log(error)
    }
}

// Export authMiddleware so we can use it in server.js
module.exports = authMiddleware
