import React from "react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Frequently Asked Questions
        </h1>
        <ul className="space-y-4 text-gray-700 text-lg">
          <li>❓ How do I add an expense?</li>
          <li>📌 Where can I see my saved expenses?</li>
          <li>📊 How does the dashboard calculate my stats?</li>
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
