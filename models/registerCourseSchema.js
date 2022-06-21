const mongoose = require('mongoose')

const registerCourseSchema = mongoose.Schema({

    student: {type: String,required:true},
    courseDetail : {type: String, required: true,unique: true}
})

module.exports = mongoose.model('registerCourse',registerCourseSchema)