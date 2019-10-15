const mongoose = require('mongoose');

const  UserSchema = mongoose.Schema(
    { 
        username: { type : String , unique : true, required : true },
        password:  { type : String , required : true },
        student_id: String,
        full_name: String,
        class_id: String,
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('user', UserSchema);