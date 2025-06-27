import pool from "../database/connection.js";

const User = {
  async getAllUsers() {
    try {
      const [result] = await pool.promise().execute("SELECT * FROM usuario");
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async addUser(nome, email, nacionalidade, foto_url) {
    try {
      const [result] = await pool
        .promise()
        .execute("INSERT INTO usuario (nome, email, nacionalidade, foto_url) VALUES (?, ?, ?, ?)", [
          nome,
          email,
          nacionalidade,
          foto_url
        ]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async updateUser(nome, email, nacionalidade, foto_url, id) {
    try {
      const [result] = await pool
        .promise()
        .execute(
          "UPDATE usuario SET nome = ?, email = ?, nacionalidade = ?, foto_url = ? WHERE id = ?",
          [nome, email, nacionalidade, foto_url, id]
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteUser(id) {
    try {
      const [result] = await pool
        .promise()
        .execute("DELETE FROM usuario WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default User;