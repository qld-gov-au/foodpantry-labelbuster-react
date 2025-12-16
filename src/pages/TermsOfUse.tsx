import { useState } from "react";

type TermsOfUseProps = {
  onBack?: () => void;
  onAccept?: () => void;
};

export const TermsOfUse = ({ onBack, onAccept }: TermsOfUseProps) => {
  const [accepted, setAccepted] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccepted(event.target.checked);
    setTouched(true);
  };

  const showError = touched && !accepted;

  const handleAcceptClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!accepted) {
      event.preventDefault();
      setTouched(true);
      return;
    }
    onAccept?.();
  };

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onBack?.();
  };

  return (
    <>
      <div>
        <h1>Terms of use</h1>
        <p>Please read and accept the terms of use before using Label Buster</p>

        <ul>
          <li>
            <a
              href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/label-buster-terms-and-conditions"
              target="_blank"
              rel="noopener"
            >
              Terms and conditions
            </a>
          </li>

          <li>
            <a
              href="https://www.qld.gov.au/legal/privacy"
              target="_blank"
              rel="noopener"
            >
              Privacy statement
            </a>
          </li>

          <li>
            <a
              href="https://www.qld.gov.au/legal/disclaimer"
              target="_blank"
              rel="noopener"
            >
              Disclaimer
            </a>
          </li>
          <li>
            <a
              href="https://www.qld.gov.au/legal/copyright"
              target="_blank"
              rel="noopener"
            >
              Copyright
            </a>
          </li>
        </ul>

        <div className="alert alert-warning" role="alert">
          <h2>
            <i className="fa fa-exclamation-triangle"></i>Warning
          </h2>
          <p>
            This tool does not meet all your legislative requirements, only
            those relating to the Food Standards Code. You will need to include
            other requirements on your food label, such as country of origin
            labelling.
          </p>
          <p>
            It is your responsibility to ensure all the information on your food
            label is true and correct.
          </p>
        </div>

        <p>
          Queensland Government respects your right to privacy in using Label
          Buster. Any information you give will be handled by Queensland
          Government in accordance with the <i>Information Privacy Act 2009.</i>
        </p>

        <p>
          No personal information is stored when you use Label Buster. For
          information about how Queensland Government protects your personal
          information, or to learn about your right to access your personal
          information, please see our website at
          <a
            href="https://www.qld.gov.au/legal/privacy"
            target="_blank"
            rel="noopener"
          >
            www.qld.gov.au/legal/privacy
          </a>
        </p>

        <p>Please note that our terms of use may change over time.</p>

        <p>
          Label Buster is current as of December 2020 and shows information up
          to and including amendment number 196 of the
          <a
            href="https://www.foodstandards.gov.au/code/Pages/default.aspx"
            target="_blank"
            rel="noopener"
          >
            Food Standards Code
          </a>
          . We recommend that you refer to the most current version of the
          <a
            href="https://www.foodstandards.gov.au/code/Pages/default.aspx"
            target="_blank"
            rel="noopener"
          >
            Food Standards Code
          </a>
          for full details and note any changes.
        </p>

        <p>
          Your use of this website is your agreement to our terms and
          conditions.
        </p>
      </div>

      <div className={`form-check${showError ? " invalid" : ""}`}>
        <input
          className="form-check-input"
          type="checkbox"
          id="terms"
          name="terms"
          value="yes"
          onChange={handleCheckboxChange}
          checked={accepted}
          aria-invalid={showError}
          aria-describedby={showError ? "terms-error" : undefined}
        />
        <label className="form-check-label" htmlFor="terms">
          I have read the terms of use for Label Buster
        </label>
      </div>
      {showError && (
        <div
          id="terms-error"
          className="invalid-feedback"
          style={{ display: "block" }}
        >
          Please accept the terms of use to continue.
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <a className="btn btn-primary" role="button" href="#" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className={`btn btn-primary${!accepted ? " disabled" : ""}`}
          role="button"
          href="#"
          aria-disabled={!accepted}
          onClick={handleAcceptClick}
        >
          <span className="btn-label-default">Accept</span>
        </a>
      </div>
    </>
  );
};
