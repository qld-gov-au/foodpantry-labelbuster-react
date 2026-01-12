import { Alert } from "../components/GlobalAlert";
import { createNavHandlers } from "./help";
import {
  useFormData,
  type StatementsFormData,
  type StorageAndUseData,
} from "../context/FormDataContext";

type YourLabelProps = {
  onBack?: () => void;
  onCancel?: () => void;
};
export const YourLabel = ({ onBack, onCancel }: YourLabelProps) => {
  const { handleBackClick, handleCancelClick } = createNavHandlers(
    undefined,
    onBack,
    onCancel
  );
  const { formData } = useFormData();
  const {
    foodName,
    businessDetails,
    ingredients,
    dateMarks,
    storageAndUse,
    statements,
  } = formData;

  type Rule<T> = {
    when: (d: T) => boolean;
    text: (d: T) => string;
  };

  const withPeriod = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";
    return trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
  };

  const storageRules: Rule<StorageAndUseData>[] = [
    {
      when: (d) => d.coolDryConditions,
      text: () => "Store in cool dry conditions.",
    },
    {
      when: (d) => d.refrigerateAfterPurchase,
      text: () => "Refrigerate after purchase.",
    },
    {
      when: (d) => d.refrigerateAfterOpening,
      text: () => "Refrigerate after opening.",
    },
    {
      when: (d) =>
        d.keepRefrigeratedAt &&
        !!d.refrigeratedDegreeFrom &&
        !!d.refrigeratedDegreeTo,
      text: (d) =>
        `Keep refrigerated at ${d.refrigeratedDegreeFrom} °C to ${d.refrigeratedDegreeTo} °C.`,
    },
    {
      when: (d) => d.keepRefrigeratedAtBelow && !!d.refrigeratedDegreeBelow,
      text: (d) =>
        `Keep refrigerated at or below ${d.refrigeratedDegreeBelow} °C.`,
    },
    { when: (d) => d.keepFrozenSolid, text: () => "Keep frozen solid." },
    {
      when: (d) => d.keepFrozenSolidReady,
      text: () => "Keep frozen solid until ready to use.",
    },
    {
      when: (d) => d.otherFrozen && !!d.otherFrozenNote,
      text: (d) => withPeriod(d.otherFrozenNote),
    },
  ];

  const directionsRules: Rule<StorageAndUseData>[] = [
    { when: (d) => d.washBeforeUse, text: () => "Wash before use." },
    {
      when: (d) => d.storeAirtight,
      text: () => "Once opened, store in an airtight container.",
    },
    { when: (d) => d.shakeWell, text: () => "Shake well before use." },
    {
      when: (d) => d.drainFood,
      text: () => "Food should be drained before consumption.",
    },
    {
      when: (d) => d.keepRefrigerated,
      text: () => "Once opened, keep refrigerated.",
    },
    {
      when: (d) => d.consumeWithin && !!d.consumeDays,
      text: (d) => `Consume within ${d.consumeDays} days of opening.`,
    },
    {
      when: (d) => d.thawBeforeCooking,
      text: () => "Thaw before cooking.",
    },
    { when: (d) => d.cookFromFrozen, text: () => "Cook from frozen." },
    {
      when: (d) => d.onceThawedDoNotRefreeze,
      text: () => "Once thawed, do not refreeze.",
    },
    {
      when: (d) => d.onceThawedUseWithin && !!d.onceThawedUseWithinDays,
      text: (d) =>
        `Once thawed, use within ${d.onceThawedUseWithinDays} hours.`,
    },
    {
      when: (d) => d.notSuitableMicrowaveCooking,
      text: () => "Not suitable for microwave cooking.",
    },
    {
      when: (d) => d.rawProductMustBeCooked,
      text: () => "This is a raw product and must be cooked before eating.",
    },
    {
      when: (d) => d.cookUntilSteamingHot,
      text: () => "Cook until steaming hot in the middle.",
    },
    {
      when: (d) => d.microwaveOn && !!d.microwavePower && !!d.microwaveMinutes,
      text: (d) =>
        `Microwave on ${d.microwavePower} for ${d.microwaveMinutes} minutes.`,
    },
    {
      when: (d) => d.cookFor && !!d.useMinutes && !!d.cookForAt,
      text: (d) => `Cook for ${d.useMinutes} minutes at ${d.cookForAt} °C.`,
    },
    {
      when: (d) => d.allowToStand && !!d.standMinutes,
      text: (d) =>
        `Allow to stand for ${d.standMinutes} minutes before serving.`,
    },
    {
      when: (d) => d.doNotRefrigerateOrReheat,
      text: () => "Do not refrigerate or reheat once heated.",
    },
    {
      when: (d) => d.careTakenRemoveBones,
      text: () =>
        "Care has been taken to remove all bones from this product, however some bones may remain.",
    },
    {
      when: (d) => d.otherDirectionsForUse && !!d.otherDirectionsForUseDetails,
      text: (d) => withPeriod(d.otherDirectionsForUseDetails),
    },
    {
      when: (d) =>
        d.cookingPreparationInstructions &&
        !!d.cookingPreparationInstructionsDetails,
      text: (d) => withPeriod(d.cookingPreparationInstructionsDetails),
    },
  ];

  const buildMessage = <T,>(data: T, rules: Rule<T>[]) =>
    rules
      .filter((r) => r.when(data))
      .map((r) => r.text(data).trim())
      .filter(Boolean)
      .join(" ");

  const storageConditionsText = buildMessage(storageAndUse, storageRules);
  const directionsText = buildMessage(storageAndUse, directionsRules);
  const hasStorageConditions = storageConditionsText.length > 0;
  const hasDirections = directionsText.length > 0;

  const ingredientList = ingredients.ingredientRows
    .map((row) => row[0]?.trim())
    .filter((value): value is string => !!value)
    .join(", ");

  const allergenLabels: { key: keyof StatementsFormData; label: string }[] = [
    { key: "cerealsContainingGluten", label: "Cereals containing gluten" },
    { key: "wheat", label: "Wheat" },
    { key: "egg", label: "Egg" },
    { key: "crustaceaCereals", label: "Crustacea" },
    { key: "fish", label: "Fish" },
    { key: "mollusc", label: "Mollusc" },
    { key: "addedSulphites", label: "Sulphites" },
    { key: "lupin", label: "Lupin" },
    { key: "soybeans", label: "Soybeans" },
    { key: "milk", label: "Milk" },
    { key: "almond", label: "Almond" },
    { key: "brazilNut", label: "Brazil nut" },
    { key: "cashew", label: "Cashew" },
    { key: "hazelnut", label: "Hazelnut" },
    { key: "macadamia", label: "Macadamia" },
    { key: "peanuts", label: "Peanuts" },
    { key: "pecan", label: "Pecan" },
    { key: "pineNut", label: "Pine nut" },
    { key: "pistachio", label: "Pistachio" },
    { key: "sesameSeed", label: "Sesame seed" },
    { key: "walnut", label: "Walnut" },
  ];

  const containsList = allergenLabels
    .filter(({ key }) => statements.form[key])
    .map(({ label }) => label);

  const statementMessages = [
    statements.statementSelections["unpasteurised-egg-products"]
      ? "The product is unpasteurised."
      : null,
    statements.statementSelections["substances-excess-10g"] ||
    statements.statementSelections["substances-excess-25g"] ||
    statements.statementSelections["substances-combination-10g"]
      ? "Excess consumption may have a laxative effect."
      : null,
    statements.statementSelections["aspartame-acesulphame"]
      ? "This product contains phenylalanine."
      : null,
    statements.statementSelections["phytosterols-phytostanols"]
      ? "This product should be consumed as part of a healthy diet. This product may not be suitable for children under 5 years and pregnant or lactating women. Plant sterols do not provide additional benefits when consumed in excess of 3 grams per day."
      : null,
    statements.statementSelections["quinine"]
      ? "This product contains quinine."
      : null,
    statements.statementSelections["guarana-extracts"] ||
    statements.statementSelections["cola-beverage-with-caffeine"] ||
    statements.statementSelections[
      "food-with-cola-beverage-containing-caffeine"
    ]
      ? "The product contains caffeine."
      : null,
    statements.statementSelections["bee-pollen"]
      ? "The product contains bee pollen which can cause severe allergic reactions."
      : null,
    statements.statementSelections["propolis"]
      ? "The product contains propolis which can cause severe allergic reactions."
      : null,
    statements.statementSelections["royal-jelly"]
      ? "This product contains royal jelly which has been reported to cause severe allergic reactions and in rare cases, fatalities, especially in asthma and allergy sufferers."
      : null,
    statements.statementSelections["milk-soy-beverage"] ||
    statements.statementSelections["evaporated-dried-soy-beverage"] ||
    statements.statementSelections["evaporated-dried-soy-beverage-2.5%"]
      ? "The product is not suitable as a complete milk replacement for children under 2 years."
      : null,
    statements.statementSelections["unpasteurised-milk"] ||
    statements.statementSelections["unpasteurised-liquid-milk-products"]
      ? "The product has not been pasteurised."
      : null,
    statements.statementSelections["raw-meat-formed"]
      ? "This food is formed."
      : null,
    statements.statementSelections["raw-meat-joined"] ||
    statements.statementSelections["raw-fish-binding-system"]
      ? "This food is joined."
      : null,
    statements.statementSelections["kava-root"] ||
    statements.statementSelections["kava-beverage"]
      ? "Use in moderation. May cause drowsiness."
      : null,
    statements.statementSelections["bottled-water-with-fluoride"]
      ? "The product contains added fluoride."
      : null,
    statements.sodiumPotassiumContent.trim()
      ? `Sodium and potassium content: ${statements.sodiumPotassiumContent.trim()}.`
      : null,
  ].filter(Boolean) as string[];

  const dateMarkLabels: Record<string, string> = {
    "use-by": "Use-by date",
    "best-before": "Best-before date",
    "baked-on": "Baked-on date",
    "baked-for": "Baked-for date",
    "none-mark": "No date field required",
  };

  const dateMarkLabel = dateMarks.dateMarkType
    ? dateMarkLabels[dateMarks.dateMarkType] || "Date mark"
    : "No data provided";
  const hasDateMark = Boolean(dateMarks.dateMarkType);
  const dateMarkValue =
    dateMarks.dateMarkType && dateMarks.dateMarkType !== "none-mark"
      ? dateMarks.dateValue
      : "";
  const lotIdentification = dateMarks.lotIdentification.trim();

  const businessAddressLine2 = businessDetails.addressLine2.trim();
  const businessSuburb = businessDetails.suburb.trim();
  const businessState = businessDetails.stateValue.trim();
  const businessPostcode = businessDetails.postcode.trim();
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

        <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
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
                    {foodName.foodName || "no name provided"}
                    <br />
                    {foodName.productDescription || "no description provided"}
                  </td>
                </tr>
                <tr>
                  <td>Business details</td>
                  <td>
                    <b>{businessDetails.businessName || "no name provided"}</b>
                    <br />
                    {businessDetails.addressLine1 || "no address provided"}
                    {businessAddressLine2 ? <br /> : null}
                    {businessAddressLine2 || null}
                    {businessSuburb ? (
                      <>
                        <br />
                        <span className="suburb">{businessSuburb}</span>
                      </>
                    ) : null}
                    {(businessState || businessPostcode) && (
                      <>
                        <br />
                        {[businessState, businessPostcode]
                          .filter(Boolean)
                          .join(", ")}
                      </>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Ingredients</td>
                  <td>{ingredientList || "no data provided"}</td>
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
                      <b>{containsList.length ? "Contains:" : ""}</b>
                      {containsList.length
                        ? ` ${containsList.join(", ")}.`
                        : ""}
                      <br />
                    </p>
                    <p className="wrap">
                      {statementMessages.length
                        ? statementMessages.join(" ")
                        : ""}
                    </p>
                    <p>
                      {containsList.length
                        ? "Note: Warning statements must be a minimum size of type of 3 mm. In the case of small packages, a minimum size of type of 1.5 mm is required."
                        : "No data provided"}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>Date marks</td>
                  <td>
                    <strong>{dateMarkLabel}</strong>
                    {dateMarkValue ? `: ${dateMarkValue}` : ""}
                  </td>
                </tr>
                <tr>
                  <td>Lot identification</td>
                  <td>{lotIdentification || "no data provided"}</td>
                </tr>
                <tr>
                  <td>Storage conditions and directions for use</td>
                  <td>
                    <b>{hasStorageConditions ? "Storage conditions:" : ""}</b>
                    {hasStorageConditions ? ` ${storageConditionsText}` : ""}
                    <br />
                    <b>{hasDirections ? "Directions for use:" : ""}</b>
                    <p>{hasDirections ? directionsText : ""}</p>
                    {!hasStorageConditions && !hasDirections
                      ? "no data provided"
                      : ""}
                  </td>
                </tr>
                <tr>
                  <td>Claims</td>
                  <td>
                    <p>
                      Making voluntary claims about your food is very complex
                      and you are recommended to seek professional advice.{" "}
                      <br />
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
                  <h3>{foodName.foodName || "no name provided"}</h3>
                  <p>{foodName.productDescription}</p>
                  {hasStorageConditions && (
                    <>
                      <strong>Storage conditions:</strong>{" "}
                      {storageConditionsText}
                    </>
                  )}
                  {hasStorageConditions && hasDirections && <br />}
                  {hasDirections && (
                    <>
                      <strong>Directions for use:</strong> {directionsText}
                    </>
                  )}
                  <div>
                    {hasDateMark && (
                      <p>
                        <strong>{dateMarkLabel}</strong>
                        {dateMarkValue ? `: ${dateMarkValue}` : ""}
                      </p>
                    )}
                    {lotIdentification && (
                      <p>
                        <strong>Lot identification:</strong> {lotIdentification}
                      </p>
                    )}
                  </div>
                </div>
                <div className="eg-col">
                  <div>
                    <p>
                      <strong>Ingredients:</strong>{" "}
                      {ingredientList || "no data provided"}
                    </p>
                    <div>
                      <p>
                        <b>{containsList.length ? "Contains:" : ""}</b>
                        {containsList.length
                          ? ` ${containsList.join(", ")}.`
                          : ""}
                        <br />
                      </p>
                      <p className="wrap">
                        {statementMessages.length
                          ? statementMessages.join(" ")
                          : ""}
                      </p>
                    </div>
                    <br />
                  </div>
                  <div className="address-block">
                    <b>{businessDetails.businessName || "no name provided"}</b>
                    <br />
                    {businessDetails.addressLine1 || "no address provided"}
                    {businessAddressLine2 ? <br /> : null}
                    {businessAddressLine2 || null}
                    {businessSuburb ? (
                      <>
                        <br />
                        <span className="suburb">{businessSuburb}</span>
                      </>
                    ) : null}
                    {(businessState || businessPostcode) && (
                      <>
                        <br />
                        {[businessState, businessPostcode]
                          .filter(Boolean)
                          .join(", ")}
                      </>
                    )}
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
              All required words, statements, expressions or designs provided on
              a food label must be in English, be legible, and be prominent so
              as to contrast distinctly with the background of the label.
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
              All of the food label information needs to be included on your
              food label, except for:
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
                Australia. By providing your email address, you voluntarily
                agree to this transfer.
              </b>
            </p>
          </div>
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
          onClick={handleCancelClick}
        >
          <span className="btn-label-default">Cancel</span>
        </a>
      </div>
    </>
  );
};
