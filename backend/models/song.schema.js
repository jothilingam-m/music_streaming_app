import mongoose from "mongoose";

const song = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    genre: {
        type: String,
    },
    duration: {
        type: String,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    movieName: {
        type: String,
    },
    releaseYear: {
        type: Number,
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },

},{ timestamps: true }

);

const Song = mongoose.model('Song', song);

export default Song;

