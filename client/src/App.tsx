import { useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import {
  ConfirmPage,
  // HealthPage,
  HomePage,
} from "./pages";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";
// import Test from "./pages/Test";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/account/confirm/:token"
        element={
          <AuthRoute>
            <ConfirmPage />
          </AuthRoute>
        }
      />
      <Route path="/" element={<HomePage />} />

      {/* Explicit wheel routes for better SEO */}
      <Route
        path="/yes-or-no-wheel"
        element={
          <HomePage canonicalUrl="https://thespinnerwheel.com/yes-or-no-wheel" />
        }
      />
      <Route
        path="/random-number-wheel"
        element={
          <HomePage canonicalUrl="https://thespinnerwheel.com/random-number-wheel" />
        }
      />
      <Route
        path="/random-letter-generator"
        element={
          <HomePage canonicalUrl="https://thespinnerwheel.com/random-letter-generator" />
        }
      />
      <Route
        path="/random-name-picker"
        element={
          <HomePage canonicalUrl="https://thespinnerwheel.com/random-name-picker" />
        }
      />
      <Route
        path="/random-team-generator"
        element={
          <HomePage canonicalUrl="https://thespinnerwheel.com/random-team-generator" />
        }
      />

      {/* Other static routes */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

      {/* Catch-all route for any other slugs */}
      <Route path="/:slug" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
