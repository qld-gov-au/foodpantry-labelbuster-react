import { Alert } from "../components/GlobalWarnings";
import { createNavHandlers } from "./help";

type YourLabelProps = {
  onBack?: () => void;
};
export const YourLabel = ({ onBack }: YourLabelProps) => {
  const { handleBackClick } = createNavHandlers(undefined, onBack);
  return (
    <>
      <div className="main-content">
        <h1>Your label information</h1>

        <div className="label-info">
          <Alert
            variant="success"
            alertHeading=" Congratulations! You have completed all the steps in Label Buster."
            alertMessage={
              <p>
                Using your responses to each question, Label Buster has
                generated a product sheet and an example food label.
              </p>
            }
          />
          <p>
            <strong style={{ color: "#d60000" }}>**Don’t forget</strong> to
            refer to the
            <a href="https://www.health.qld.gov.au/__data/assets/pdf_file/0030/1126947/allergen-labelling.pdf">
              Allergen labelling
            </a>
            fact sheet to make the changes required to ensure that your label is
            fully compliant with the Food Standards Code requirements.
          </p>
          <p>
            If you have trouble or have any further questions in relation to
            incorporating the allergen requirements into your label, please
            contact the Food Safety Standards and Regulation Unit via
            <a href="mailto:foodsafety@health.qld.gov.au">
              foodsafety@health.qld.gov.au
            </a>
            or phone (07) 3328 9310.
          </p>
          <p>
            Label Buster is a brief guide to help you understand your labelling
            requirements. You may choose to get advice from a labelling
            consultant to make sure that your label complies with the Food
            Standards Code.
          </p>
          <p>On this page, you will find:</p>
          <ul>
            <li>
              <a href="#product-sheet">Product sheet</a>
            </li>
            <li>
              <a href="#example-label">Example food label</a>
            </li>
            <li>
              <a href="#legibility-requirements">Legibility requirements</a>
            </li>
            <li>
              <a href="#exemptions">Exemptions</a>
            </li>
            <li>
              <a href="#extra-requirements">Food with extra requirements</a>
            </li>
            <li>
              <a href="#download-email">Email your summary</a>
            </li>
            <li>
              <a href="#update">Need to update your label?</a>
            </li>
          </ul>
        </div>

        <div className="product-sheet">
          <h2>Product Sheet</h2>
          <p>
            You can take this information to a printer or graphic designer to
            create a label or use your own tools/templates. When creating your
            food label, you must ensure you meet the
            <a href="#legibility-requirements">
              <span className="title">legibility requirements</span>
            </a>
            , such as minimum type size.
          </p>
          <table className="table">
            <tbody>
              <tr>
                <td>Food name and description</td>
                <td>
                  2 <br />
                  no description provided
                </td>
              </tr>
              <tr>
                <td>Business details</td>
                <td>
                  <b>z</b> <br />z <br />z <br />
                  <span className="suburb">z</span>
                  <br />
                  VIC,1111
                </td>
              </tr>
              <tr>
                <td>Ingredients</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>
                  For information on how to comply with weights and measures
                  laws visit the
                  <a
                    href="https://www.measurement.gov.au"
                    rel="noopener"
                    target="_blank"
                  >
                    National Measurement Institute website{" "}
                  </a>
                  .
                </td>
              </tr>
              <tr>
                <td>Nutrition information panel</td>
                <td>
                  <p>
                    A Nutrition Information Panel must be added to your food
                    label. The Food Standards Australia New Zealand
                    <a
                      href="https://www.foodstandards.gov.au/industry/npc/Pages/Nutrition-Panel-Calculator-introduction.aspx"
                      rel="noopener"
                      target="_blank"
                    >
                      nutrition panel calculator
                    </a>
                    can help you prepare your nutrition information panel.
                  </p>
                  <img
                    src="https://www.qld.gov.au/?a=148984"
                    alt="example food label"
                    className="img-fluid src"
                  />
                </td>
              </tr>
              <tr>
                <td>Statements and declarations</td>
                <td>
                  <p>
                    <b> </b> <br />
                  </p>
                  <p className="wrap">s.</p>
                  <p>No data provided</p>
                </td>
              </tr>
              <tr>
                <td>Date marks</td>
                <td>
                  <strong>No date field required</strong>
                </td>
              </tr>
              <tr>
                <td>Lot identification</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Storage conditions and directions for use</td>
                <td>
                  <b> </b> <br />
                  <b> </b>
                  <p></p>
                  no data provided
                </td>
              </tr>
              <tr>
                <td>Claims</td>
                <td>
                  <p>
                    Making voluntary claims about your food is very complex and
                    you are recommended to seek professional advice. <br />
                    Please note, that making a claim on your food has other
                    requirements not addressed in Label Buster such as
                    additional sections in your nutritional information panel
                    and requirements under Australian Consumer Law.
                  </p>
                </td>
              </tr>
              <tr>
                <td>Country of origin</td>
                <td>
                  Information on how to calculate and display mandatory
                  <a
                    href="https://www.accc.gov.au/business/advertising-promoting-your-business/country-of-origin-claims/country-of-origin-food-labelling"
                    rel="noopener"
                    target="_blank"
                  >
                    country of origin
                  </a>
                  can be found on the Australian Competition and Consumer
                  Commission website.
                </td>
              </tr>
              <tr>
                <td>Health star rating</td>
                <td>
                  Information on how to calculate and display a voluntary
                  <a
                    href="https://www.healthstarrating.gov.au/internet/healthstarrating/publishing.nsf/Content/guide-for-industry-document"
                    rel="noopener"
                    target="_blank"
                  >
                    health star rating
                  </a>
                  can be found at the health star rating system website.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="example-food-label">
          <h2>Example of food label</h2>
          <p>
            Below is an example of what your label could look like, using the
            information you provided in Label Buster. Label components can be
            placed anywhere on the label you create. They do not need to be in
            the specific layout shown here. They may be displayed in any order
            or arrangement
          </p>
          <div className="example-label-wrapper">
            <div className="example-label">
              <div className="eg-col">
                <h3>2</h3>
                <p></p>
                <br />
                <div>
                  <p>
                    <strong>Lot identification:</strong> 3
                  </p>
                </div>
              </div>
              <div className="eg-col">
                <div>
                  <p>
                    <strong>Ingredients:</strong> 8
                  </p>
                  <div>
                    <p>
                      <b> </b> <br />
                    </p>
                    <p className="wrap">s.</p>
                  </div>
                  <br />
                </div>
                <div className="address-block">
                  <b>z</b> <br />z <br />z <br />
                  <span className="suburb">z</span>
                  <br />
                  VIC,1111
                </div>
              </div>
              <div className="eg-col">
                <img
                  src="https://www.qld.gov.au/?a=148984"
                  alt="example food label"
                  className="src"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="legibility-requirements">
          <h2>Legibility requirements</h2>
          <p>
            All required words, statements, expressions or designs provided on a
            food label must be in English, be legible, and be prominent so as to
            contrast distinctly with the background of the label.
          </p>
          <p>
            Information in other languages is permitted, provided it does not
            negate or contradict the English information.
          </p>
          <p>
            No specific print type or size is defined for general labelling
            requirements, however:
          </p>
          <ul>
            <li>
              warning statements must be in a type size of at least 3mm (or
              1.5mm on small packages)
            </li>
            <li>
              a print size is prescribed in the Food Standards Code for some
              foods where a required statement must be shown (e.g. infant
              formula).
            </li>
          </ul>
        </div>

        <div className="exmptions">
          <h2>Exemptions</h2>
          <p>
            All of the food label information needs to be included on your food
            label, except for:
          </p>
          <ul>
            <li>
              <a
                href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/food-labelling-exemptions-and-extra-requirements"
                target="_blank"
                rel="noopener"
              >
                Food sold in small packages
              </a>
            </li>
            <li>
              <a
                href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/food-labelling-exemptions-and-extra-requirements"
                target="_blank"
                rel="noopener"
              >
                Food with one ingredient
              </a>
            </li>
          </ul>
        </div>

        <div className="food-with-extra-req">
          <h2>Food with extra requirements</h2>
          <p>There are extra requirements for:</p>
          <ul>
            <li>
              <a
                href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/food-labelling-exemptions-and-extra-requirements"
                target="_blank"
                rel="noopener"
              >
                Food sold from a vending machine
              </a>
            </li>
            <li>
              <a
                href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/food-labelling-exemptions-and-extra-requirements"
                target="_blank"
                rel="noopener"
              >
                Food sold in a hamper
              </a>
            </li>
          </ul>
        </div>

        <div className="email-label-info-summary">
          <h2>Email your label information summary</h2>
          <p>
            <b>
              If you prefer, we can send you your label information summary by
              providing an email address below. Depending on your email
              provider, personal information may be transferred outside of
              Australia. By providing your email address, you voluntarily agree
              to this transfer.
            </b>
          </p>
        </div>
      </div>

      <div
        className="page-navigation-block"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className="btn btn-tertiary"
          target="_blank"
          data-progress-label="Loading"
        >
          <span className="btn-label-default">Cancel</span>
        </a>
      </div>
    </>
  );
};
