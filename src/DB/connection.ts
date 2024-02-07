const dotenv = require('dotenv');
dotenv.config()
const mongoose = require('mongoose')



const { MONGO_PASS, MONGO_USER, DB_NAME } = process.env

const mongo_uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.uq02s3f.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const connect = async () => {
    try {
        await mongoose.connect(mongo_uri)
        console.log("connected to db")

    } catch (error) {
        console.error(error)
    }
}

export default connect

