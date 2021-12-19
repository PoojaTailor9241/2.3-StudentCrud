const mongoose = require("../config/db");

const schema = mongoose.Schema;

const StudentSchema = new schema({
    name:String,
    age:Number,
    email:String,
    password:String
});

const Student = mongoose.model("Student",StudentSchema);

module.exports = Student;