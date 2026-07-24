import { useState } from "react";
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
import { HelpGuides } from "../components/helpGuides/Helpguides";

type IngredientsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

const options: Option[] = [
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];

const allergenKeywords = [
  "wheat",
  "cereal",
  "cereals",
  "gluten",
  "barley",
  "oats",
  "rye",
  "egg",
  "crustacea",
  "crab",
  "crayfish",
  "lobster",
  "prawn",
  "prawns",
  "fish",
  "mollusc",
  "mussel",
  "oyster",
  "octopus",
  "squid",
  "clam",
  "sulphite",
  "sulphites",
  "lupin",
  "soy",
  "soya",
  "soybean",
  "soybeans",
  "milk",
  "whey",
  "casein",
  "cream",
  "butter",
  "almond",
  "brazil nut",
  "brazilnut",
  "cashew",
  "hazelnut",
  "macadamia",
  "peanut",
  "peanuts",
  "pecan",
  "pine nut",
  "pinenut",
  "pistachio",
  "sesame",
  "walnut",
];

const isAllergenIngredient = (ingredient: string) => {
  const normalizedIngredient = ingredient.trim().toLowerCase();

  return allergenKeywords.some((keyword) => normalizedIngredient.includes(keyword));
};

const renderIngredientPreview = (ingredientText: string) => {
  const items = ingredientText
    .split(",")
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);

  return items.map((ingredient, index) => (
    <span key={`${ingredient}-${index}`}>
      {index > 0 ? ", " : ""}
      {isAllergenIngredient(ingredient) ? <strong>{ingredient}</strong> : ingredient}
    </span>
  ));
};

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
  const nextDisabled =
    !form.exemptIngredients || !form.allergens || !hasIngredientRows;
  const renderedIngredientPreview = renderIngredientPreview(ingredientList);

  return (
    <>
      <div className="main-content">
        <div className="title-image">
          <h1>Ingredients</h1>
          <figure className="d-flex flex-column flex-lg-row gap-3 align-items-start">
            <figcaption>
              A food label must contain a list of ingredients that have been
              used to make the food. <br /> This is also known as the statement
              of ingredients. 

              
            </figcaption>
            {/* @todo replace image asset with uploaded image on franchise */}
            <img
              src="src\assets\ingredients-page-smallfluids.png"
              alt="Example food label with a list of ingredients."
              className="img-fluid"
            />
            
          </figure>
        </div>

        <div>
          <div>
            <div>
              <p className="fw-bold">
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
                <abbr className="required text-danger" title="(required)">
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
                      <b> Strawberries (23%).</b>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientInName && (
              <div className="mt-4">
                <p className="fw-bold">
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
                  <abbr className="required text-danger" title="(required)">
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
                        dark chocolate chips [sugar, cocoa mass, cocoa butter,
                        emulsifier (soy lecithin), natural vanilla flavour].
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientMakeFood && (
              <div className="mt-4">
                <p className="fw-bold">
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
                  <abbr className="required text-danger" title="(required)">
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
                      <b>sultanas or raisins.</b>
                    </p>
                  </>
                }
              />
            )}

            {form.ingredientAlternative && (
              <div className="mt-4">
                <p className="fw-bold">
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
                  <abbr className="required text-danger" title="(required)">
                    *
                  </abbr>
                </p>
                <p>
                  <small>
                    <span>
                      Generic names may be used to describe the ingredient.{" "}
                    </span>
                    <span>
                      Cereals, cheese, cocoa butter, crystallised fruit, fish 
                      (excludes crustaceans and molluscs), fruit, gum bases, 
                      herbs, meat, milk protein, poultry meat, spices and 
                      vegetable can be used as generic names without any 
                      conditions.
                    </span>
                    <span>
                      {" "}
                      <a
                        href="#oils-margarine"
                        onClick={handleGuideLink("oils-margarine")}
                      >
                        fats or oils
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
                    </span>
                    <span>
                      {" "}
                      For example: Apple, pear and peach listed as “fruit” in a
                      fruit pie.
                    </span>
                  </small>
                </p>

                <RadioGroup
                  name="ingredientGenericName"
                  options={options}
                  value={form.ingredientGenericName}
                  onChange={setField("ingredientGenericName")}
                  inline
                />
              </div>
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
                    <div>
                      <p>
                        For example: The ingredient list could show the
                        ingredients apple, pear and peach as either:
                      </p>
                      <ul>
                        <li>Fruit, or</li>
                        <li>Fruit (apple, pear, peach)</li>
                      </ul>
                    </div>
                  </>
                }
              />
            )}

            {form.ingredientGenericName && (
              <div className="mt-4">
                <p className="fw-bold">
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
                  <abbr className="required text-danger" title="(required)">
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
              </div>
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
                    <div>
                      <p>
                        For example: The ingredient list would show the yellow
                        food colouring tartrazine as either:
                      </p>
                      <ul>
                        <li>Colour (tartrazine), or</li>
                        <li>Colour (102)</li>
                      </ul>
                    </div>
                  </>
                }
              />
            )}

            {form.foodAdditives && (
              <div className="mt-4">
                <p className="fw-bold">
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
                  <abbr className="required text-danger" title="(required)">
                    *
                  </abbr>
                </p>
                <div className="small mb-3">
                  For example:
                  <ul>
                    <li>
                      An ingredient of a flavouring substance; or
                    </li>
                    <li>A volatile ingredient which is completely removed during processing; or</li>
                    <li>
                      Added water that:
                      <ol type="i">
                        <li>is added to reconstitute dehydrated or concentrated ingredients; or</li>
                        <li>forms part of broth, brine or syrup that is declared in the statement 
                          of ingredients or is part of the name of the food; or</li>
                          <li>constitutes less than 5% of the food; or</li>
                      </ol>
                    </li>
                    <li>
                      A substance or food that is used as a processing aid.
                    </li>
                  </ul>
                  Note: An exempt ingredient does not include:
                  <ol type="1">
                    <li>Added caffeine</li>
                    <li>Any of the following substances added to a food for sale as a flavouring 
                      substance or as an ingredient of a flavouring substance-
                      <p>
                        `L-glutamic acid, monosodium glutamate, monopotassium L-glutamate, calcium 
                        di-L-glutamate, monoammonium L-glutamate, magnesium di-L-glutamate, disodium 
                        guanylate, disodium inosinate, disodium-5′-ribonucleotides.
                      </p>
                      </li>

                  </ol>
                </div>

                <RadioGroup
                  name="exemptIngredients"
                  options={options}
                  value={form.exemptIngredients}
                  onChange={setField("exemptIngredients")}
                  inline
                />
              </div>
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
              <div className="mt-4">
                <p className="fw-bold">
                  Does your food contain allergens?
                  <abbr className="required text-danger" title="(required)">
                    *
                  </abbr>
                </p>
                <p>
                  <small>
                    Allergens are cereals such as barley, oats and rye that
                    contain gluten, wheat, milk, egg, peanuts, tree nuts (i.e.:
                    almond, Brazil nut, cashew, hazelnut, macadamia, pecan, pine
                    nut, pistachio and walnut), fish, crustacea, molluscs,
                    sesame, soybeans, lupin and sulphites.
                  </small>
                </p>
                <RadioGroup
                  name="allergens"
                  options={options}
                  value={form.allergens}
                  onChange={setField("allergens")}
                  inline
                />
              </div>
            )}

            {form.allergens === "1" && (
              <Alert
                alertHeading="Required names"
                alertMessage={
                  <>
                    <p>
                      Allergens must be added to the ingredients list using the{" "}
                      <a
                        href="#required-name"
                        onClick={handleGuideLink("required-name")}
                      >
                        required name
                      </a>
                      . The required name must be displayed as <b>bold text</b>.
                    </p>
                    <p>
                      For example: The ingredient list for the Strawberry Yoghurt
                      Crunch shows milk, oats, soy, pecans and{" "}
                      almonds as allergens using the required names.
                    </p>
                    <p>
                      <b>Ingredients:</b> Yoghurt (55%) [skim <b>milk</b>, cream (<b>milk</b>), 
                      live yoghurt cultures, intense sweetner (962)], strawberries (21%), 
                      rolled <b>oats</b>, banana (4.5%), dark choclate (5%) [sugar, <b>milk</b> 
                      {" "}solids, cocoa butter, cocoa mass, emulsifiers (322 (<b>soy</b>), 475), 
                      flavours], honey, dried figs, <b>pecans</b>, <b>almonds</b>, sunflower 
                      seeds, vanilla bean extract [thickener (413)], cinnamon
                    </p>
                  </>
                }
              />
            )}

            {form.exemptIngredients && (
              <div className="mt-4">
                <p className="d-flex align-items-center gap-1 fw-bold">
                  Ingredients
                  <abbr className="required text-danger" title="(required)">
                    *
                  </abbr>
                </p>
                <small className="small mb-3">
                  To change the order of your ingredients:
                  <ul>
                    <li>Drag and drop your ingredient</li>
                  </ul>
                </small>

                <Table
                  headers={["Ingredients"]}
                  rows={[]}
                  editableRows={ingredientRows}
                  onRowsChange={(rows) =>
                    updateIngredients({ ingredientRows: rows })
                  }
                  allowReorder
                  addRowLabel={
                    <div className="d-inline-flex align-items-center gap-1">
                      <FontAwesomeIcon icon={faPlus} />
                      <span>
                        <b>Add</b>
                      </span>
                    </div>
                  }
                  deleteRowLabel={
                    <div className="d-inline-flex align-items-center gap-1">
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
                      {ingredientList ? <> {renderedIngredientPreview}</> : " "}
                    </p>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="page-navigation-block d-flex flex-wrap gap-3 mt-3">
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className={`btn btn-primary${
            nextDisabled ? " disabled pe-none" : ""
          }`}
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

      <HelpGuides
        initialOpen={guideOpen}
        onOpenChange={setGuideOpen}
        open={guideOpen}
        content={<IngredientsPage activeSectionId={activeSectionId} />}
      />
    </>
  );
};
