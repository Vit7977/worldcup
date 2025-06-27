import { Router } from "express";
import GrupoController from "../controllers/group.js";

const router = Router();

router.get("/", GrupoController.getAllGroups);

export default router;
