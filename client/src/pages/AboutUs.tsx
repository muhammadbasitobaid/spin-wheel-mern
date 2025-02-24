import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-slate p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="mb-6">
          Welcome to <strong className="text-black">TheSpinnerWheel.com</strong>{" "}
          – your ultimate destination for making decisions fun, fair, and
          effortless!
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Purpose</h2>
        <p className="mb-6">
          We understand that making choices isn't always easy. Whether it's
          deciding on a team, picking a random number, or choosing tonight's
          movie, sometimes you just need a little help. That's where{" "}
          <strong className="text-black">TheSpinnerWheel.com</strong> comes in.
          Our platform transforms decision-making into an engaging experience
          with just a spin of a wheel.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <p className="mb-6">
          <strong className="text-black">TheSpinnerWheel.com</strong> provides a
          variety of interactive tools designed to suit your diverse needs:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>
            <strong className="text-black">Customizable Spinner Wheels:</strong>{" "}
            Create your own wheels by adding personalized options. Perfect for
            games, raffles, or settling friendly debates.
          </li>
          <li>
            <strong className="text-black">Yes/No Picker Wheel:</strong>{" "}
            Simplify decisions with a straightforward yes or no answer.
          </li>
          <li>
            <strong className="text-black">Number Picker Wheel:</strong>{" "}
            Generate random numbers within a range you set, ideal for lotteries
            or educational purposes.
          </li>
          <li>
            <strong className="text-black">Letter Picker Wheel:</strong> Pick
            random letters for word games or learning exercises.
          </li>
        </ul>
        <p className="mb-6">
          Each tool is crafted to provide fair and unbiased results based on the
          inputs you provide, making them suitable for business applications,
          educational settings, and entertainment.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is to make decision-making a delightful experience. By
          combining simplicity with versatility, we aim to be the go-to resource
          whenever you need a hand in choosing between options. We are dedicated
          to continuously improving our platform to better serve your needs.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Feedback Matters</h2>
        <p className="mb-6">
          We believe in growing together with our community. If you have
          suggestions for new tools or features that align with our vision, we'd
          love to hear from you. Your insights help us enhance{" "}
          <strong className="text-black">TheSpinnerWheel.com</strong> and make
          it even more useful for everyone.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          Commitment to Improvement
        </h2>
        <p className="mb-6">
          We are constantly working to make{" "}
          <strong className="text-black">TheSpinnerWheel.com</strong> better.
          Whether it's adding new features, improving user experience, or
          expanding our range of tools, we're committed to serving you more
          effectively.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Join the Fun</h2>
        <p className="mb-6">
          Start spinning and turn your decision-making into an adventure. We
          hope <strong className="text-black">TheSpinnerWheel.com</strong>{" "}
          becomes your trusted companion in making choices easier and more
          enjoyable.
        </p>

        <p className="mt-8">
          Thank you for choosing{" "}
          <strong className="text-black">TheSpinnerWheel.com</strong>!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
