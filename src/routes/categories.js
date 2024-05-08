import express from "express";
import { add, get, getAll, remove } from "../controllers/categories.js";

const router = express.Router();
router.post("/categories", add);
router.get("/categories", getAll);
router.get("/categories/:id", get);
router.delete("/categories/:id", remove);

export default router;
