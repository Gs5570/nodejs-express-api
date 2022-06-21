const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({

    course_code : {
        type: String, 
        required: true},
    title : {
        type: String, 
        required: true, 
        unique: true},
    credit_hrs : {
        type: Number, 
        required:true},
    degree : {
        type : String,
        required:true},

})

module.exports = mongoose.model('course',courseSchema)