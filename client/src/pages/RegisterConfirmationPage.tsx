import { Navigate, useNavigate, useParams } from "react-router-dom";
import { attemptGetConfirmation } from "../store/thunks/auth";
import { Error } from "../components";
import { useAppDispatch } from "src/store/hooks";
import { useServerError } from "src/hooks/useServerError";
import Button from "src/components/common/Button";

export default function RegisterConfirmationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { serverError, handleServerError } = useServerError();

  const { token } = useParams<{ token: string }>();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = () => {
    dispatch(attemptGetConfirmation(token, navigate)).catch(handleServerError);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold ">
            Confirm Your Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Click the button below to confirm your email address.
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Confirm Email
        </Button>
        {serverError && (
          <div className="mt-4">
            <Error>{serverError}</Error>
          </div>
        )}
      </div>
    </div>
  );
}
