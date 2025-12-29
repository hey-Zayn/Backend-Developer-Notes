const mongoose = require('mongoose');


const connectionDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log(`Connected to MongoDB ${mongoose.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectionDB


