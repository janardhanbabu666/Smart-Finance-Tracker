import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import nlp from "compromise";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

// --- MongoDB ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Schema & Model for Expenses ---
const expenseSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  expenses: [
    {
      item: String,
      amount: Number,
      category: String,
      date: { type: Date, default: Date.now },
    },
  ],
});
const Expense = mongoose.model("Expense", expenseSchema);

// --- Helpers ---
const categorizeExpense = (raw) => {
  const item = (raw || "").toLowerCase();

  if (
    item.includes("coffee") ||
    item.includes("food") ||
    item.includes("snack") ||
    item.includes("restaurant") ||
    item.includes("pizza") ||
    item.includes("burger") ||
    item.includes("lunch") ||
    item.includes("dinner")
  )
    return "Food";

  if (
    item.includes("bus") ||
    item.includes("train") ||
    item.includes("uber") ||
    item.includes("ola") ||
    item.includes("cab") ||
    item.includes("car") ||
    item.includes("fuel") ||
    item.includes("petrol") ||
    item.includes("diesel") ||
    item.includes("transport")
  )
    return "Transportation";

  if (
    item.includes("movie") ||
    item.includes("ticket") ||
    item.includes("netflix") ||
    item.includes("game") ||
    item.includes("concert")
  )
    return "Entertainment";

  if (
    item.includes("rent") ||
    item.includes("electricity") ||
    item.includes("water") ||
    item.includes("gas") ||
    item.includes("internet") ||
    item.includes("bill")
  )
    return "Utilities";

  if (
    item.includes("clothes") ||
    item.includes("shirt") ||
    item.includes("jeans") ||
    item.includes("tshirt") ||
    item.includes("jacket") ||
    item.includes("dress") ||
    item.includes("shoes") ||
    item.includes("saree")
  )
    return "Clothing";

  if (
    item.includes("laptop") ||
    item.includes("mobile") ||
    item.includes("phone") ||
    item.includes("tablet") ||
    item.includes("tv") ||
    item.includes("headphones") ||
    item.includes("charger") ||
    item.includes("electronics")
  )
    return "Electronics";

  if (
    item.includes("doctor") ||
    item.includes("medicine") ||
    item.includes("tablet") ||
    item.includes("pharmacy") ||
    item.includes("hospital") ||
    item.includes("clinic")
  )
    return "Health";

  if (
    item.includes("school") ||
    item.includes("college") ||
    item.includes("tuition") ||
    item.includes("course") ||
    item.includes("book")
  )
    return "Education";

  if (
    item.includes("loan") ||
    item.includes("emi") ||
    item.includes("insurance") ||
    item.includes("credit card")
  )
    return "Bills";

  return "Miscellaneous";
};

const parseStatement = (statement) => {
  if (!statement) return { item: "", amount: 0 };
  const doc = nlp(statement);
  const item = doc.match("#Noun+").out("text") || statement;
  const amountMatch = statement.match(/-?\d+(\.\d{1,2})?/);
  const amount = amountMatch ? parseFloat(amountMatch[0]) : 0;
  return { item, amount };
};

// --- Expense Routes ---
app.post("/api/expenses", async (req, res) => {
  try {
    const { userId, statement, item: rawItem, amount: rawAmount, category: rawCategory, date } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });

    let item, amount, category;

    if (statement) {
      const parsed = parseStatement(statement);
      item = parsed.item;
      amount = parsed.amount;
      category = categorizeExpense(item);
    } else {
      item = rawItem || "";
      amount = Number(rawAmount) || 0;
      category = rawCategory || categorizeExpense(rawItem);
    }

    const newExp = { item, amount, category, date: date ? new Date(date) : new Date() };

    let doc = await Expense.findOne({ userId });
    if (doc) {
      doc.expenses.push(newExp);
      await doc.save();
      return res.status(201).json(newExp);
    } else {
      const created = await Expense.create({ userId, expenses: [newExp] });
      return res.status(201).json(newExp);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error saving expense", error: e.message });
  }
});

app.get("/api/expenses/:userId", async (req, res) => {
  try {
    const doc = await Expense.findOne({ userId: req.params.userId });
    if (!doc) return res.json([]);
    res.json(doc.expenses.sort((a, b) => new Date(a.date) - new Date(b.date)));
  } catch (e) {
    res.status(500).json({ message: "Error fetching expenses", error: e.message });
  }
});

app.put("/api/expenses/:userId/:expenseId", async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const { item, amount, category, date } = req.body;

    const doc = await Expense.findOne({ userId });
    if (!doc) return res.status(404).json({ message: "User not found" });

    const idx = doc.expenses.findIndex((e) => String(e._id) === expenseId);
    if (idx === -1) return res.status(404).json({ message: "Expense not found" });

    if (item !== undefined) doc.expenses[idx].item = item;
    if (amount !== undefined) doc.expenses[idx].amount = amount;
    if (category !== undefined) doc.expenses[idx].category = category;
    if (date !== undefined) doc.expenses[idx].date = new Date(date);

    await doc.save();
    res.json(doc.expenses[idx]);
  } catch (e) {
    res.status(500).json({ message: "Error updating expense", error: e.message });
  }
});

app.delete("/api/expenses/:userId/:expenseId", async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const doc = await Expense.findOne({ userId });
    if (!doc) return res.status(404).json({ message: "User not found" });

    const before = doc.expenses.length;
    doc.expenses = doc.expenses.filter((e) => String(e._id) !== expenseId);
    if (doc.expenses.length === before) return res.status(404).json({ message: "Expense not found" });

    await doc.save();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Error deleting expense", error: e.message });
  }
});

// --- Schema & Model for Income ---
const incomeSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  incomes: [
    {
      source: String,
      amount: Number,
      date: { type: Date, default: Date.now },
    },
  ],
});
const Income = mongoose.model("Income", incomeSchema);

// --- Income Routes ---
app.post("/api/income", async (req, res) => {
  try {
    const { userId, source, amount } = req.body;
    if (!userId || !amount) return res.status(400).json({ message: "userId & amount required" });

    const newIncome = { source: source || "Salary", amount, date: new Date() };

    let doc = await Income.findOne({ userId });
    if (doc) {
      doc.incomes.push(newIncome);
      await doc.save();
      return res.status(201).json(newIncome);
    } else {
      const created = await Income.create({ userId, incomes: [newIncome] });
      return res.status(201).json(newIncome);
    }
  } catch (err) {
    res.status(500).json({ message: "Error saving income", error: err.message });
  }
});

app.get("/api/income/:userId", async (req, res) => {
  try {
    const doc = await Income.findOne({ userId: req.params.userId });
    if (!doc) return res.json([]);
    res.json(doc.incomes.sort((a, b) => new Date(a.date) - new Date(b.date)));
  } catch (err) {
    res.status(500).json({ message: "Error fetching income", error: err.message });
  }
});

// ✅ Health check
app.get("/api/status", (req, res) => res.json({ message: "The application is running!" }));

// 🌐 Root route
app.get("/", (req, res) => {
  res.send("✅ Smart Finance Tracker Backend is running!");
});

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
