import express from "express";

const router = express.Router();

router.get('/playlist/user/:userId', playlist);
router.get('/playlist/:id', playlistById);
router.post('/playlist', createPlaylist);
router.put('/playlist/:id', updatePlaylist);
router.delete('/playlist/:id', deletePlaylist);
router.post('/playlist/:id/songs', addPlaylist);
router.delete('/playlist/:id/songs/:songId', removePlaylist);

export default router;



