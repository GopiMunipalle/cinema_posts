import { Schema, model, Types } from "mongoose";

export interface SubCommentT {
  commentId: Types.ObjectId;
  subComment: string;
  userId: number;
  replies: Types.ObjectId[];
  depth: number;
  parentSubCommentId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const subCommentSchema = new Schema<SubCommentT>(
  {
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    subComment: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubComment",
      },
    ],
    depth: {
      type: Number,
      required: true,
      default: 0,
    },
    parentSubCommentId: {
      type: Schema.Types.ObjectId,
      ref: "SubComment",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<SubCommentT>("SubComment", subCommentSchema);
