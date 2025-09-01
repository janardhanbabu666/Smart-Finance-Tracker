import React from "react";

const Docs = () => {
  return (
    <div className="bg-gray-100 px-6 py-20 min-h-screen flex justify-center items-center">
      <div className="container mx-auto text-center max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        <p className="text-gray-700 text-lg mb-8">
          Learn how to use Smart Finance Tracker with detailed guides and API references.
        </p>
        
        {/* 👉 Same steps from Home.jsx */}
        <ol className="space-y-4 text-gray-700 list-none">
          <li className="bg-white p-4 rounded-xl shadow hover:shadow-md">
            <span className="font-semibold text-green-600">Step 1:</span> Sign in with your Google account.
          </li>
          <li className="bg-white p-4 rounded-xl shadow hover:shadow-md">
            <span className="font-semibold text-green-600">Step 2:</span> Enter transactions like "Bought coffee $5".
          </li>
          <li className="bg-white p-4 rounded-xl shadow hover:shadow-md">
            <span className="font-semibold text-green-600">Step 3:</span> Confirm and save your transaction.
          </li>
          <li className="bg-white p-4 rounded-xl shadow hover:shadow-md">
            <span className="font-semibold text-green-600">Step 4:</span> Check insights on the dashboard.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Docs;
