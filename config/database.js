const mongoose = require("mongoose")

const connection = async()=> {
    try {
        await mongoose.connect("mongodb+srv://eddi4ferderef:QYnbSEQrPfot4SbQ@cluster0.ksqksy0.mongodb.net/volindo")
        console.log("DB connected!");
    } catch (error) {
        console.log("error in DB");
    }
}

module.exports = connection