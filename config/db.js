const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser:true})
let db = mongoose.connection;
db.on("open",() => {
    console.log("Connected");
})

module.exports = mongoose;