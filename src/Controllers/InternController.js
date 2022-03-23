const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel");



//validation functions declaration

//function 1-
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
}

//function 2-
const isValidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0
}



//create intern-

const createIntern = async function (req, res) {

    try {
        data = req.body;

        if (!isValidRequestBody(data)) {
            res.status(400).send({ status: false, message: "Invalid request parameters. Please provide intern details" })
        }

        //extract params
        const { name, mobile, email } = data; //object destructuring

        //validation starts----

        if (!isValid(name)) {
            res.status(400).send({ status: false, message: "Name is required" })
            return
        }

        if (!isValid(mobile)) {
            res.status(400).send({ status: false, message: "mobile is required" })
            return
        }

        if (!isValid(email)) {
            res.status(400).send({ status: false, message: "email is required" })
            return
        }

        //validation ends------------
        //------

        college = data.collegeName
        if (!college) { return res.status(400).send({ status: false, message: "Please provide college name" }) }

        let checkCollege = await collegeModel.findOne({ name: college }).select({ _id: 1 })
        if (!checkCollege) return res.status(400).send({ status: false, message: "No such college exists" })
        //delete data.collegeName;

        data.collegeId = checkCollege._id;

        let internData = await internModel.create(data)
        return res.status(201).send({ status: true, message: "intern created successfully", data: internData })


    } catch (error) {
        res.status(500).send({ message: "error", error: error.message })
    }

}






//get college with interns- 

const getCollege = async function (req, res) {
    let data = req.query;

    if (!isValidRequestBody(data)) {
        res.status(400).send({ status: false, message: "Please provide college name" })
    }

    //getting college
    let newData = await collegeModel.findOne({ name: data.collegeName })

    if (!newData){
        res.status(400).send({status: false, message:"no such data exist"})
    }

    //getting interns
    let interns = await internModel.find({ collegeId: newData._id })

    if (!interns){
        res.status(400).send({status: false, message:"no such data exist"})
    }

    //adding key of interns/interests to object
    let deepCopy = JSON.parse(JSON.stringify(newData));
    deepCopy.interests = interns;  //adding this key to object


    return res.status(201).send({ status: true, data: deepCopy })

}


module.exports.createIntern = createIntern
module.exports.getCollege = getCollege






