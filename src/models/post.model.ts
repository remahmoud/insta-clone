import mongoose from "mongoose";
import type { IPost } from "../types";

const Schema = mongoose.Schema;

const Post = new Schema<IPost>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
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

export default mongoose.model<IPost>("Post", Post);
