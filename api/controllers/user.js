import User from "../models/User.js";

const UserController = {
  async getAllUsers(_, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async addUser(req, res) {
    const { nome, email, nacionalidade, foto_url } = req.body;
    try {
      const user = await User.addUser(nome, email, nacionalidade, foto_url);
      res
        .status(201)
        .json({ data: user, message: "User created successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { nome, email, nacionalidade, foto_url } = req.body;
    try {
      const updatedUser = await User.updateUser(
        nome,
        email,
        nacionalidade,
        foto_url,
        id
      );
      res
        .status(200)
        .json({ data: updatedUser, message: "User updated successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.deleteUser(id);
      res
        .status(200)
        .json({ data: user, message: "User deleted successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default UserController;
