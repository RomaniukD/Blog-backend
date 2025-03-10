import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
    imageUrl: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.pre('save', function(next) {
  if (this.createdAt) {
    this.createdAt = new Date(this.createdAt).toISOString().split('T')[0];
  }
  next();
});

export default mongoose.model('Post', PostSchema);