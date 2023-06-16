import express from "express";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourse,
  getCourseLecture,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  authorizeSubscriber,
  isAuthenticated,
} from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Get all course
router.route("/courses").get(getAllCourse);

//Create Course --only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//Get Course
router
  .route("/course/:id")
  .get(isAuthenticated, authorizeSubscriber, getCourseLecture)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;
