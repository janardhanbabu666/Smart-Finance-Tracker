import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-6">404</h1>
      <p className="text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Error;
