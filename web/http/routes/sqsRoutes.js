import { Router } from "express";
import { processSqsMessage } from "../controllers/sqsController.js";

const router = Router();

router.post("/processSqsMessage", processSqsMessage);

export default router;
