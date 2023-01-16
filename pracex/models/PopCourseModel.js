const mongoose = require("mongoose");


const PopCourseSchema = new mongoose.Schema({
    id: { type: Number, default: 0 },
    img : { type: String, required: true },
    url : { type: String, required: true },
    title : { type: String, required: true },
    special : { type: Number, default: 0 },
    text: { type: String, required: true },
    star : { type: Number, default: 0 },
    ratecount :{ type: Number, default: 0 },
    students : { type: Number, default: 0 },
    videLength :{ type:Decimal128 , default: 0 },
    teacher : { type: String, required: true }
});