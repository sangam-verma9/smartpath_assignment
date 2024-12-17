const express = require("express");
const { getquizzes, createquiz, getquizbyid, updatequiz, deletequiz, takequiz } = require("../controllers/quizController");

const router = express.Router();

router.route("/course/:courseId/quizzes").get(getquizzes);
router.route("/course/:courseId/quiz").post(createquiz);
router.route("/quiz/:id").get(getquizbyid);
router.route("/quiz/:id").put(updatequiz);
router.route("/quiz/:id").delete(deletequiz);
router.route("/quiz/:id/submit").post(takequiz);

module.exports = router;