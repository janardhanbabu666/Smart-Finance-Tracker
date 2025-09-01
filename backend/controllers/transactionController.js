import Expense from "../models/Expense.js";

// ➕ Add expense to a user’s expenses array
export const addExpense = async (req, res) => {
  try {
    const { userId, item, amount, category } = req.body;

    if (!userId || !item || !amount) {
      return res.status(400).json({ message: "Item and amount are required" });
    }

    // Find user’s expense doc
    let userExpense = await Expense.findOne({ userId });

    if (!userExpense) {
      // If user doesn’t exist yet, create one
      userExpense = new Expense({ userId, expenses: [] });
    }

    // Push new expense
    userExpense.expenses.push({
      item,
      amount,
      category: category || "Miscellaneous"
    });

    await userExpense.save();
    res.status(201).json(userExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📊 Get all expenses of a user
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.findOne({ userId });
    if (!expenses) {
      return res.json({ expenses: [] });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
