import User from "../models/user.model";
import { Request, Response } from "express";

class UserController {
    // [GET] /api/users/suggested-to-follow
    // get users that are not in the current user's following list
    async suggestedToFollow(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            // get users that are not in the current user's following list
            // and limit the results to 5
            const users = await User.find()
                .where("_id")
                .ne(user._id)
                .where("_id")
                .nin(user.following)
                .limit(2);

            // return the users
            return res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    // [GET] /api/users/:id
    // get user by id
    async getUserById(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            // check if user exists
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            // return the user
            return res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    // [POST] /api/users/:id/follow
    // follow a user
    async followUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);
            // check if user exists
            if (!user || !currentUser) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            // check if the user is already followed
            if (user.followers.includes(currentUser.id)) {
                return res.status(400).json({
                    message: "User already followed",
                });
            }

            // add the current user to the user's followers list
            user.followers.addToSet(currentUser._id);

            // add the user to the current user's following list
            currentUser.following.addToSet(user._id);

            // save the user
            await user.save();
            await currentUser.save();

            // return response
            return res.status(200).json({ message: "User followed" });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    // [POST] /api/users/:id/unfollow
    // unfollow a user

    async unfollowUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.user.id);

            // check if user exists
            if (!user || !currentUser) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            // check if the user is already followed
            if (!user.followers.includes(currentUser.id)) {
                return res.status(400).json({
                    message: "User not followed",
                });
            }

            // remove the current user from the user's followers list
            user.followers.pull(currentUser._id);

            // remove the user from the current user's following list
            currentUser.following.pull(user._id);

            // save the user
            await user.save();
            await currentUser.save();

            // return response
            return res.status(200).json({ message: "User unfollowed" });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}

export default new UserController();
