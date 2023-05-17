import { Request } from "express";
import { Document, Model, Types } from "mongoose";

export interface IComment extends Document {
    user: Types.ObjectId;
    post: Types.ObjectId;
    text: string;
}

export interface IPost extends Document {
    user: Types.ObjectId;
    caption: string;
    image: string;
    likes: Types.DocumentArray<IUser>;
    comments: Types.DocumentArray<IComment>;
}
export interface IUser extends Document {
    fname: string;
    lname: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    followers: Types.DocumentArray<IUser>;
    following: Types.DocumentArray<IUser>;
    posts: Types.DocumentArray<IPost>;
}
export interface IUserMethods {
    generateToken(): string;
    comparePassword(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser, {}, IUserMethods> {}

export interface IRegister extends Request {
    body: {
        fname: string;
        lname: string;
        username: string;
        email: string;
        password: string;
    };
}
export interface ILogin extends Request {
    body: {
        email: string;
        password: string;
    };
}
