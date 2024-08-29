const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
    word: {
        type:String,
        required:true,
        unique: [true, 'Word already present in list'],
    },
    meaning: {
        type:String,
        required:true,
    },
    synonyms: {
        type : String,
        required: true,
    },
    antonyms: {
        type : String,
        required: true,
    },
    example :{
        type : String,
        required: true,
    }
   
}, {
    timestamps: true,
    timeseries: true,
});

module.exports = mongoose.model("Word",wordSchema);