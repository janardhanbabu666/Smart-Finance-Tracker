import React from "react";

const Product = () => {
  return (
    <div className="container mx-auto px-6 py-20 min-h-screen flex justify-center items-center">
      <div className="text-center max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Our Product</h1>
        <p className="text-gray-700 text-lg mb-6">
          Smart Finance Tracker helps you manage your expenses, view insights, and
          track savings easily. Secure, simple, and effective.
        </p>

        {/* 👉 Same features grid from Home.jsx */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Secure Data", "AI Insights", "Mobile Friendly", "Beautiful Charts"].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md text-center"
            >
              <h3 className="font-semibold text-gray-800">{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
