import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  expenses: [
    {
      item: { type: String, required: true },
      amount: { type: Number, required: true },
      category: { type: String, default: "Miscellaneous" },
      date: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model("Expense", expenseSchema);
