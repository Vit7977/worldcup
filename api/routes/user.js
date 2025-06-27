import { Router } from "express";
import UserController from "../controllers/user.js";

const router = Router();

router.get("/", UserController.getAllUsers);

router.post("/", UserController.addUser);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export default router;
