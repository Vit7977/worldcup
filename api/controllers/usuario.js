import pool from "../database/connection.js";

const UserController = {
  async getAllUsers(_, res) {
    try {
      const [result] = await pool.promise().execute("SELECT * FROM usuario");
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários!" });
    }
  },

  async addUser(req, res) {
    const { nome, email, nacionalidade, foto_url } = req.body;
    try {
      const [result] = await pool
        .promise()
        .execute(
          "INSERT INTO usuario (nome, email, nacionalidade, foto_url) VALUES (?, ?, ?, ?)",
          [nome, email, nacionalidade, foto_url]
        );
      res
        .status(201)
        .json({ result, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao cadastrar usuário!" });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, nacionalidade, foto_url } = req.body;
    try {
      const [result] = await pool
        .promise()
        .execute(
          "UPDATE usuario SET nome = ?, email = ?, nacionalidade = ?, foto_url = ? WHERE id = ?",
          [nome, email, nacionalidade, foto_url, id]
        );
      res
        .status(200)
        .json({ result, message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar usuario!" });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const [result] = await pool
        .promise()
        .execute("DELETE FROM usuario WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario não encontrado!" });
      }
      res
        .status(200)
        .json({ result, message: "Usuário deletado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar usuario!" });
    }
  },
};

export default UserController;
