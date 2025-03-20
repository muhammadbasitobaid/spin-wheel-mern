import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";
import { HelmetProvider } from "react-helmet-async";
import NotFound from "./pages/NotFound";
import { ConfirmPage, HomePage } from "./pages";
import Layout from "./components/Layout";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser());
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Layout>
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
            path="/random-number-generator"
            element={
              <HomePage canonicalUrl="https://thespinnerwheel.com/random-number-generator" />
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
          <Route path="/sitemap.xml" />

          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HelmetProvider>
  );
}
