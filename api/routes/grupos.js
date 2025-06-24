import { Router } from "express";
import pool from "../database/connection.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const grupos = await pool.promise().execute("SELECT * FROM grupo");
    res.json(grupos[0]);
  } catch (error) {
    console.error("Erro ao buscar grupos:", error);
    res.status(500).json({ error: "Erro ao buscar grupos" });
  }
});

export default router;
