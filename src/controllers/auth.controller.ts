import User from "../models/user.model";
import { Request, Response } from "express";
import type { ILogin, IRegister } from "../types";

class AuthController {
    async register(req: IRegister, res: Response) {
        try {
            // check if email is taken
            const isEmailTaken = await User.findOne({ email: req.body.email });
            // return error if email is taken
            if (isEmailTaken) {
                return res
                    .status(400)
                    .json({ error: "Email is already taken" });
            }
            // check if username is taken
            const isUsernameTaken = await User.findOne({
                username: req.body.username,
            });
            // return error if username is taken
            if (isUsernameTaken) {
                return res
                    .status(400)
                    .json({ error: "Username is already taken" });
            }
            // create user
            const user = await User.create({ ...req.body });
            // generate token
            const token = user.generateToken();
            // return token
            return res.status(201).json({ token });
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
    async login(req: ILogin, res: Response) {
        try {
            // check if user exists
            const user = await User.findOne({ email: req.body.email }).select(
                "+password"
            );
            // return error if user does not exist
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            // check if password is valid
            const isPasswordValid = await user.comparePassword(
                req.body.password
            );
            // return error if password is invalid
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid password" });
            }
            // generate token
            const token = user.generateToken();
            // return token
            return res.status(200).json({ token });
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
    async me(req: Request, res: Response) {
        try {
            // get user
            const user = await User.findById(req.user.id);
            // return user
            return res.status(200).json(user);
        } catch (error: any) {
            // return error
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new AuthController();
