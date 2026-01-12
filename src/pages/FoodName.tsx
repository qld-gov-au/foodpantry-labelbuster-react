import React, { useState } from "react";
import { Alert } from "../components/GlobalAlert";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { createNavHandlers } from "./help";
import { FoodNamePage } from "./helpGuide/FoodNamePage";
import { RadioGroup } from "../components/RadioGroup";
import { useFormData } from "../context/FormDataContext";

type FoodNameProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

export const FoodName = ({ onBack, onNext, onCancel }: FoodNameProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { formData, updateFoodName } = useFormData();
  const {
    ingredientHighlightChoice,
    followChoice,
    foodName,
    productDescription,
  } = formData.foodName;
  const [touched, setTouched] = useState(false);

  const { handleBackClick, handleCancelClick } = createNavHandlers(
    undefined,
    onBack,
    onCancel
  );

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
        <div>
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
        </div>

        <div>
          <RadioGroup
            name="ingredientHighlightChoice"
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
            ]}
            value={ingredientHighlightChoice}
            onChange={(value) =>
              updateFoodName({ ingredientHighlightChoice: value })
            }
            inline={true}
          />
        </div>
      </div>

      {ingredientHighlightChoice === "1" && (
        <Alert
          alertHeading=" Characterising ingredients"
          alertMessage="Ingredients which are mentioned in the food name are called characterising ingredients. The Food Standards Code requires the amount of characterising ingredients to be shown in the ingredients list."
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
            <div>
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
            </div>
          </div>

          <RadioGroup
            name="followChoice"
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
            ]}
            value={followChoice}
            onChange={(value) => updateFoodName({ followChoice: value })}
            inline={true}
          />

          {followChoice === "1" && (
            <Alert
              alertHeading="Prescribed names"
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
            />
          )}

          {followChoice !== null && (
            <Alert
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
            />
          )}

          {followChoice && (
            <div>
              <label
                className="qld-text-input-label field-required"
                htmlFor="food-name-Input"
              >
                Food name
              </label>
              <input
                id="food-name-Input"
                className={`form-control ${showError ? "is-invalid" : ""}`}
                type="text"
                value={foodName}
                onChange={(e) => updateFoodName({ foodName: e.target.value })}
                onBlur={() => setTouched(true)}
                aria-required="true"
              />
              {showError && (
                <div className="text-danger small" style={{ marginTop: "4px" }}>
                  Food name is required
                </div>
              )}

              <label
                className="qld-text-input-label"
                htmlFor="food-description"
              >
                Description
              </label>
              <input
                id="food-description"
                className="form-control"
                type="text"
                placeholder=""
                tabIndex={0}
                value={productDescription}
                onChange={(e) =>
                  updateFoodName({ productDescription: e.target.value })
                }
              />
            </div>
          )}
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
          onClick={handleCancelClick}
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
