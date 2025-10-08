import mongoose from 'mongoose';
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Song = mongoose.model('Song', new mongoose.Schema({
  title: String,
  artist: String,
  album: String,
  genre: String,
  duration: String,
  audioUrl: String,
  imageUrl: String,
  likes: { type: Number, default: 0 },
  movieName: String,
  releaseYear: Number,
}));

const sampleSongs = [
  {
    title: "Sunset Dreams",
    artist: "Luna Wave",
    album: "Ocean Vibes",
    genre: "Electronic",
    duration: "3:45",
    imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    likes: 1234,
    releaseYear: 2023
  },
  {
    title: "Midnight Jazz",
    artist: "Smooth Collective",
    album: "Night Sessions",
    genre: "Jazz",
    duration: "4:20",
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    likes: 2156,
    releaseYear: 2022
  },
  {
    title: "Electric Soul",
    artist: "Neon Knights",
    album: "Cyber Dreams",
    genre: "Electronic",
    duration: "3:30",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    likes: 987,
    movieName: "Cyber City",
    releaseYear: 2023
  },
  {
    title: "Acoustic Sunrise",
    artist: "Folk Brothers",
    album: "Morning Tales",
    genre: "Folk",
    duration: "4:05",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    likes: 1567,
    releaseYear: 2021
  }
];

async function seedDatabase() {
  try {
    await Song.deleteMany({});
    await Song.insertMany(sampleSongs);
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();