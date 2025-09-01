// pages/api/addSchool.js
import { pool } from "../../lib/db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public/schoolImages");

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) return res.status(500).json({ error: err.message });

      const { name, address, city, state, contact, email_id } = req.body;
      const imagePath = "/schoolImages/" + req.file.filename;

      try {
        await pool.query(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, imagePath, email_id]
        );
        res.status(200).json({ message: "School added successfully!" });
      } catch (dbErr) {
        res.status(500).json({ error: dbErr.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
