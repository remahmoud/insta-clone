import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import type { IUser, IUserModel, IUserMethods } from "../types";

const Schema = mongoose.Schema;

const User = new Schema<IUser, IUserModel, IUserMethods>(
    {
        fname: {
            type: String,
            trim: true,
            required: [true, "First name is required"],
        },
        lname: {
            type: String,
            trim: true,
            required: [true, "Last name is required"],
        },
        username: {
            type: String,
            trim: true,
            required: [true, "Username is required"],
            unique: true,
        },
        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            select: false,
            required: [true, "Password is required"],
        },
        avatar: {
            type: String,
            default:
                "https://i.pravatar.cc/150?img=" +
                Math.floor(Math.random() * 70).toString(),
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: function (doc, ret) {
                delete ret._id;
                return ret;
            },
            virtuals: true,
        },
    }
);

// hash password before saving
User.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error: any) {
        return next(error);
    }
});

// compare password
User.methods.comparePassword = async function (password: string) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error: any) {
        throw new Error(error);
    }
};

// generate token
User.methods.generateToken = function (this: IUser) {
    try {
        return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    } catch (error: any) {
        throw new Error(error);
    }
};

// get full name
User.virtual("fullname").get(function (this: IUser) {
    return `${this.fname} ${this.lname}`;
});

export default mongoose.model<IUser, IUserModel>("User", User);
