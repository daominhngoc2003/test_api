import express from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  restore,
} from "../controllers/information.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorization } from "../middlewares/authorization.js";

const router = express.Router();

router.post("/information", authenticate, authorization, create);
router.get("/information", getAll);
router.get("/information/:id", authenticate, authorization, getOne);
router.delete("/information/:id", authenticate, authorization, remove);
router.patch("/information/restore/:id", authenticate, authorization, restore);

export default router;
