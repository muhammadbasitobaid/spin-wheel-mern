import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-gray-700 py-6 mt-8 border-t border-gray-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-lg font-semibold">
            &copy; 2025 The Spinner Wheel
          </span>
        </div>
        <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
          <li>
            <Link to="/about-us" className="hover:text-blue-600 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact-us" className="hover:text-blue-600 transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className="hover:text-blue-600 transition"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-and-conditions"
              className="hover:text-blue-600 transition"
            >
              Terms & Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
