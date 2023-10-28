const mongoose = require("mongoose")
require("dotenv").config()
const connectionn = mongoose.connect(process.env.Mongo_Url)

module.exports={connectionn}