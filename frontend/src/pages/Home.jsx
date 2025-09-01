import React from "react";
import { Element } from "react-scroll"; // needed for scroll navigation
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white"
      >
        <h1 className="text-5xl font-bold mb-6">Welcome to Smart Finance Tracker</h1>
        <p className="text-xl max-w-2xl text-center mb-6">
          Track your expenses, analyze your spending, and stay on top of your finances.
        </p>
        {/* 👉 Added a button to go to Dashboard */}
        <Link
          to="/dashboard"
          className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-gray-100 transition"
        >
          Go to Dashboard
        </Link>
      </section>

      {/* About Section */}
      <Element name="about">
        <section className="container mx-auto px-6 py-20" id="about">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-gray-700 text-lg mb-6">
            Smart Finance Tracker is a simple tool to manage your income and expenses.
            It gives you insights into your financial habits and helps you plan better.
          </p>
          {/* 👉 Added feature highlights */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md">
              <h3 className="font-semibold text-green-600">✔ Easy Expense Tracking</h3>
              <p className="text-gray-600">Log transactions in seconds.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md">
              <h3 className="font-semibold text-blue-600">✔ AI-Powered Insights</h3>
              <p className="text-gray-600">Understand your spending patterns.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md">
              <h3 className="font-semibold text-red-600">✔ Secure & Private</h3>
              <p className="text-gray-600">Your data is safe and encrypted.</p>
            </div>
          </div>
        </section>
      </Element>

      {/* Docs Section */}
      <Element name="docs">
        <section className="bg-gray-100 px-6 py-20" id="docs">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-6">Documentation</h2>
            <p className="text-gray-700 text-lg mb-8">
              Learn how to use Smart Finance Tracker with detailed guides and API references.
            </p>
            {/* 👉 Added steps */}
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 list-none">
              <li>Sign in with your Google account.</li>
              <li>Enter transactions like "Bought coffee $5".</li>
              <li>Confirm and save your transaction.</li>
              <li>Check insights on the dashboard.</li>
            </ol>
          </div>
        </section>
      </Element>

      {/* FAQ Section */}
      <Element name="faq">
        <section className="container mx-auto px-6 py-20" id="faq">
          <h2 className="text-3xl font-bold mb-6">FAQ</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 list-none">
            <li>How do I add an expense? <span className="text-sm text-gray-500">→ Use the dashboard input form.</span></li>
            <li>Where can I see my saved expenses? <span className="text-sm text-gray-500">→ In the transaction history table.</span></li>
            <li>How does the dashboard calculate my stats? <span className="text-sm text-gray-500">→ It sums your income & expenses automatically.</span></li>
          </ul>
        </section>
      </Element>

      {/* Contact Section */}
      {/* Contact Section */}
<Element name="contact">
  <section className="bg-gray-100 px-6 py-20 flex justify-center items-center" id="contact">
    <div className="container mx-auto text-center max-w-lg">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-gray-700 text-lg mb-4">
        Have questions? Reach us at{" "}
        <span className="font-semibold">support@financetracker.com</span>
      </p>
      {/* 👉 Centered form */}
      <form className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
        />
        <textarea
          placeholder="Message"
          className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-green-400"
        ></textarea>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition">
          Send
        </button>
      </form>
    </div>
  </section>
</Element>


      {/* Product Section */}
      <Element name="product">
        <section className="container mx-auto px-6 py-20" id="product">
          <h2 className="text-3xl font-bold mb-6">Our Product</h2>
          <p className="text-gray-700 text-lg mb-6">
            Smart Finance Tracker helps you manage your expenses, view insights, and
            track savings easily. Secure, simple, and effective.
          </p>
          {/* 👉 Added features grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Secure Data", "AI Insights", "Mobile Friendly", "Beautiful Charts"].map((f, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-md text-center">
                <h3 className="font-semibold">{f}</h3>
              </div>
            ))}
          </div>
        </section>
      </Element>
    </div>
  );
};

export default Home;
