/*import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const TransactionEntry = () => {
  const { user } = useUser();
  const [statement, setStatement] = useState("");
  const [preview, setPreview] = useState(null);

  if (!user) return <p>Please log in</p>;

  const handleParse = async () => {
    const res = await fetch("http://localhost:5000/api/transactions/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statement }),
    });
    const data = await res.json();
    setPreview(data);
  };

  const handleConfirm = async () => {
    const res = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, ...preview }),
    });
    const data = await res.json();
    alert("✅ Transaction saved!");
    setStatement("");
    setPreview(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Add Transaction</h1>
      <input
        value={statement}
        onChange={(e) => setStatement(e.target.value)}
        placeholder='e.g. "Bought Samsung watch $250"'
        className="border p-2 w-full mb-3"
      />
      <button onClick={handleParse} className="bg-blue-500 text-white px-4 py-2 rounded">Parse</button>

      {preview && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <p><b>Item:</b> {preview.item}</p>
          <p><b>Amount:</b> ${preview.amount}</p>
          <p><b>Category:</b> {preview.category}</p>
          <p><b>Type:</b> {preview.type}</p>
          <button onClick={handleConfirm} className="mt-3 bg-green-500 text-white px-4 py-2 rounded">Confirm & Save</button>
        </div>
      )}
    </div>
  );
};

export default TransactionEntry;*/
