import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-green-600">
              Finance Tracker
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <Link to="/docs" className="hover:text-green-600">Docs</Link>
            <Link to="/faq" className="hover:text-green-600">FAQ</Link>
            <Link to="/contact" className="hover:text-green-600">Contact</Link>
            <Link to="/product" className="hover:text-green-600">Product</Link>
            <Link to="/expense" className="hover:text-green-600">Expense</Link>
            <Link to="/dashboard" className="hover:text-green-600">Dashboard</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Auth Controls */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link to="/sign-in" className="hover:text-green-600">Sign In</Link>
            </SignedOut>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <Link onClick={() => setIsOpen(false)} to="/" className="block hover:text-green-600">Home</Link>
            <Link onClick={() => setIsOpen(false)} to="/docs" className="block hover:text-green-600">Docs</Link>
            <Link onClick={() => setIsOpen(false)} to="/faq" className="block hover:text-green-600">FAQ</Link>
            <Link onClick={() => setIsOpen(false)} to="/contact" className="block hover:text-green-600">Contact</Link>
            <Link onClick={() => setIsOpen(false)} to="/product" className="block hover:text-green-600">Product</Link>
            <Link onClick={() => setIsOpen(false)} to="/expense" className="block hover:text-green-600">Expense</Link>
            <Link onClick={() => setIsOpen(false)} to="/dashboard" className="block hover:text-green-600">Dashboard</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

