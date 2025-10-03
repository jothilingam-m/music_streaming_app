import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cors());



app.listen(PORT, () => {
    console.log(`Server is running on port', ${PORT}`);
    connectDB();
})
