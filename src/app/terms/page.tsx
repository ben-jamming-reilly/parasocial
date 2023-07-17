import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-24 mt-6 flex min-h-screen flex-col items-center">
      <div className=" flex w-full flex-row justify-start">
        <Link href="/">
          <h1 className="outline-text-3 text-2xl tracking-widest">
            parasocial
          </h1>
        </Link>
      </div>
      <div className="outline-text-3 mx-auto mb-6 max-w-prose p-3 text-sm leading-7 tracking-wider">
        <h1 className="text-center">Terms and Conditions</h1>
        <h2>1. Acceptance of Terms</h2>
        <p className="mb-2 ml-4">
          By using Parasocial, you represent that you are at least 18 years old
          and capable of entering into a legally binding agreement. If you are
          using Parasocial on behalf of an organization, you represent and
          warrant that you have the authority to bind that organization to these
          Terms.
        </p>

        <h2>2. Parasocial Usage</h2>
        <p className="mb-2 ml-4 ">
          a. Parasocial is provided on an "as is" and "as available" basis. We
          make no warranties, express or implied, regarding the availability,
          reliability, or functionality of Parasocial.
        </p>
        <p className="mb-2 ml-4 ">
          b. You agree to use Parasocial in compliance with all applicable laws
          and regulations. You are solely responsible for any content you submit
          or access through Parasocial.
        </p>

        <h2>3. Privacy</h2>
        <p className="mb-2 ml-4 ">
          a. You agree to use Parasocial in compliance with all applicable laws.
          We respect your privacy and currently do not collect any personally
          identifiable information (PII) through Parasocial. However,
          non-personally identifiable information may be collected and used.
        </p>

        <h2>4. Intellectual Property</h2>
        <p className="mb-2 ml-4 ">
          a. The source code of Parasocial is open source and is licensed under
          the MIT License. You may find the full text of the MIT License at{" "}
          <a href="https://github.com/ben-jamming-reilly/parasocial/blob/main/LICENSE">
            https://github.com/ben-jamming-reilly/parasocial/blob/main/LICENSE
          </a>
          .
        </p>

        <h2>5. User-Generated Content</h2>
        <p className="mb-2 ml-4 ">
          a. Parasocial may allow you to submit content, such as prompts or
          clips. By submitting content, you grant us a worldwide, royalty-free,
          non-exclusive license to use, reproduce, modify, adapt, publish,
          translate, distribute, and display the content for the purpose of
          providing and promoting Parasocial.
        </p>
        <p className="mb-2 ml-4 ">
          b. You are solely responsible for the content you submit through
          Parasocial. You represent and warrant that you have all necessary
          rights and permissions to submit such content, and that it does not
          violate any third-party rights or applicable laws.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p className="mb-2 ml-4 ">
          a. To the fullest extent permitted by law, we shall not be liable for
          any direct, indirect, incidental, special, consequential, or exemplary
          damages, including but not limited to damages for loss of profits,
          goodwill, use, data, or other intangible losses, arising out of or in
          connection with the use or inability to use Parasocial.
        </p>
        <p className="mb-2 ml-4 ">
          b. We shall not be liable for any third-party content or actions,
          including the conduct of other users of Parasocial.
        </p>
        <p className="mb-2 ml-4 ">
          c. In no event shall our total liability exceed the amount paid by
          you, if any, for accessing or using Parasocial.
        </p>

        <h2>7. Indemnification</h2>
        <p className="mb-2 ml-4 ">
          You agree to indemnify, defend, and hold harmless us and our officers,
          directors, employees, and agents from and against any and all claims,
          liabilities, damages, losses, costs, or expenses, including reasonable
          attorneys' fees, arising out of or in connection with your use of
          Parasocial or any violation of these Terms.
        </p>

        <h2>8. Modifications and Termination</h2>
        <p className="mb-2 ml-4 ">
          a. We reserve the right to modify, suspend, or terminate Parasocial or
          these Terms at any time without prior notice. We may also impose
          limits on certain features or restrict your access to parts or all of
          Parasocial without notice or liability.
        </p>
        <p className="mb-2 ml-4 ">
          b. If any content creator requests to be delisted from Parasocial, we
          will promptly remove their content upon verification of their identity
          and ownership rights.
        </p>

        <h2>8. Entire Agreement</h2>
        <p className="mb-2 ml-4 ">
          These Terms constitute the entire agreement between you and us
          regarding the use of Parasocial and supersede any prior or
          contemporaneous agreements, communications, or understandings, whether
          oral or written.
        </p>
        <p className="mb-2 ml-4 ">
          If you have any questions or concerns regarding these Terms, please
          contact us <a href="mailto:benreilly0809@gmail.com">here</a>.
        </p>

        <p>Last updated: 7/17/23</p>
      </div>
    </main>
  );
}
