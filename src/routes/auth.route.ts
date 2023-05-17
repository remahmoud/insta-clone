import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import isAuth from "../middleware/isAuth";
import validator from "../middleware/validator";
import * as schema from "../lib/schema";

const router = Router();

router.get("/me", isAuth, AuthController.me);
router.post("/login", validator(schema.login), AuthController.login);
router.post("/register", validator(schema.register), AuthController.register);

export default router;
