import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const Expense = () => {
  const { user, isLoaded } = useUser();
  const [statement, setStatement] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);

  // Fetch expenses (latest first)
  const fetchExpenses = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:5000/api/expenses/${user.id}`);
    const data = await res.json();
    setExpenses(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  // Add expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!statement.trim()) {
      alert("⚠️ Please add your expense before submitting!");
      return;
    }

    setLoading(true);
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, statement }),
    });
    setStatement("");
    setLoading(false);

    if (showExpenses) fetchExpenses();
  };

  useEffect(() => {
    if (isLoaded && user && showExpenses) {
      fetchExpenses();
    }
  }, [isLoaded, user, showExpenses]);

  if (!isLoaded) return <p>Loading...</p>;
  if (!user) return <h2 className="p-6">Please log in to submit expenses</h2>;

  return (
    <div className="container mx-auto px-6 py-16 min-h-screen flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
        Add Expense
      </h1>

      {/* Expense Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-md mx-auto bg-white p-6 rounded-xl shadow-md"
      >
        <input
          type="text"
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          className="border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder='e.g. "Coffee at Starbucks $6.50"'
        />

        <button
          className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition duration-200 shadow"
          disabled={loading}
        >
          {loading ? "Submitting..." : "➕ Add Expense"}
        </button>
      </form>

      {/* View Expenses Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => setShowExpenses(!showExpenses)}
          className="bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-200"
        >
          {showExpenses ? "Hide Expenses" : "📋 View Expenses"}
        </button>
      </div>

      {/* Expense List */}
      {showExpenses && (
        <div className="mt-10 max-w-4xl mx-auto flex-grow">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Expenses
          </h2>
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Item</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id} className="text-center hover:bg-gray-50">
                  <td className="border p-2">{exp.item}</td>
                  <td className="border p-2">${exp.amount}</td>
                  <td className="border p-2">{exp.category}</td>
                  <td className="border p-2">
                    {new Date(exp.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Expense;
