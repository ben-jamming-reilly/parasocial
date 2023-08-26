import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-2 mt-6 flex min-h-screen flex-col items-center sm:mx-24">
      <div className=" flex w-full flex-row justify-start">
        <Link href="/">
          <h1 className="outline-text-3 text-2xl tracking-widest">
            parasocial
          </h1>
        </Link>
      </div>
      <div className="outline-text-3 mx-auto mb-6 max-w-prose space-y-4 p-3 text-sm leading-7 tracking-wider">
        <h1>Privacy Policy</h1>

        <p>
          Thank you for using Parasocial ("we," "our," or "us"). We are
          committed to protecting your personal information and your right to
          privacy. This Privacy Policy explains how your information is
          collected, used, and disclosed by Parasocial. By accessing or using
          our website, you signify that you have read, understood, and agree to
          our collection, storage, use, and disclosure of your personal
          information as described in this Privacy Policy and our{" "}
          <a href="[Terms of Service Link]">Terms of Service</a>.
        </p>

        <h2>Information We Collect</h2>

        <p>
          When you access or use our website, we may collect certain information
          about you, including:
        </p>

        <ol className="mb-2 ml-4 ">
          <li>
            <strong>Authentication Data:</strong> When you choose to log in or
            sign up using OAuth authentication, we receive and store the
            authentication tokens provided by the third-party OAuth service. We
            do not have access to your OAuth login credentials.
          </li>
          <li>
            <strong>Usage Information:</strong> We may collect information about
            your interactions with our website, such as the pages or content you
            view and the actions you take.
          </li>
          <li>
            <strong>Device Information:</strong> We may automatically collect
            information about the device you use to access our website,
            including the hardware model, operating system, browser type, and IP
            address.
          </li>
        </ol>

        <h2>How We Use Your Information</h2>

        <p>We use the information we collect to:</p>

        <ol className="mb-2 ml-4 ">
          <li>
            <strong>Provide and Improve our Services:</strong> We use the
            authentication data to authenticate and authorize your access to our
            website. We may also use the information to analyze and improve our
            services and user experience.
          </li>
          <li>
            <strong>Communicate with You:</strong> We may use your email address
            to communicate with you about your account, updates to our services,
            and other important notices.
          </li>
          <li>
            <strong>Aggregate Data:</strong> We may aggregate and anonymize data
            to analyze trends, gather demographic information, and measure the
            effectiveness of our services.
          </li>
        </ol>

        <h2>Disclosure of Your Information</h2>

        <p>We may share your information in the following ways:</p>

        <ol className="mb-2 ml-4 ">
          <li>
            <strong>Service Providers:</strong> We may share your information
            with third-party service providers who assist us in operating our
            website, such as hosting and analytics.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information to comply with applicable laws, regulations, legal
            processes, or government requests.
          </li>
        </ol>

        <h2>Your Choices</h2>

        <p>
          You can choose not to provide us with certain information, but this
          may limit your ability to access certain features of our website.
        </p>

        <h2>Security</h2>

        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no data transmission
          over the internet or electronic storage is fully secure.
        </p>

        <h2>Links to Other Websites</h2>

        <p>
          Our website may contain links to third-party websites. We have no
          control over the content, privacy policies, or practices of these
          websites and are not responsible for their privacy practices.
        </p>

        <h2>Changes to this Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2>Contact Us</h2>

        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a href="mailto:[Your Contact Email]">[Your Contact Email]</a>.
        </p>

        <p>Last updated: 7/17/23</p>
      </div>
    </main>
  );
}
