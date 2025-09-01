// pages/api/getSchools.js
import { pool } from "../../lib/db.js";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query(
        "SELECT id, name, address, city, image FROM schools"
      );
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
