
const mongoose = require('mongoose')

const assignCourseSchema = mongoose.Schema({

    instructor: {type: String ,required: true},
    course: {type: String,required: true},
    section : {type: String, required: true},
    studentLimit: {type: Number, required: true},
    enrolledStudents: {type: Number, required:true}
})

module.exports = mongoose.model('assignCourse',assignCourseSchema)