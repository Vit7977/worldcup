import Player from "../models/Player.js";

const PlayerController = {
  async getAllPlayers(req, res) {
    try {
      const players = await Player.getAllPlayers();

      if (!players || players.length === 0) {
        return res.status(400).json({ error: "No players found" });
      }
      res.status(200).json(players);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getPlayerById(req, res) {
    const { id } = req.params;
    try {
      const player = await Player.getPlayerById(id);
      if (!player) {
        return res.status(400).json({ error: "Player not found" });
      }
      res.status(200).json(player);
    } catch (error) {
      console.error("Error fetching player by ID:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async addPlayer(req, res) {
    const { nome, data_nasc, foto_url } = req.body;
    try {
      if (!nome || !data_nasc || !foto_url) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const player = await Player.addPlayer(nome, data_nasc, foto_url);
      res
        .status(201)
        .json({ message: "Player created successfully", data: player });
    } catch (error) {
      console.error("Error creating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async updatePlayer(req, res) {
    const { id } = req.params;
    const { nome, data_nasc, foto_url } = req.body;
    try {
      if (!nome || !data_nasc || !foto_url) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const player = await Player.updatePlayer(nome, data_nasc, foto_url, id);
      if (!player) {
        return res.status(400).json({ error: "Player not found" });
      }
      res
        .status(200)
        .json({ message: "Player updated successfully", data: player });
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async deletePlayer(req, res) {
    const { id } = req.params;
    try {
      const player = await Player.deletePlayer(id);
      if (!player) {
        return res.status(400).json({ error: "Player not found" });
      }
      res
        .status(200)
        .json({ message: "Player deleted successfully", data: player });
    } catch (error) {
      console.error("Error deleting player:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default PlayerController;
