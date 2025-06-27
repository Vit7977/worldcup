import Country from "../models/Pais.js";

const CountryController = {
  async getAllCountries(_, res) {
    try {
      const countries = await Country.getAllCountries();
      return res.status(200).json(countries);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async addCountry(req, res) {
    try {
      const { nome, bandeira_url, grupo_id } = req.body;

      if (!nome || !bandeira_url || !grupo_id) {
        return res.status(400).json({ error: "All fields are required!" });
      }

      const country = await Country.addCountry(nome, bandeira_url, grupo_id);

      return res
        .status(201)
        .json({ data: country, message: "Country created successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async updateCountry(req, res) {
    try {
      const { id } = req.params;
      const { nome, bandeira_url, grupo_id } = req.body;

      const updatedCountry = await Country.updateCountry(
        nome,
        bandeira_url,
        grupo_id,
        id
      );
      return res.status(200).json({
        data: updatedCountry,
        message: "Country updated successfully!",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteCountry(req, res) {
    try {
      const { id } = req.params;

      const result = await Country.deleteCountry(id);

      if (result.affectedRows === 0) {
        return res.status(400).json({ error: "Country not found" });
      }

      return res.status(200).json({ message: "Country deleted successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default CountryController;
