import mongoose, { Schema, model } from "mongoose";

export interface commentT {
  postId: mongoose.Schema.Types.ObjectId;
  comment: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<commentT>(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Comment = model<commentT>("Comment", commentSchema);
