import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../common/Button";
import InputField from "../common/InputField";
import { attemptRegister } from "src/store/thunks/auth";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
  });

  const handleServerError = (error: any) => {
    // Handle the server error here, for example:
    console.error("Server error:", error);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //@ts-ignore
    dispatch(attemptRegister(formValues)).catch(handleServerError);
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "http://5.183.8.4:8081/api/auth/google";
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={onSubmit}>
        <InputField
          id="username"
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
          label="Please enter your name, email and password"
          value={formValues.username}
        />
        <InputField
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formValues.email}
        />
        <InputField
          id="password"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={formValues.password}
        />
        <Button type="submit" className="w-full text-lg">
          Signup
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
        {/* <Button
          className="!text-lg rounded-full flex justify-center items-center relative"
          invertedVariant
        >
          <img
            src="/assets/icons/facebook.svg"
            alt="Facebook"
            className="absolute left-3.5"
          />
          <span>Facebook</span>
        </Button> */}
      </div>
      <div className="mt-8 text-justify text-xs">
        By clicking Sign Up, you are indicating that you accept our{" "}
        <span className="text-blue font-bold">Terms</span>,
        <span className="text-blue font-bold"> Conditions </span> and 
        <span className="text-blue font-bold">Privacy Policy</span>.
      </div>
    </>
  );
};

export default Signup;
