import { Router } from "express";
import UserController from "../controllers/user.controller";
import isAuth from "../middleware/isAuth";

const router = Router();

// [GET] /api/users/suggested-to-follow
// get users that are not in the current user's following list
router.get("/suggested-to-follow", isAuth, UserController.suggestedToFollow);

// [GET] /api/users/:id
// get user by id
router.get("/:id", isAuth, UserController.getUserById);

// [POST] /api/users/:id/follow
// follow a user
router.post("/:id/follow", isAuth, UserController.followUser);

// [POST] /api/users/:id/unfollow
// unfollow a user

router.post("/:id/unfollow", isAuth, UserController.unfollowUser);

export default router;
