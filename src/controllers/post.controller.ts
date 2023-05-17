import { Request, Response } from "express";
import User from "../models/user.model";
import Post from "../models/post.model";
import Comment from "../models/comment.model";

class PostController {
    // [GET] /posts/thread
    // get posts of users that the current user follows
    async getThread(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get posts of users that the current user follows
            const posts = await Post.find({ user: { $in: user.following } })
                .populate("user")
                .sort({ createdAt: -1 })
                .limit(10);

            // return posts
            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // [GET] /posts/:id
    // get post by id
    async getPostById(req: Request, res: Response) {
        try {
            // get post by id
            const post = await Post.findById(req.params.id)
                .populate("user")
                .populate({
                    path: "comments",
                    populate: { path: "user" },
                });

            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // return post
            return res.status(200).json(post);
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }

    // [POST] /posts/create
    // create post
    async create(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get photo
            const photo = req.file;
            // check if photo exists
            if (!photo) {
                return res.status(400).json({ error: "Photo required" });
            }

            const image = `/${photo.destination}${photo.filename}`;

            // create post
            let post = await Post.create({
                image,
                user: req.user.id,
                caption: req.body.caption,
            });

            // add post to user's posts
            user.posts.addToSet(post._id);
            await user.save();

            // [!] populate post with user
            post = await post.populate("user");

            // return post
            return res.status(201).json(post);
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
    // [DELETE] /posts/remove/:id
    // delete post
    async delete(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);

            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get post by id
            const post = await Post.findById(req.params.id);

            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // check if user is the owner of the post
            if (post.user.toString() !== user._id.toString()) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            // delete post
            await post.deleteOne();

            // remove post from user's posts
            user.posts.pull(post._id);
            await user.save();

            // return message
            return res.status(200).json({ message: "Post deleted" });
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
    // [POST] /posts/like/:id
    // like post
    async like(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get post by id
            const post = await Post.findById(req.params.id);
            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // check if user already liked the post
            if (post.likes.includes(user._id)) {
                return res.status(400).json({ error: "Post already liked" });
            }

            // like post
            post.likes.addToSet(user._id);
            await post.save();

            // return message
            return res.status(200).json({ message: "Post liked" });
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
    // [POST] /posts/unlike/:id
    // unlike post
    async unlike(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get post by id
            const post = await Post.findById(req.params.id);
            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // check if user already liked the post
            if (!post.likes.includes(user._id)) {
                return res.status(400).json({ error: "Post not liked" });
            }

            // unlike post
            post.likes.pull(user._id);
            await post.save();

            // return message
            return res.status(200).json({ message: "Post unliked" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // [POST] /posts/comment/:id
    // comment on post
    async creatComment(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get post by id
            const post = await Post.findById(req.params.id);
            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // create comment
            let comment = await Comment.create({
                user: user._id,
                post: post._id,
                text: req.body.text,
            });

            // add comment to post's comments
            post.comments.addToSet(comment._id);
            await post.save();

            // [!] populate comment with user
            comment = await comment.populate("user");

            // return comment
            return res.status(201).json(comment);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // [DELETE] /posts/comment/:id/:commentId
    // delete comment
    async deleteComment(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // get post by id
            const post = await Post.findById(req.params.id);
            // check if post exists
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // get comment by id
            const comment = await Comment.findById(req.params.commentId);
            // check if comment exists
            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            // check if user is the owner of the comment
            if (comment.user.toString() !== user._id.toString()) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            // delete comment
            await comment.deleteOne();

            // remove comment from post's comments
            post.comments.pull(comment._id);
            await post.save();

            // return message
            return res.status(200).json({ message: "Comment deleted" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new PostController();
