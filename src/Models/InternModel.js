const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const internSchema = new mongoose.Schema( {

name: {
    type: String,
    required: true
}, 
email: {
    type:String,
    required:true,
    unique: true,
    match:[/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']
},

 mobile: {
    required: true,  
    type: Number,
    unique: true,
    pattern: /^[+]91(9|8|7)\d{9}$/,
    max: 10
}, 
    collegeId: {
        type: ObjectId, 
        ref: "College",
    },      
    isDeleted: {
        type: Boolean,
         default: false
    }
},{ timestamps: true});

module.exports = mongoose.model('Intern', internSchema)