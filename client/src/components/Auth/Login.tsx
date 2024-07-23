import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import InputField from "../common/InputField";
// import FacebookLogin from "./FacebookLogin";
import { attemptLogin } from "src/store/thunks/auth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://localhost:8081/api/auth/google";
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  // const handleFacebookClick = () => {
  //   const fbButton = document.querySelector(".fb_iframe_widget") as HTMLElement;
  //   if (fbButton) {
  //     fbButton.click();
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(attemptLogin({ username, password }, navigate));
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          id="username"
          placeholder="Enter your username"
          onChange={setUsername}
          label="Please enter your username and password"
        />
        <InputField
          id="password"
          placeholder="Enter your password"
          onChange={setPassword}
          type="password"
        />
        <Button type="submit" className="w-full text-lg">
          Login
        </Button>
      </form>

      <div className="divider text-gray my-8 px-8">or</div>

      <div className="space-y-2 px-8 flex flex-col">
        <Button
          className="!text-lg rounded-full flex justify-center items-center relative"
          invertedVariant
          onClick={handleGoogleLogin}
        >
          <img
            src="/assets/icons/google.svg"
            alt="Google"
            className="absolute left-3.5"
          />
          <span>Google</span>
        </Button>
        {/* <div className="relative">
          <Button
            className="!text-lg !w-full rounded-full flex justify-center items-center relative"
            invertedVariant
            onClick={handleFacebookClick}
          >
            <img
              src="/assets/icons/facebook.svg"
              alt="Facebook"
              className="absolute left-3.5"
            />
            <span>Facebook</span>
          </Button>
          <FacebookLogin />
        </div> */}
      </div>
      <div className="mt-8 text-justify text-xs">
        By clicking Log In, you are indicating that you accept our
        <span className="text-blue font-bold"> Terms</span>,
        <span className="text-blue font-bold"> Conditions </span> and
        <span className="text-blue font-bold"> Privacy Policy</span>.
      </div>
    </>
  );
};

export default Login;
