import express from "express";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", addExpense);        // Add expense
router.get("/:userId", getExpenses); // Get all expenses for a user

export default router;
