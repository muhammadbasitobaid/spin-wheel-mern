import { Link } from "react-router-dom";
import { NavBar } from "src/components";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>404 - Page Not Found | The Spinner Wheel</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to The Spinner Wheel to continue spinning!"
        />
      </Helmet>

      <NavBar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 -mt-16">
        <div className="text-center">
          <img
            src="/assets/icons/wheel_page.svg"
            alt="404 Wheel"
            className="w-32 h-32 mx-auto mb-8 animate-spin-slow"
          />

          <h1 className="text-4xl font-medium text-black mb-4">
            Oops! The wheel stopped here
          </h1>

          <p className="text-light-gray text-lg mb-8">
            The page you're looking for seems to have spun away. Let's get you
            back to spinning!
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
