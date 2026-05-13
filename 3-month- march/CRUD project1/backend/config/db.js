const mongoose = require('mongoose')

const connectDB = () => {
    try {

        //mongoos use moongodb connect
        mongoose.connect("mongodb://localhost:27017/item-database")

            //if connection successful show message in console
            .then(() => console.log("MongoDB connected"))

            //if error occurs print error
            .catch((error) => console.log(error))


    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB }