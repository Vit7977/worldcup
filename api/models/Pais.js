import pool from "../database/connection.js";

const Country = {
  async getAllCountries() {
    try {
      const [result] = await pool.promise().execute(
        `SELECT pais.id, pais.nome, pais.bandeira_url, pais.grupo_id, grupo.nome AS grupo_nome 
         FROM pais 
         JOIN grupo ON pais.grupo_id = grupo.id`
      );

      return result;
    } catch (error) {
      console.error(error);
      throw new Error("Internal server error");
    }
  },
  async addCountry(nome, bandeira_url, grupo_id) {
    try {
      const [result] = await pool
        .promise()
        .execute(
          `INSERT INTO pais (nome, bandeira_url, grupo_id) VALUES (?,?,?)`,
          [nome, bandeira_url, grupo_id]
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async updateCountry(nome, bandeira_url, grupo_id, id) {
    try {
      const [result] = await pool
        .promise()
        .execute(
          `UPDATE pais SET nome = ?, bandeira_url = ?, grupo_id = ? WHERE id = ?`,
          [nome, bandeira_url, grupo_id, id]
        );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  async deleteCountry(id) {
    try {
      const [result] = await pool
        .promise()
        .execute(`DELETE FROM pais WHERE id = ?`, [id]);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default Country;
