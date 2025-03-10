import { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import { ConfirmPage, 
  // HealthPage, 
  HomePage } from "./pages";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";
// import Test from "./pages/Test";
import Spinner from "./components/common/Spinner";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import TermsAndConditions from "./pages/TermsAndConditions";
import ContactUs from "./pages/ContactUs";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return loading ? (
    <div className="flex items-center justify-center h-screen ">
      <Spinner />
    </div>
  ) : (
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
      <Route path="/:slug" element={<HomePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route element={<Navigate to="/" replace />} />
    </Routes>
  );
}
