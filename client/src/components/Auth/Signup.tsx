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

export default Signup;
