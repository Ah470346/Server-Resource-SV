const mongoose =require('mongoose');
const { Schema } = mongoose;

    const inforSchema = new Schema({
        status:Number
    });

    const Infor = mongoose.model('Infor', inforSchema,"Infor");
module.exports = Infor;