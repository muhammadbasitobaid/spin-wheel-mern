import Button from "../common/Button";
import InputField from "../common/InputField";

const Signup = () => {
  return (
    <>
      <form className="space-y-4">
        <InputField
          id="name"
          placeholder="Enter your name"
          onChange={() => {}}
          label="Please enter your name, email and password"
        />
        <InputField
          id="email"
          placeholder="Enter your email"
          onChange={() => {}}
        />
        <InputField
          id="password"
          placeholder="Enter your password"
          onChange={() => {}}
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
        >
          <img
            src="/assets/icons/google.svg"
            alt="Google"
            className="absolute left-3.5"
          />
          <span>Google</span>
        </Button>
        <Button
          className="!text-lg rounded-full flex justify-center items-center relative"
          invertedVariant
        >
          <img
            src="/assets/icons/facebook.svg"
            alt="Facebook"
            className="absolute left-3.5"
          />
          <span>Facebook</span>
        </Button>
      </div>
      <div className="mt-8 text-justify text-xs">
        By clicking Sign Up, you are indicating that you accept our 
        <span className="text-blue font-bold">Terms</span>,
        <span className="text-blue font-bold"> Conditions </span> and 
        <span className="text-blue font-bold">Privacy Policy</span>.
      </div>
    </>
  );
};

export default Signup;
