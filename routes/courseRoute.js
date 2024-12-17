const express = require("express");
const { getcourses, createCourse, getcourse, updatecourse, deletecourse } = require("../controllers/courseController");

const router = express.Router();

router.route("/courses").get(getcourses);
router.route("/course/:id").get(getcourse);
router.route("/course").post(createCourse);
router.route("/course/:id").put(updatecourse);
router.route("/course/:id").delete(deletecourse);

module.exports = router;