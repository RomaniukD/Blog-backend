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
        console.error("помилка при створенні коментаря:", err);
        res.status(500).json({
            message: "Не вдалось створити коментар"
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const comments = await CommentModel.find({postId: req.params.postId});
        res.json(comments);
        console.log("Коментарі з CommentController", comments)
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Не вдалось отримати коментарі"        
    });
};
}