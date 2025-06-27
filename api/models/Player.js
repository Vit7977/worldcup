import pool from "../database/connection.js";

const Player = {
  async getAllPlayers() {
    try {
      const [result] = await pool.promise().execute("SELECT * FROM jogador");
      return result;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  },
  async getPlayerById(id) {
    try {
      const [result] = await pool
        .promise()
        .execute("SELECT * FROM jogador WHERE id = ?", [id]);
      return result[0];
    } catch (error) {
      console.error("Error fetching player by ID:", error);
      throw error;
    }
  },

  async addPlayer(nome, data_nasc, foto_url) {
    try {
      const [result] = await pool
        .promise()
        .execute(
          "INSERT INTO jogador (nome, data_nasc, foto_url) VALUES (?, ?, ?)",
          [nome, data_nasc, foto_url]
        );
      return result;
    } catch (error) {
      console.error("Error creating player:", error);
      throw error;
    }
  },
  async updatePlayer(nome, data_nasc, foto_url, id) {
    try {
      const [result] = await pool
        .promise()
        .execute(
          "UPDATE jogador SET nome = ?, data_nasc = ?, foto_url = ? WHERE id = ?",
          [nome, data_nasc, foto_url, id]
        );
      return result;
    } catch (error) {
      console.error("Error updating player:", error);
      throw error;
    }
  },
  async deletePlayer(id) {
    try {
      const [result] = await pool
        .promise()
        .execute("DELETE FROM jogador WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.error("Error deleting player:", error);
      throw error;
    }
  },
};

export default Player;
