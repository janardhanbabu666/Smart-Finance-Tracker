import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  const { user } = useUser();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [incomeInput, setIncomeInput] = useState(""); // ✅ new income input

  // --- Fetch expenses
  const fetchExpenses = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${user.id}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  // --- Fetch incomes
  const fetchIncomes = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:5000/api/income/${user.id}`);
      const data = await res.json();
      setIncomes(data);
    } catch (err) {
      console.error("Error fetching incomes:", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [user]);

  // --- Totals
  const latestIncome =
    incomes.length > 0 ? incomes[incomes.length - 1].amount : 0;
  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const totalSavings = latestIncome - totalExpenses;

  // --- Add new income (cumulative)
  const handleAddIncome = async () => {
    if (!incomeInput || isNaN(incomeInput)) return alert("Enter a valid income");
    try {
      // ✅ Add new income to previous one
      const newTotal = latestIncome + Number(incomeInput);

      await fetch("http://localhost:5000/api/income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          amount: newTotal, // ✅ cumulative total income
        }),
      });

      setIncomeInput(""); // reset field
      fetchIncomes(); // refresh incomes
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  // --- Group by category for Pie Chart
  const categories = expenses.reduce((acc, exp) => {
    const cat = exp.category || "Other";
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categories).map(([name, value]) => ({
    name,
    value,
  }));

  // --- Line Chart
  const lineData = expenses.map((exp, idx) => ({
    index: idx + 1,
    amount: exp.amount || 0,
  }));

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* ✅ Income Input Form */}
        <div className="mb-6 flex items-center gap-3">
          <input
            type="number"
            placeholder="Enter income"
            value={incomeInput}
            onChange={(e) => setIncomeInput(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={handleAddIncome}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Income
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-100 p-4 rounded shadow">
            Income: <b>${latestIncome}</b>
          </div>
          <div className="bg-red-100 p-4 rounded shadow">
            Expenses: <b>${totalExpenses}</b>
          </div>
          <div className="bg-blue-100 p-4 rounded shadow">
            Savings: <b>${totalSavings}</b>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Pie Chart */}
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* Line Chart */}
          <LineChart width={400} height={300} data={lineData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="index" />
            <YAxis />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            <Tooltip />
          </LineChart>
        </div>

        {/* Expense Table */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Expense List</h2>
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Date & Time</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td className="px-4 py-2 border">{exp.item}</td>
                  <td className="px-4 py-2 border">${exp.amount}</td>
                  <td className="px-4 py-2 border">{exp.category}</td>
                  <td className="px-4 py-2 border">
                    {new Date(exp.date).toLocaleString()} {/* ✅ Date + Time */}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        await fetch(
                          `http://localhost:5000/api/expenses/${user.id}/${exp._id}`,
                          { method: "DELETE" }
                        );
                        fetchExpenses();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
