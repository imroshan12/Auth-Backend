import express from "express";
import userRouter from "./userRouter.js";
import profileRouter from "./profileRouter.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/profile", profileRouter);

export default router;
