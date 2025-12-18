import React, { useState } from "react";
import { InfoAlert } from "../components/GlobalWarnings";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { createNavHandlers } from "./help";
import { FoodNamePage } from "./helpGuide/FoodNamePage";

type FoodNameProps = {
  onBack?: () => void;
  onNext?: () => void;
};

export const FoodName = ({ onBack, onNext }: FoodNameProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [ingredientHighlightChoice, setIngredientHighlightChoice] = useState<
    "yes" | "no" | null
  >(null);
  const [followChoice, setFollowChoice] = useState<"yes" | "no" | null>(null);

  const { handleBackClick } = createNavHandlers(undefined, onBack);
  const [foodName, setFoodName] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = foodName.trim().length > 0;
  const showError = touched && !isValid;

  const handleGuideLink = (
    sectionId: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    setActiveSectionId(sectionId);
    setGuideOpen(true);
  };

  const handleNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!isValid) return;
    onNext?.();
  };

  const showFollowingFoodBlock = ingredientHighlightChoice !== null;

  return (
    <>
      <div>
        <h1>Food name and description</h1>
        <figure className="">
          <img
            className="image-ratio-2x3  position-x-center position-y-bottom"
            src="https://www.qld.gov.au/?a=145669"
            alt=""
          />
          <figcaption>
            The purpose of a{" "}
            <a
              href="#about-food-names"
              onClick={(e) => handleGuideLink("about-food-names", e)}
            >
              food name and description
            </a>{" "}
            is to correctly describe what the food is. It cannot mislead the
            customer.
          </figcaption>
          <figcaption>
            The Food Standards Code has rules on what you can name your food.
          </figcaption>
        </figure>
      </div>

      <div className="highlight-ingredient-block">
        <p style={{ fontWeight: "bold", display: "flex" }}>
          Does your food name, or label, highlight an ingredient?
          <abbr
            className="required"
            title="(required)"
            style={{ color: "red" }}
          >
            *
          </abbr>
        </p>
        <p>
          <small>
            For example:
            <ul>
              <li>
                "Strawberry yoghurt" when the yoghurt contains only 1% real
                strawberries
              </li>
              <li>
                "Made with real fruit" when the food contains only a small
                amount of fruit
              </li>
            </ul>
          </small>
        </p>

        <div>
          <div style={{ display: "flex", gap: "40px" }}>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="ingredientHighlightChoice"
                id="ingredientHighlightChoiceYes"
                value="1"
                tabIndex={0}
                onChange={() => setIngredientHighlightChoice("yes")}
              />
              <label
                className="form-check-label"
                htmlFor="ingredientHighlightChoiceYes"
              >
                Yes
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="ingredientHighlightChoice"
                id="ingredientHighlightChoiceNo"
                value="2"
                tabIndex={0}
                onChange={() => setIngredientHighlightChoice("no")}
              />
              <label
                className="form-check-label"
                htmlFor="ingredientHighlightChoiceNo"
              >
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {ingredientHighlightChoice === "yes" && (
        <InfoAlert
          alertHeading=" Characterising ingredients"
          alertMessage="Ingredients which are mentioned in the food name are called characterising ingredients. The Food Standards Code requires the amount of characterising ingredients to be shown in the ingredients list."
          alertLink={false}
        />
      )}

      {showFollowingFoodBlock && (
        <div className="following-food-block">
          <div>
            <p style={{ fontWeight: "bold", display: "flex" }}>
              Is your food one of the following:
              <abbr
                className="required"
                title="(required)"
                style={{ color: "red" }}
              >
                *
              </abbr>
            </p>
            <p>
              <small>
                For example:
                <ul>
                  <li>
                    <a
                      href="#honey-products"
                      onClick={(e) => handleGuideLink("honey-products", e)}
                    >
                      Honey
                    </a>
                  </li>
                  <li>
                    <a
                      href="#prescribed-names"
                      onClick={(e) => handleGuideLink("prescribed-names", e)}
                    >
                      Fermented manufactured meat
                    </a>
                    (For example: salami, chorizo, pepperoni)
                  </li>
                </ul>
              </small>
            </p>
          </div>

          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="followChoice"
                  id="followChoiceYes"
                  value="1"
                  tabIndex={0}
                  onChange={() => setFollowChoice("yes")}
                />
                <label className="form-check-label" htmlFor="followChoiceYes">
                  Yes
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="followChoice"
                  id="followChoiceNo"
                  value="2"
                  tabIndex={0}
                  onChange={() => setFollowChoice("no")}
                />
                <label className="form-check-label" htmlFor="followChoiceNo">
                  No
                </label>
              </div>
            </div>
          </div>

          {followChoice === "yes" && (
            <InfoAlert
              alertHeading=" Prescribed names"
              alertMessage={
                <p>
                  These foods have names that must be used (
                  <a
                    href="#prescribed-names"
                    onClick={(e) => handleGuideLink("prescribed-names", e)}
                  >
                    prescribed names
                  </a>
                  ).
                </p>
              }
              alertLink={false}
            />
          )}

          {followChoice !== null && (
            <InfoAlert
              alertHeading=" Food with extra requirements"
              alertMessage={
                <>
                  <p>
                    Some foods have extra requirements. Use the{" "}
                    <a
                      href="#foodname-extra"
                      onClick={(e) => {
                        e.preventDefault();
                        setGuideOpen(true);
                      }}
                    >
                      Help guide
                    </a>
                    to find out what they are.
                  </p>
                  <p>
                    For example: Ice cream must be made from milk to call it ice
                    cream. Jam must be made from fruit to call it jam.
                  </p>
                </>
              }
              alertLink={false}
            />
          )}

          <div>
            <label className="qld-text-input-label field-required">
              Food name
            </label>
            <input
              id="foodNameInput"
              className={`form-control ${showError ? "is-invalid" : ""}`}
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-required="true"
            />
            {showError && (
              <div className="text-danger small" style={{ marginTop: "4px" }}>
                Food name is required
              </div>
            )}

            <label className="qld-text-input-label">Description</label>
            <input
              className="form-control"
              type="text"
              placeholder=""
              tabIndex={0}
            />
          </div>
        </div>
      )}

      <div
        className="page-navigation-block"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className="btn btn-primary"
          role="button"
          onClick={handleNext}
          aria-disabled={!isValid}
          style={
            !isValid
              ? { pointerEvents: "none", opacity: 0.65, color: "white" }
              : undefined
          }
        >
          <span className="btn-label-default">Next</span>
        </a>

        <a
          className="btn btn-tertiary"
          target="_blank"
          data-progress-label="Loading"
        >
          <span className="btn-label-default">Cancel</span>
        </a>
      </div>

      <HelpGuide
        initialOpen={false}
        content={<FoodNamePage activeSectionId={activeSectionId} />}
        onOpenChange={setGuideOpen}
        open={guideOpen}
      />
    </>
  );
};
