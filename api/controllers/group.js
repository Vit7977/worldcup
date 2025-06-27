import Grupo from "../models/Group.js";

const GrupoController = {
    async getAllGroups(_, res) {
        try {
            const groups = await Grupo.getAllGroups();
            res.status(200).json(groups);
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default GrupoController;
