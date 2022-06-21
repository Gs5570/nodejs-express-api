const mongoose = require('mongoose')

const degreeSchema = mongoose.Schema({

    degreeType : {type: String, required: true, enum:['Bachelors','Masters','Doctorate']},
    degreeName : {type:String, required:true},
    department: {type: mongoose.Types.ObjectId, ref:'Department',required:true},

})

module.exports = mongoose.model('degree',degreeSchema)