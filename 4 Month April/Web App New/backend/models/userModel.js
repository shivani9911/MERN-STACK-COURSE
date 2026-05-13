// mongoose is used to connect Node.js with MongoDB
// It also helps us define the structure of our data
const mongoose = require('mongoose')

// Schema defines the structure of one document (row) in MongoDB collection (table)
// This tells MongoDB what fields a User should have
const userSchema = new mongoose.Schema({

    // name field - stores the user's full name as text
    name: String,

    // city field - stores the user's city as text
    city: String,

    // mobileNo field - stores the user's mobile number as a number
    mobileNo: Number,

    // email field - stores the user's email address as text
    email: String,

    // passowrd field - stores the user's password as text
    // Note: field name is 'passowrd' (typo in original - keep same to avoid breaking)
    passowrd: String
})

// mongoose.model() creates a MongoDB collection called "Users"
// First argument "Users" is the collection name in MongoDB
// Second argument userSchema is the structure we defined above
const Users = mongoose.model("Users", userSchema)

// Export Users so we can use it in controllers to save/find/delete users
module.exports = Users
