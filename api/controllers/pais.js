import pool from "../database/connection.js";

const CountryController = {
  async getAllCountries(_, res) {
    try {
      const [result] = await pool.promise().execute(
        `SELECT pais.id, pais.nome, pais.bandeira_url, pais.grupo_id, grupo.nome AS grupo_nome 
         FROM pais 
         JOIN grupo ON pais.grupo_id = grupo.id`
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async addCountry(req, res) {
    try {
      const { nome, bandeira_url, grupo_id } = req.body;
      if (!nome || !bandeira_url || !grupo_id) {
        return res
          .status(400)
          .json({ error: "Todos os campos precisam ser preenchidos!" });
      }

      const [result] = await pool
        .promise()
        .execute(
          `INSERT INTO pais (nome, bandeira_url, grupo_id) VALUES (?,?,?)`,
          [nome, bandeira_url, grupo_id]
        );

      return res
        .status(201)
        .json({ data: result, message: "País Cadastrado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateCountry(req, res) {
    try {
      const { id } = req.params;
      const { nome, bandeira_url, grupo_id } = req.body;

      const [result] = await pool
        .promise()
        .execute(
          `UPDATE pais SET nome = ?, bandeira_url = ?, grupo_id = ? WHERE id = ?`,
          [nome, bandeira_url, grupo_id, id]
        );
      return res
        .status(200)
        .json({ data: result, message: "País Atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteCountry(req, res) {
    try {
      const { id } = req.params;

      const [result] = await pool
        .promise()
        .execute(`DELETE FROM pais WHERE id = ?`, [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "País não encontrado" });
      }

      return res.status(200).json({ message: "País Deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default CountryController;
