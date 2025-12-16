type HomeProps = {
  onStart?: () => void;
};

export const Home = ({ onStart }: HomeProps) => {
  return (
    <>
      <div>
        <h1>Label Buster</h1>
        <figure>
          <img
            src="https://www.qld.gov.au/?a=147455"
            alt="Example small business selling food that needs a food label."
          />
        </figure>
        <p>
          Label Buster is a step-by-step guide to help you identify the
          information you need to create a food label that meets Australian
          requirements. At the end of Label Buster, you will generate:
        </p>
        <ul>
          <li>
            a product sheet you can give to a printer to design a label for you
          </li>
          <li>an example of what your food label should look like.</li>
        </ul>

        <p>
          The
          <a
            href="https://www.foodstandards.gov.au/code/Pages/default.aspx"
            rel="nofollow"
            target="_blank"
          >
            <span className="title">
              <i> Australia New Zealand Food Standards Code</i>{" "}
            </span>
          </a>
          (the Food Standards Code) sets the standards for food labelling in
          Australia. Significant penalties apply in Queensland under the{" "}
          <i>Food Act 2006</i> (the Act), for non-compliance with the Food
          Standards Code.
        </p>

        <div className="callout">
          <h3 className="callout-title">Did you know</h3>
          <div className="callout-text">
            Labels must have the same information whether you sell your product
            once at a market stall, or regularly to a supermarket.
          </div>
        </div>

        <h2>Who can use Label Buster?</h2>
        <p>
          Label Buster is designed for small to medium food businesses. If your
          food has complex labelling requirements, such as infant formula,
          sports supplements or alcohol, the tool does not provide all the
          information you need, and you are recommended to seek professional
          legal advice from a food labelling consultant.
        </p>

        <div
          className="alert alert-info"
          role="alert"
          aria-label="Success alert"
        >
          <h2 className="alert-heading">Before you start</h2>
          <p>To use Label Buster, you will need:</p>
          <div className="flex-row">
            <i className="fa fa-clock-o"></i>
            <div>
              <p>
                Up to 1 hour - if you are familiar with food labelling
                requirements.
              </p>
              <p>Up to 2 hours - if you have never made a food label before.</p>
            </div>
          </div>
          <p>
            <i className="fa fa-info-circle"></i>You will need information about
            your food, such as:
          </p>
          <ul>
            <li>ingredients</li>
            <li>use-by or best-before dates</li>
            <li>any storage conditions or directions for use</li>
          </ul>
          <p>
            The questions marked with a <span className="special">*</span> must
            be completed. Other questions are optional.
          </p>
        </div>

        <p>
          PLEASE NOTE: The Label Buster tool is in the process of being updated
          to incorporate the Plain English Allergen Labelling (PEAL) provisions
          of the Australia New Zealand Food Standards Code that came into effect
          on 25 February 2024.
        </p>
        <div style={{ color: "#13578b" }}>
          <p>
            <em>
              <strong>IMPORTANT:</strong> After you have completed Label Buster,
              you will need to refer to the{" "}
              <a href="https://www.health.qld.gov.au/__data/assets/pdf_file/0030/1126947/allergen-labelling.pdf">
                Allergen labelling
              </a>{" "}
              fact sheet to make the required PEAL changes to your draft food
              label and ensure you have a label that is compliant with the Food
              Standards Code.
            </em>
          </p>
          <p>
            <em>
              If your food contains any allergens, this will mainly involve
              changing the format of the ingredient list and including an
              allergy ‘summary statement’. It should only take an additional{" "}
              <strong>5-10 minutes</strong>.
            </em>
          </p>
        </div>

        <p>
          Another resource you may find helpful is{" "}
          <a href="https://www.foodstandards.gov.au/business/labelling/allergen-labelling">
            Allergen labelling for food businesses
          </a>
          , which is available on the Food Standards Australia New Zealand
          website.
        </p>
        <p>
          If you have trouble or have any further questions in relation to
          incorporating the allergen requirements into your label, please
          contact the Food Safety Standards and Regulation Unit via{" "}
          <a href="mailto:foodsafety@health.qld.gov.au">
            foodsafety@health.qld.gov.au
          </a>{" "}
          or phone (07) 3328 9310.
        </p>

        {/* <!-- QGDS Component: Callout --> */}
        <div className="callout">
          <h3 className="callout-title">Did you know</h3>
          <div className="callout-text">
            <p>
              Label Buster will provide you with food labelling information to
              help you to comply with the Food Standards Code. After you finish
              Label Buster, you will need to include other mandatory
              requirements for a{" "}
              <a
                href="https://www.foodstandards.gov.au/industry/npc/Pages/nutrition-panel-calculator.aspx"
                target="_blank"
                rel="noopener"
              >
                Nutrition Information Panel
              </a>
              ,{" "}
              <a
                href="https://www.industry.gov.au/regulations-and-standards/buying-and-selling-goods-and-services-by-weights-and-other-measures"
                target="_blank"
                rel="noopener"
              >
                weights and measures{" "}
              </a>
              , and{" "}
              <a
                href="https://www.accc.gov.au/consumers/groceries/country-of-origin"
                target="_blank"
                rel="noopener"
              >
                Country of origin{" "}
              </a>
              labelling.{" "}
              <a
                href="http://www.healthstarrating.gov.au/internet/healthstarrating/publishing.nsf/content/home"
                target="_blank"
                rel="noopener"
              >
                Health Star Rating{" "}
              </a>
              is a voluntary scheme you can choose to add to your food.
            </p>
          </div>
        </div>
      </div>

      <div style={{marginTop:"60px"}}>
        <a
          className="btn btn-primary "
          role="button"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onStart?.();
          }}
        >
          <span className="btn-label-default">Start</span>
        </a>
      </div>
    </>
  );
};
