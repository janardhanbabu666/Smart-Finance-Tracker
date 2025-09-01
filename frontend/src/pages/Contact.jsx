import React from "react";
const Contact = () => {
  return (
    <div className="bg-gray-100 px-6 py-20 min-h-screen flex justify-center items-center">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Have questions? Reach us at{" "}
          <span className="font-semibold">support@financetracker.com</span>
        </p>

        {/* Same contact form as Home.jsx */}
        <form className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-xl shadow">
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
    </div>
  );
};

export default Contact;
