import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { buySubscription, cancelSubscribe, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";

const router = express.Router();

//Buy Subscription
router.route("/subscribe").get(isAuthenticated,buySubscription)


//Verfiy payment and save reference in DB
router.route("/paymentverification").post(isAuthenticated,paymentVerification)

//Get Key
router.route("/razorpaykey").get(getRazorPayKey)


//Cancel Verification
router.route("/subscribe/cancel").delete(isAuthenticated,cancelSubscribe);


export default router;
