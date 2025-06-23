import { Router } from "express";
import CountryController from "../controllers/pais.js";

const router = Router();

router.get("/", CountryController.getAllCountries);

router.post("/", CountryController.addCountry);

router.put("/:id", CountryController.updateCountry);

router.delete("/:id", CountryController.deleteCountry)

export default router;
