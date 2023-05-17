import mongoose from "mongoose";
import type { IComment } from "../types";

const Schema = mongoose.Schema;

const Comment = new Schema<IComment>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        text: {
            type: String,
            trim: true,
            required: [true, "Text is required"],
        },
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

export default mongoose.model<IComment>("Comment", Comment);
