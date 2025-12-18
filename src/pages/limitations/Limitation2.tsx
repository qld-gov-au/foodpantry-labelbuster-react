import { useState } from "react";
import { SeekProAdvice } from "../../components/helpGuides/seekProAdvice";
import { Limitation3 } from "./Limitation3";

export const Limitation2 = () => {
  const [serviceChoice2, setServiceChoice2] = useState<"yes" | "no" | null>(null);
  return (
    <>
      <div>
        <div>
          Is your food a special purpose food?
          <abbr
            className="required"
            title="(required)"
            style={{ color: "red" }}
          >
            *
          </abbr>
          <p>
            <small className="hint">Special purpose foods include:</small>
          </p>
          <ul>
            <li>
              <small>Infant formula products</small>
            </li>
            <li>
              <small>Foods for infants</small>
            </li>
            <li>
              <small>
                Formulated meal replacements and formulated supplementary foods
              </small>
            </li>
            <li>
              <small>Formulated supplementary sports foods</small>
            </li>
            <li>
              <small>Food for special medical purposes</small>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", gap: "40px" }}>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceSpecial"
              id="serviceChoiceSpecialYes"
              value="1"
              tabIndex={0}
              onChange={() => setServiceChoice2("yes")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceSpecialYes">
              Yes
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceSpecial"
              id="serviceChoiceSpecialNo"
              value="2"
              tabIndex={0}
              onChange={() => setServiceChoice2("no")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceSpecialNo">
              No
            </label>
          </div>
        </div>
      </div>

      {serviceChoice2 === "yes" ? <SeekProAdvice /> : <Limitation3 />}
    </>
  );
};
