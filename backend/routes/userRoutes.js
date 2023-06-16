import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgetpassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removedFromPlaylist,
  resetpassword,
  updateProfile,
  updateProfilePicture,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Register
router.route("/register").post(singleUpload, register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

//getProfile
router.route("/me").get(isAuthenticated, getMyProfile);

//Delete Profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//change Password
router.route("/changePassword").put(isAuthenticated, changePassword);

//Update Profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// ForgetPassword
router.route("/forgetpassword").post(forgetpassword);

//ResetPassword
router.route("/resetpassword/:token").put(resetpassword);

// AddtoPlaylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist
router
  .route("/removefromplaylist")
  .delete(isAuthenticated, removedFromPlaylist);

// Admin Routes
router.route("/admin/users").get(isAuthenticated, authorizeAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeAdmin, updateUserRole)
  .delete(isAuthenticated, authorizeAdmin, deleteUser);

export default router;
