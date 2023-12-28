import { Router } from "express";
import { processSqsMessage } from "../controllers/sqsController.js";

const router = Router();

console.log("ROUTE ".repeat(100) )
router.post("/processSqsMessage", processSqsMessage);

export default router;
