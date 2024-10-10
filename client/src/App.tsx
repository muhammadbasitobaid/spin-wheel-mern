import { useState, useEffect } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { attemptGetUser } from "./store/thunks/user";
import { ConfirmPage, HealthPage, HomePage } from "./pages";
import { useAppDispatch } from "./store/hooks";
import { AuthRoute } from "./components/AuthRoute";
import Test from "./pages/Test";
import Spinner from "./components/common/Spinner";

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
    <div className="flex items-center justify-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <Routes>
      <Route path="/healthcheck" element={<HealthPage />} />
      <Route
        path="/account/confirm/:token"
        element={
          <AuthRoute>
            <ConfirmPage />
          </AuthRoute>
        }
      />
      <Route path="/" element={<HomePage />} />
      <Route element={<Test />} path="/test" />
      <Route element={<Navigate to="/" replace />} />
    </Routes>
  );
}
