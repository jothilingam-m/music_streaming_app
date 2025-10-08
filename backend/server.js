import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import playlistRoutes from './routes/song.route.js';
import connectDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

//Middleware
app.use(express.json());
app.use(cors());


//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/songs', songRoutes);
app.use('/api/v1/playlist',playlistRoutes);

// Health check 
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Music Streaming API is running'});
});

app.listen(PORT, () => {
    console.log(`Server is running on port', ${PORT}`);
    connectDB();
})
