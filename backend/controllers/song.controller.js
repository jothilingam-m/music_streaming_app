import Song from "../models/song.schema.js";
import User from "../models/user.schema.js";

// Get all songs with search and filter functionality
export const getAllSongs = async (req, res) => {
    try {
        const { search, genre, artist, album, movieName, releaseYear } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { artist: { $regex: search, $options: 'i' } },
                { album: { $regex: search, $options: 'i' } },
                { movieName: { $regex: search, $options: 'i' } },
            ];
        }

        if (genre) query.genre = { $regex: genre, $options: 'i' };
        if (artist) query.artist = { $regex: artist, $options: 'i' };
        if (album) query.album = { $regex: album, $options: 'i' };
        if (movieName) query.movieName = { $regex: movieName, $options: 'i' };

        const songs = await Song.find(query).sort({ createdAt: -1 });
        res.status(200).json(songs);
        
    } catch (error) {
        console.log(`Error in getAllSongs controller ${error.message}`);
        res.status(500).json({ error: error.message }); 
        
    }
}

// Get single song by ID
export const getSongById = async (req, res) => {
    try {
        const song = await song.findById(req.params.id);
        if (song) {
            res.status(200).json(song);
        } else {
            res.status(404).json({ error: "Song not found" });
        }
    } catch (error) {
        console.log(`Error in getSongById controller ${error.message}`);
        res.status(500).json({ error: error.message });
        
    }
}

// Add new song
export const addSong = async (req, res) => {
    try {
        const song = new song(req.body);
        const createdSong = await song.save();
        res.status(201).json(createdSong);
    } catch (error) {
        console.log(`Error in addSong controller ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

// Update song by ID
export const updateSong = async (req, res) => {
    try {
        const song = await song.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!song) return res.status(404).json({ error: "Song not found" });
        res.status(200).json(song);
        
    } catch (error) {
        console.log(`Error in updateSong controller ${error.message}`);
        res.status(500).json({ error: error.message });
        
    }
}

// Delete song by ID
export const deleteSong = async (req, res) => {
    try {
        const song = await song.findByIdAndDelete(req.params.id);
        if (!song) return res.status(404).json({ error: "Song not found" });
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        console.log(`Error in deleteSong controller ${error.message}`);
        res.status(500).json({ error: error.message });
        
    }
}

// Like/Unlike a song
export const likeSong = async (req, res) => {
    try {
        const { userId } = req.body;
        const song = await Song.findById(req.params.id);
        const user = await User.findById(userId);
        if (!song || !user) {
            return res.status(404).json({ error: "Song or User not found" });
        }

        const hasLiked = user.likedSongs.includes(song._id);

        if (hasLiked) {
            user.likedSongs = user.likedSongs.filter(id => id.toString() !== song._id.toString());
            song.likesCount = Math.max(0, song.likesCount - 1);
        } else {
            user.likedSongs.push(song._id);
            song.likesCount += 1;
        }

        await user.save();
        await song.save();

        res.status(200).json({ song, liked: !hasLiked });

    } catch (error) {
        console.log(`Error in likeSong controller ${error.message}`);
        res.status(500).json({ error: error.message });        
    }
}

//Download song
export const downloads = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('downloadedSongs');
        if (!user) return res.status(404).json({ message: 'User not found'})
        res.json(user.downloadedSongs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching downloads', error: error.message });

    }
}