const mongoose =require('mongoose');
const { Schema } = mongoose;

    const modelRunSchema = new Schema({
        name: String,
        GB_Model: Number,
        Device:Number,
        IP_SV: String,
        Server_Run: String,
        Main_SV: String,
        Backup_SV: String,
        Status: Number,
        number_run: Number,
        time_run: String,
        time_start: String,
        time_stop: String
    });

    const Model = mongoose.model('Model', modelRunSchema,"Model");
module.exports = Model;