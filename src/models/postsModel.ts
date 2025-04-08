import mongoose from "mongoose";

export interface postsT {
  title: string;
  message: string;
  creator: string;
  tags: string[];
  images: string[];
  likeCount: number;
  cart: string[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<postsT>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    tags: [String],
    images: {
      type: [String],
      required: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<postsT>("Post", postSchema);
