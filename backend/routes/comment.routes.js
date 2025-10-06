import express from "express";

const router = express.Router();

router.get('/comments/song/:songId', getComments);
router.post('/comment', createComment);
router.delete('/comments/:id', deleteComments);

export default router;