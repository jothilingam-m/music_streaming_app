import express from 'express';
import { getAllSongs, getSongById, addSong, updateSong, deleteSong, likeSong, downloads } from '../controllers/song.controller.js';

const router = express.Router();

router.get('/getallsongs', getAllSongs);
router.get('/getsong/:id', getSongById);
router.post('/addsong', addSong);
router.put('/updatesong/:id', updateSong);
router.delete('/deletesong/:id', deleteSong);
router.post('/like', likeSong);
router.get('/userId/downloads', downloads);

export default router;