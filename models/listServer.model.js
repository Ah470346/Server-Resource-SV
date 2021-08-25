const mongoose =require('mongoose');
const { Schema } = mongoose;

    const listServerSchema = new Schema({
    name:  String,
    Device: Number,
    GB:   Number,
    Path: String,
    U_GB: Number,
    Status: Number,
    });

    const Server = mongoose.model('Server', listServerSchema,"Server");
module.exports = Server;