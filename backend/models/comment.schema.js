import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema( {
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

