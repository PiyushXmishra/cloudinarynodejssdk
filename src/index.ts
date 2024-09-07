import { v2 as cloudinary, v2 } from 'cloudinary';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import multer from "multer";

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  const app = express();
  app.use(cors());
  const port = 5000;

  const storage = multer.diskStorage({});
  const upload = multer({ storage });
  
  app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) { 
        return res.status(400).json({ error: 'No file uploaded' });
      }
    try {
      const result = await v2.uploader.upload(req.file.path);
      res.json({ url: result.secure_url });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      res.status(500).json({ error: 'Error uploading to Cloudinary' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });