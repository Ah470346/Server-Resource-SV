const mongoose =require('mongoose');
const { Schema } = mongoose;

    const userSchema = new Schema({
        id: String,
        username: String,
        password: String
    });

    const User = mongoose.model('User', userSchema,"User");
module.exports = User;