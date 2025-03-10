import React from "react";
import { NavBar } from "src/components";

const ContactUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate">
      <NavBar isPublic />
      <div className="bg-slate p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            Contact Us | The Spinner Wheel
          </h1>
          <p className="mb-6">
            We’re here to help! Whether you have a question, need support, or
            want to share feedback, feel free to reach out.
          </p>

          <h2 className="text-2xl font-semibold mb-4">How to Contact Us</h2>

          <h3 className="text-xl font-semibold mb-2">Email Support</h3>
          <p className="mb-2">
            For any inquiries, technical issues, or general questions, you can
            contact us at:
          </p>
          <p className="mb-6">
            📧 <strong>Email:</strong> thespinnerwheel@gmail.com
          </p>
          <p className="mb-6">
            We aim to respond to all emails as soon as possible.
          </p>

          <h3 className="text-xl font-semibold mb-2">Website Assistance</h3>
          <p className="mb-2">
            If you are experiencing any issues with{" "}
            <strong>The Spinner Wheel</strong>, please check our website for
            updates and troubleshooting guides:
          </p>
          <p className="mb-6">
            🌐 <strong>Website:</strong>{" "}
            <a
              href="https://thespinnerwheel.com/"
              className="!text-blue underline"
            >
              https://thespinnerwheel.com/
            </a>
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Common Reasons to Contact Us
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Reporting a technical issue or bug</li>
            <li>Questions about customizing the spinner wheel</li>
            <li>Account-related inquiries</li>
            <li>Feedback or feature requests</li>
            <li>Business or collaboration opportunities</li>
          </ul>

          <p className="mt-8">
            We appreciate your feedback and look forward to assisting you. Thank
            you for using <strong>The Spinner Wheel</strong>!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
