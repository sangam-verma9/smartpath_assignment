const Course = require("../models/courseModel");

// get courses
exports.getcourses = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const courses = await Course.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json({ success: true, courses });
    } catch (err) {
        res.status(500).send(err);
    }
};

// get course by id
exports.getcourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json(course);
    } catch (err) {
        res.status(500).send(err);
    }

}


// create a new course
exports.createCourse=async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).send(err);
    }
}

// update course 
exports.updatecourse=async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json({success:true,course});
    } catch (err) {
        res.status(400).send(err);
    }
}

// delete course 
exports.deletecourse=async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send('Course not found');
        res.status(200).json({success:true,course});
    } catch (err) {
        res.status(500).send(err);
    }
}