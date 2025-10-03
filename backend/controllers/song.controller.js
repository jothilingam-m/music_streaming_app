import Song from "../models/song.schema.js";

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

