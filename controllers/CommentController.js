import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export const create = async (req, res) => {
    try {
        const doc = await CommentModel.create({
            text: req.body.text,
            postId: req.params.postId,
            user: req.userId, 
        });

        await PostModel.findByIdAndUpdate(req.params.postId, {
            $push: {comments: doc._id}
        });

        res.json(doc);
    } catch (err) {
        console.error("An error when creating a comment:", err);
        res.status(500).json({
            message: "Couldn't make a comment."
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.find({postId: req.params.postId});
        res.json(comments);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "We were unable to get a comment"        
    });
};
}
