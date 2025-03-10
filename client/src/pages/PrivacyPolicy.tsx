import React from "react";
import { NavBar } from "src/components";

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <NavBar isPublic />
      <div className="bg-slate p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-black">Privacy Policy</h1>
          <p className="mb-6 text-black">
            At <strong>TheSpinnerWheel.com</strong>, we value your privacy and
            are committed to protecting your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you visit our website. By accessing or using our services, you agree
            to the terms outlined in this policy.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Information Collection
          </h2>
          <p className="mb-6 text-black">
            <strong>Personal Information:</strong> We may collect personal
            information that you voluntarily provide to us when you interact
            with our website. This includes your name, email address, and any
            other details you submit through contact forms, newsletter sign-ups,
            or account registrations.
          </p>
          <p className="mb-6 text-black">
            <strong>Usage Data:</strong> When you visit our website, we
            automatically collect certain information about your device and
            usage patterns. This may include your IP address, browser type,
            pages visited, time spent on pages, and other diagnostic data. This
            information helps us understand how users engage with our site and
            improve our services.
          </p>
          <p className="mb-6 text-black">
            <strong>Cookies and Tracking Technologies:</strong> We use cookies
            and similar tracking technologies to enhance your experience on our
            website. Cookies are small data files stored on your device that
            help us remember your preferences, customize content, and analyze
            website traffic. You can instruct your browser to refuse all cookies
            or indicate when a cookie is being sent.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Use of Information
          </h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-black">
            <li>
              To Provide and Maintain Our Service: Ensuring our website
              functions correctly and efficiently.
            </li>
            <li>
              To Improve User Experience: Personalizing content and features to
              match your interests.
            </li>
            <li>
              To Communicate with You: Responding to your inquiries, sending
              newsletters, and providing updates or promotional materials.
            </li>
            <li>
              To Analyze Usage: Monitoring and analyzing trends to enhance our
              website's performance and develop new features.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Information Sharing and Disclosure
          </h2>
          <p className="mb-6 text-black">
            We respect your privacy and do not sell or rent your personal
            information to third parties. We may share your information with
            trusted third-party service providers who assist us in operating our
            website and conducting our business. These parties are obligated to
            keep your information confidential and use it only for the purposes
            specified by us.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Data Security
          </h2>
          <p className="mb-6 text-black">
            We implement a variety of security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction. These measures include secure servers, encryption, and
            regular monitoring of our systems. However, please be aware that no
            method of transmission over the internet or electronic storage is
            entirely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Your Rights
          </h2>
          <p className="mb-6 text-black">
            You have the right to access, correct, update, or delete your
            personal information held by us. If you wish to exercise any of
            these rights, please contact us using the information provided in
            the Contact section below. We will respond to your request within a
            reasonable timeframe.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Third-Party Links
          </h2>
          <p className="mb-6 text-black">
            Our website may contain links to external sites not operated by us.
            We have no control over the content and practices of these websites
            and cannot accept responsibility for their respective privacy
            policies. We encourage you to review the privacy policies of any
            third-party sites you visit.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Children's Privacy
          </h2>
          <p className="mb-6 text-black">
            We are committed to complying with the California Online Privacy
            Protection Act (CalOPPA) and the General Data Protection Regulation
            (GDPR) concerning the protection of minors' personal data. We do not
            knowingly collect personal information from anyone under the age of
            13.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-6 text-black">
            We may update our Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. Any modifications will be posted on this page
            with an updated revision date.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">Consent</h2>
          <p className="mb-6 text-black">
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4 text-black">
            Compliance with Laws
          </h2>
          <p className="mb-6 text-black">
            We are committed to complying with all applicable laws and
            regulations regarding the collection, use, and disclosure of
            personal information.
          </p>

          <p className="mt-8 text-black">
            If you have any questions about this Privacy Policy, please contact
            us at support@thespinnerwheel.com.
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
