import pool from '../database/connection.js';

const Grupo = {
    async getAllGroups() {
        try {
            const [result] = await pool.promise().execute("SELECT * FROM grupo");
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default Grupo;