import express from "express";
import {
  getAllUser,
  signUp,
  signIn,
  getOneUserById,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/:id", getOneUserById);
export default router;
