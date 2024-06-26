import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../common/Button";
import InputField from "../common/InputField";
import FacebookLogin from "./FacebookLogin";

const Login: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const handleFacebookClick = () => {
    const fbButton = document.getElementsByClassName(".fb_iframe_widget")[0];
    if (fbButton) {
      // @ts-ignore
      fbButton.click();
    }
  };

  return (
    <>
      <form className="space-y-4">
        <InputField
          id="email"
          placeholder="Enter your email"
          onChange={() => {}}
          label="Please enter your email and password"
        />
        <InputField
          id="password"
          placeholder="Enter your password"
          onChange={() => {}}
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
          onClick={() => login()}
        >
          <img
            src="/assets/icons/google.svg"
            alt="Google"
            className="absolute left-3.5"
          />
          <span>Google</span>
        </Button>
        <div className="relative">
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
        </div>
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
