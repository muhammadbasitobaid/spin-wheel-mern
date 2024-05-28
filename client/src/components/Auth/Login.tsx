import Button from "../common/Button";
import InputField from "../common/InputField";

const Login = () => {
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

      <div className="divider text-gray my-8">or</div>

      <div className="space-y-2 px-8 flex flex-col">
        <Button className="!text-lg rounded-full" invertedVariant>
          Google
        </Button>
        <Button className="!text-lg rounded-full " invertedVariant>
          Facebook
        </Button>
      </div>
    </>
  );
};

export default Login;
