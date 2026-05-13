// mongoose is a library that helps Node.js talk to MongoDB database
// It makes it easy to save, find, update and delete data in MongoDB
const mongoose = require('mongoose')

// connectDB is a function that connects our server to MongoDB
const connectDB = () => {
    try {
        // mongoose.connect() connects to MongoDB using the URL from .env file
        // process.env.MONGO_DB_URL is the MongoDB connection string stored in .env
        // Example URL: mongodb://127.0.0.1:27017/item-database
        mongoose.connect(process.env.MONGO_DB_URL)

            // .then() runs if connection is successful - prints success message
            .then(() => console.log("Mongo DB Connected"))

            // .catch() runs if connection fails - prints the error
            .catch((error) => console.log(error))

    } catch (error) {
        // If any unexpected error happens, print it in console
        console.log(error)
    }
}

// Export connectDB so we can use it in server.js
module.exports = { connectDB }
