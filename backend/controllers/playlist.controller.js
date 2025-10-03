

//Get all playlist for a user
export const playlist = async (req, res) => {
    try {
        const playlists = await playlist.find({ userId: req.params.userId })
        .populate('songs')
        .sort({ updateAt: -1});
        res.json(playlists);
    } catch (error) {
        console.log(`Error in playlist controller ${error.message}`)
        res.status(500).json({error: error.message});
    }
};

//Get single playlist
export const playlistById = async (req, res) => {
    try {
        const playlists = await playlist.findById(req.params.id).populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found'});
        res.json(playlist);
    } catch (error) {
        console.log(`Error in playlistById controller ${error.message}`);
        res.status(500).json({error: error.message});
        
    }
};

// Create playlist
export const createPlaylist = async (req, res) => {
    try {
        const playlist = new playlist(req.body);
        await playlist.save();
        res.status(201).jjson(playlist);
    } catch (error) {
        console.log(`Error in createPlaylist controller ${error.message}`);
        res.status(400).json({ message: 'Error creating playlist', error: error.message});
    }
};

//Update playlist
export const updatePlaylist = async (req, res) => {
    try {
        req.body.updatedAt = Date.now();
        const plalist = await playlist.findByIdAndUpdate(req.params.id, req.body, { new: true})
        .populate('songs');
        if (!playlist) return res.status(404).json({ message: 'Playlist not found'});
        res.json(playlist);
    } catch (error) {
        console.log(`Error in updatePlaylist controller ${error.message}`);
        res.status(500).json({error: error.message});
    }
};

//Delete playlist 
export const deletePlaylist = async (req, res) => {
    try {
        const playlist = await playlist.findByIdAndDelete(req.params.id);
        if (!playlist) return res.status(404).json({ message: 'Playlist not found'});
        res.json({ message: 'Playlist deleted successfully'});
    } catch (error) {
        console.log(`Error in deletePlaylist controller ${error.message}`);
        res.status(500).json({error: error.message});
    }
};

//Add song to playlist
export const addPlaylist = async (req, res) => {
    try {
        const { songId } = req.body;
        const playilist = await playlist.findById(req.params.id);

        if (!playlist) return res.status(404).json({ message: 'Playlist not found'});

        if (!playlist.songs.includes(songId)) {
            playlist.songs.push(songId);
            playlist.updatedAt = Date.now();
            await playlist.save();
        }

        await playlist.populate('songs');
        res.json(playlist);
    } catch (error) {
        console.log(`Error in addPlaylist controller ${error.message}`);
        res.status(400).json({ message: 'Error adding song to playlist', error: error.message });  
    }
};

// Remove song from playlist 
export const removePlaylist = async (req, res) => {
    try {
        const playlist = await playlist.findById(req.params.id);

        if (!playlist) return res.status(404).json({ message: 'Playlist not found'});

        playlist.songs = playlist.songs.filter(id => id.toString() !== req.params.songId);
        playlist.updatedAt = Date.now();
        await playlist.save();

        await playlist.populate('songs');
        res.json(playlist);
    } catch (error) {
        console.log(`Error in removePlaylist controller ${error.message}`)
        res.status(400).json({ message: 'Error removing song from playlist', error: error.message }); 
    }
};

