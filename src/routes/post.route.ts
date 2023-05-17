import { Router } from "express";
import PostController from "../controllers/post.controller";
import upload from "../middleware/upload";
import isAuth from "../middleware/isAuth";
import validator from "../middleware/validator";
import * as schema from "../lib/schema";

const router = Router();

// [GET] /posts/thread
// get posts of users that the current user follows
router.get("/thread", isAuth, PostController.getThread);

// [GET] /posts/:id
// get post by id
router.get("/:id", isAuth, PostController.getPostById);

// [POST] /posts/create
// create post
router.post(
    "/create",
    isAuth,
    upload.single("image"),
    validator(schema.post),
    PostController.create
);

// [DELETE] /posts/remove/:id
// delete post
router.delete("/remove/:id", isAuth, PostController.delete);

// [POST] /posts/like/:id
// like post
router.post("/like/:id", isAuth, PostController.like);

// [POST] /posts/unlike/:id
// unlike post
router.post("/unlike/:id", isAuth, PostController.unlike);

// [POST] /posts/comment/:id
// comment on post
router.post("/comment/:id", isAuth, PostController.creatComment);

// [DELETE] /posts/comment/:id/:commentId
// delete comment
router.delete("/comment/:id/:commentId", isAuth, PostController.deleteComment);

export default router;
