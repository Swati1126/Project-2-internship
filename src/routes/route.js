const express = require ('express');
const router = express.Router();

const collegeController= require("../Controllers/CollegeController")
const internController= require("../Controllers/InternController")





router.post("/colleges", collegeController.createCollege)
router.post("/interns", internController.createIntern)
router.get("/collegeDetails", internController.getCollege)




module.exports = router;