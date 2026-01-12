import { useState } from "react";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { createNavHandlers, useGuideNavigation } from "./help";
import { RadioGroup, type Option } from "../components/RadioGroup";
import { Alert } from "../components/GlobalAlert";
import { Table } from "../components/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IngredientsPage } from "./helpGuide/IngredientsPage";
import {
  useFormData,
  type IngredientsFormState,
} from "../context/FormDataContext";

type IngredientsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

const options: Option[] = [
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];

export const Ingredients = ({ onBack, onNext, onCancel }: IngredientsProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { formData, updateIngredients } = useFormData();
  const { ingredientRows, form } = formData.ingredients;

  const setField =
    <K extends keyof IngredientsFormState>(key: K) =>
    (value: string) =>
      updateIngredients({
        form: { ...form, [key]: value as IngredientsFormState[K] },
      });

  const { handleBackClick, handleNextClick, handleCancelClick } =
    createNavHandlers(onNext, onBack, onCancel);

  const { handleGuideLink } = useGuideNavigation({
    setGuideOpen,
    setActiveSectionId,
  });

  const ingredientList = ingredientRows
    .map((row) => row[0]?.trim())
    .filter((value): value is string => !!value)
    .join(", ");
  const hasIngredientRows = ingredientRows.some((row) => row[0]?.trim().length);
  const nextDisabled = !form.exemptIngredients || !hasIngredientRows;

  return (
    <>
      <div className="main-content">
        <div className="title-image">
          <h1>Ingredients</h1>
          <figure style={{ display: "flex" }} className="">
            <figcaption>
              A food label must contain a list of ingredients that have been
              used to make the food. <br /> This is also known as the statement
              of ingredients.
            </figcaption>
            <img
              src="https://www.qld.gov.au/?a=145922"
              alt="Example food label with a list of ingredients."
            />
          </figure>
        </div>

        <div className="">
          <div className="">
            <div>
              <p style={{ fontWeight: "bold" }}>
                Do you mention an ingredient, category of ingredients or a part
                of the food in the name on the label
                <a
                  className="text-decoration-none"
                  href="#char-ingredient"
                  onClick={handleGuideLink("char-ingredient")}
                >
                  {" "}
                  characterising ingredients{" "}
                </a>
                ?
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
                  For example: strawberries in strawberry jam, meat in a meat
                  pie.
                </small>
              </p>
              <RadioGroup
                name="ingredientInName"
                options={options}
                value={form.ingredientInName}
                onChange={setField("ingredientInName")}
                inline
              />
            </div>

            {form.ingredientInName === "1" && (
              <Alert
                alertHeading="Characterising ingredients"
                alertMessage={
                  <>
                    <p>
                      Food labels must show the percentage of the characterising
                      ingredients in the food. The Food Standards Code provides
                      details on how
                      <a
                        href="#char-ingredient"
                        onClick={handleGuideLink("char-ingredient")}
                      >
                        {" "}
                        characterising ingredients and components{" "}
                      </a>
                      should be calculated and shown.
                    </p>

                    <p>
                      For example: The ingredient list would show the
                      strawberries in strawberry jam as:
                      <b>Strawberries (23%).</b>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientInName && (
              <div>
                <p style={{ fontWeight: "bold" }}>
                  Do you use any
                  <a
                    className="text-decoration-none"
                    href="#comp-ingredient"
                    onClick={handleGuideLink("comp-ingredient")}
                  >
                    {" "}
                    compound ingredients{" "}
                  </a>
                  ? to make your food?
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
                    A compound ingredient is any ingredient that is made from
                    two or more ingredients. For example: chocolate chips in a
                    muffin, tomato paste on a pizza.
                  </small>
                </p>

                <RadioGroup
                  name="ingredientMakeFood"
                  options={options}
                  value={form.ingredientMakeFood}
                  onChange={setField("ingredientMakeFood")}
                  inline
                />
              </div>
            )}

            {form.ingredientMakeFood === "1" && (
              <Alert
                alertHeading=" Compound ingredients"
                alertMessage={
                  <>
                    <p>
                      If a food contains
                      <a
                        href="#comp-ingredient"
                        onClick={handleGuideLink("comp-ingredient")}
                      >
                        {" "}
                        compound ingredients{" "}
                      </a>
                      that contribute 5% or more to the final food, then all the
                      ingredients and additives in that compound ingredient must
                      be declared. If a food contains a compound ingredient that
                      contributes less than 5% to the final food, then only
                      allergens and food additives require listing.
                    </p>
                    <p>
                      For example: The ingredient list would show the dark
                      chocolate chips in a muffin as:
                      <b>
                        dark chocolate chips [sugar, cocoa mass, cocoa butter,
                        emulsifier (soy lecithin), natural vanilla flavour].
                      </b>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientMakeFood && (
              <div>
                <p style={{ fontWeight: "bold" }}>
                  Do you sometimes replace an ingredient with an
                  <a
                    className="text-decoration-none"
                    href="#alt-ingredient"
                    onClick={handleGuideLink("alt-ingredient")}
                  >
                    {" "}
                    alternative ingredient{" "}
                  </a>
                  to make your food?
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
                    This includes a food ingredient or additive that is replaced
                    with another food or additive that serves the same function.
                    For example: sultanas or raisins in a protein ball.
                  </small>
                </p>

                <RadioGroup
                  name="ingredientAlternative"
                  options={options}
                  value={form.ingredientAlternative}
                  onChange={setField("ingredientAlternative")}
                  inline
                />
              </div>
            )}

            {form.ingredientAlternative === "1" && (
              <Alert
                alertHeading=" Alternative ingredients"
                alertMessage={
                  <>
                    <p>
                      <a
                        href="#alt-ingredient"
                        onClick={handleGuideLink("alt-ingredient")}
                      >
                        {" "}
                        Alternative ingredient{" "}
                      </a>
                      including food additives, must be declared.
                    </p>
                    <p>
                      For example: The ingredient list would show:{" "}
                      <b>dsultanas or raisins.</b>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientAlternative && (
              <>
                <p style={{ fontWeight: "bold" }}>
                  Do you want to list an ingredient with a{" "}
                  <a
                    className="text-decoration-none"
                    href="#generic-name"
                    onClick={handleGuideLink("generic-name")}
                  >
                    {" "}
                    generic name{" "}
                  </a>
                  ?
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
                    <p>Generic names may be used to describe the ingredient.</p>
                    <p>
                      Cheese, cocoa butter, crystallised fruit, fruit, gum
                      bases, herbs, meat, milk protein, poultry meat, spices and
                      vegetables can be used as a generic name without any
                      conditions.
                    </p>
                    <p>
                      <a href="#bcr" onClick={handleGuideLink("bcr")}>
                        Cereals
                      </a>
                      ,{" "}
                      <a
                        href="#oils-margarine"
                        onClick={handleGuideLink("oils-margarine")}
                      >
                        fats or oils
                      </a>
                      ,{" "}
                      <a
                        href="#fish-seafood"
                        onClick={handleGuideLink("fish-seafood")}
                      >
                        fish
                      </a>
                      ,{" "}
                      <a
                        href="#milk-dairy"
                        onClick={handleGuideLink("milk-dairy")}
                      >
                        milk solids
                      </a>
                      ,{" "}
                      <a
                        href="#meat-prod"
                        onClick={handleGuideLink("meat-prod")}
                      >
                        offal
                      </a>
                      ,{" "}
                      <a
                        href="#nuts-seeds"
                        onClick={handleGuideLink("nuts-seeds")}
                      >
                        nuts
                      </a>
                      ,{" "}
                      <a href="#bcr" onClick={handleGuideLink("bcr")}>
                        starch
                      </a>
                      , and{" "}
                      <a
                        href="#sugar-alt"
                        onClick={handleGuideLink("sugar-alt")}
                      >
                        sugar
                      </a>{" "}
                      have other requirements.
                    </p>
                    <p>
                      For example: Apple, pear and peach listed as “fruit” in a
                      fruit pie.
                    </p>
                  </small>
                </p>

                <RadioGroup
                  name="ingredientGenericName"
                  options={options}
                  value={form.ingredientGenericName}
                  onChange={setField("ingredientGenericName")}
                  inline
                />
              </>
            )}

            {form.ingredientGenericName === "1" && (
              <Alert
                alertHeading="Generic names"
                alertMessage={
                  <>
                    <p>
                      <a
                        href="#generic-name"
                        onClick={handleGuideLink("generic-name")}
                      >
                        Generic names{" "}
                      </a>
                      are specified in the Food Standards Code.
                    </p>
                    <p>
                      For example: The ingredient list could show the
                      ingredients apple, pear and peach as either:
                      <ul>
                        <li>Fruit, or</li>
                        <li>Fruit (apple, pear, peach)</li>
                      </ul>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientGenericName && (
              <>
                <p style={{ fontWeight: "bold" }}>
                  Does your food contain any{" "}
                  <a
                    className="text-decoration-none"
                    href="#food-additive"
                    onClick={handleGuideLink("food-additive")}
                  >
                    {" "}
                    food additives{" "}
                  </a>
                  ?
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
                    For example: Food colours, flavours, preservatives,
                    sweeteners, thickeners, etc.
                  </small>
                </p>

                <RadioGroup
                  name="foodAdditives"
                  options={options}
                  value={form.foodAdditives}
                  onChange={setField("foodAdditives")}
                  inline
                />
              </>
            )}

            {form.foodAdditives === "1" && (
              <Alert
                alertHeading="Food additives"
                alertMessage={
                  <>
                    <p>
                      The substance (including a vitamin or mineral) used as a
                      food additive must be declared.
                    </p>
                    <p>
                      The Food Standards Code specifies how to list
                      <a
                        href="#food-additive"
                        onClick={handleGuideLink("food-additive")}
                      >
                        {" "}
                        food additives{" "}
                      </a>
                      in the ingredient list. This includes a list of class
                      names and codes to use for specific food additives.{" "}
                    </p>
                    <p>
                      For example: The ingredient list would show the yellow
                      food colouring tartrazine as either:
                      <ul>
                        <li>Colour (tartrazine), or</li>
                        <li>Colour (102)</li>
                      </ul>
                    </p>
                  </>
                }
              />
            )}

            {form.foodAdditives && (
              <>
                <p style={{ fontWeight: "bold" }}>
                  Does your food contain any{" "}
                  <a
                    className="text-decoration-none"
                    href="#exempt-ingredient"
                    onClick={handleGuideLink("exempt-ingredient")}
                  >
                    {" "}
                    exempt ingredients{" "}
                  </a>
                  that do not need to be included in a statement of ingredients?
                  <abbr
                    className="required"
                    title="(required)"
                    style={{ color: "red" }}
                  >
                    *
                  </abbr>
                </p>
                <small>
                  For example:
                  <ul>
                    <li>
                      A substance or food that is used as a processing aid.
                    </li>
                    <li>An ingredient of a flavouring substance.</li>
                    <li>
                      An ingredient such as water or alcohol, that is completely
                      removed during the manufacture of the food.
                    </li>
                    <li>
                      Added water that forms part of broth, brine or syrup.
                    </li>
                  </ul>
                </small>

                <RadioGroup
                  name="exemptIngredients"
                  options={options}
                  value={form.exemptIngredients}
                  onChange={setField("exemptIngredients")}
                  inline
                />
              </>
            )}

            {form.exemptIngredients === "1" && (
              <Alert
                alertHeading="Exempt ingredients"
                alertMessage={
                  <p>
                    <a
                      href="#exempt-ingredient"
                      onClick={handleGuideLink("exempt-ingredient")}
                    >
                      Exempt ingredients{" "}
                    </a>
                    do not need to be included in the ingredient list.
                  </p>
                }
              />
            )}

            {form.exemptIngredients && (
              <>
                <p style={{ fontWeight: "bold", display: "flex" }}>
                  Ingredients
                  <abbr
                    className="required"
                    title="(required)"
                    style={{ color: "red" }}
                  >
                    *
                  </abbr>
                </p>
                <small>
                  To change the order of your ingredients:
                  <ul>
                    <li>Drag and drop your ingredient</li>
                  </ul>
                </small>

                <Table
                  headers={["Ingredients"]}
                  rows={[]}
                  editableRows={ingredientRows}
                  onRowsChange={(rows) => updateIngredients({ ingredientRows: rows })}
                  allowReorder
                  addRowLabel={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                      <span>
                        <b>Add</b>
                      </span>
                    </div>
                  }
                  deleteRowLabel={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                      <span>
                        <b>Delete</b>
                      </span>
                    </div>
                  }
                />

                <Alert
                  alertHeading="The ingredients should be shown on a food label as:"
                  alertMessage={
                    <p>
                      <b>Ingredients:</b>
                      {ingredientList ? ` ${ingredientList}` : " "}
                    </p>
                  }
                />
              </>
            )}
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
          className={`btn btn-primary${nextDisabled ? " disabled" : ""}`}
          role="button"
          onClick={(event) => {
            if (nextDisabled) {
              event.preventDefault();
              return;
            }
            handleNextClick(event);
          }}
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
        initialOpen={guideOpen}
        onOpenChange={setGuideOpen}
        open={guideOpen}
        content={<IngredientsPage activeSectionId={activeSectionId} />}
      />
    </>
  );
};
