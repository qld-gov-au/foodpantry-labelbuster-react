import React, { useState } from "react";
import { createNavHandlers, useGuideNavigation } from "./help";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { StatementsPage } from "./helpGuide/StatementsPage";
import {
  CheckboxWithInput,
  type CheckboxConfig,
} from "../components/CheckboxWithInput";
import { Alert } from "../components/GlobalAlert";
import { Checkbox } from "../components/Checkbox";
import { Textarea } from "../components/Textarea";
import {
  useFormData,
  type StatementsFormData,
} from "../context/FormDataContext";

type StatementsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

export const Statements = ({ onBack, onNext, onCancel }: StatementsProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { formData, updateStatements } = useFormData();
  const statementData = formData.statements;
  const form = statementData.form;

  const { handleBackClick, handleNextClick, handleCancelClick } =
    createNavHandlers(onNext, onBack, onCancel);

  const { handleGuideLink } = useGuideNavigation({
    setGuideOpen,
    setActiveSectionId,
  });

  const handleStatementCheckboxChange = (id: string, checked: boolean) => {
    updateStatements({
      statementSelections: {
        ...statementData.statementSelections,
        [id]: checked,
      },
    });
  };

  const renderStatementCheckbox = (
    id: string,
    label: string,
    hint?: React.ReactNode
  ) => (
    <Checkbox
      id={id}
      label={label}
      hint={hint}
      checked={!!statementData.statementSelections[id]}
      onChange={(checked) => handleStatementCheckboxChange(id, checked)}
    />
  );
  const toggleInvalidState = (el: HTMLTextAreaElement) => {
    if (el.value.trim()) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
    }
  };

  const CerealsAndGrainsCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Cereals containing gluten",
      key: "cerealsContainingGluten",
      hint: "For example: wheat, barley, oats and rye and their hybridised strains of the cereal, other than when present in beer or spirits.",
    },
    {
      label: "Wheat",
      key: "wheat",
      hint: (
        <>
          <p>
            Wheat, including its hybridised strain, irrespective of whether it
            contains gluten. Except for:
          </p>
          <ul>
            <li>
              the wheat or its hybridised strain that is present in beer or
              spirits
            </li>
            <li>
              glucose syrups made from wheat starch and that:
              <ul>
                <li>
                  have been subject to a refining process that has removed
                  gluten protein content to the lowest level that is reasonably
                  achievable; and
                </li>
                <li>
                  have a gluten protein content that does not exceed 20 mg/kg
                </li>
              </ul>
            </li>
            <li>alcohol distilled from wheat</li>
          </ul>
        </>
      ),
    },
  ];

  const EggAndEggProductsCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Egg",
      key: "egg",
    },
  ];

  const FishCrustaceaSeafoodCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Crustacea Cereals",
      key: "crustaceaCereals",
      hint: "For example: crab, crayfish, lobster, prawns",
    },
    {
      label: "Fish",
      key: "fish",
      hint: "Except for isinglass derived from swim bladders and used as a clarifying agent in beer or wine",
    },
    {
      label: "Mollusc",
      key: "mollusc",
      hint: "This includes only marine molluscs. For example: oysters, clams, mussels, octopus, squid, calamari.",
    },
  ];

  const FoodAdditivesFlavourCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Added sulphites in concentrations of 10mg/kg or more",
      key: "addedSulphites",
    },
  ];

  const LegumesAndPulsesCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Lupin",
      key: "lupin",
    },
    {
      label: "Soybeans",
      key: "soybeans",
      hint: (
        <>
          Other than:
          <ul>
            <li>
              soybean oil that has been degummed, neutralised, bleached and
              deodorised
            </li>
            <li>soybean derivatives that are a tocopherol or a phytosterol</li>
          </ul>
        </>
      ),
    },
  ];

  const MilkAndDiaryCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Milk",
      key: "milk",
      hint: "Other than alcohol distilled from whey",
    },
  ];

  const NutsAndSeedsCheckboxConfigs: CheckboxConfig[] = [
    {
      label: "Almond",
      key: "almond",
    },
    {
      label: "Brazil nut",
      key: "brazilNut",
    },
    {
      label: "Cashew",
      key: "cashew",
    },
    {
      label: "Hazelnut",
      key: "hazelnut",
    },
    {
      label: "Macadamia",
      key: "macadamia",
    },
    {
      label: "Peanuts",
      key: "peanuts",
    },
    {
      label: "Pecan",
      key: "pecan",
    },
    {
      label: "Pine nut",
      key: "pineNut",
    },
    {
      label: "Pistachio",
      key: "pistachio",
    },
    {
      label: "Sesame seed",
      key: "sesameSeed",
    },
    {
      label: "Walnut",
      key: "walnut",
    },
  ];

  const allCheckboxConfigs = [
    ...CerealsAndGrainsCheckboxConfigs,
    ...EggAndEggProductsCheckboxConfigs,
    ...FishCrustaceaSeafoodCheckboxConfigs,
    ...FoodAdditivesFlavourCheckboxConfigs,
    ...LegumesAndPulsesCheckboxConfigs,
    ...MilkAndDiaryCheckboxConfigs,
    ...NutsAndSeedsCheckboxConfigs,
  ];

  const hint = "Please select any warning and advisory statements that apply.";
  const FoodAndIngredientsConfigs: CheckboxConfig[] = [
    {
      label: "Egg and egg products",
      key: "eggAndEggProducts",
      renderChildren: () => {
        return renderStatementCheckbox(
          "unpasteurised-egg-products",
          "Unpasteurised egg products",
          hint
        );
      },
    },
    {
      label: "Fish, crustacea and seafood",
      key: "fishCrustaceaSeafood",
      renderChildren: () => {
        return renderStatementCheckbox(
          "raw-fish-binding-system",
          "Raw fish that has been joined to look like a cut or fillet of fish using a binding system, without the application of heat, whether coated or not.",
          hint
        );
      },
    },
    {
      label: "Food additives and flavours",
      key: "foodAdditivesAndFlavours",
      renderChildren: () => {
        return (
          <>
            <div>
              {renderStatementCheckbox(
                "substances-excess-10g",
                "Contains one or more of the following substances, either alone or in combination, at a level of, or in excess of 10 g/100 g",
                hint
              )}
              <small>
                <ul>
                  <li>lactitol</li>
                  <li>maltitol</li>
                  <li>maltitol syrup</li>
                  <li>mannitol</li>
                  <li>xylitol</li>
                </ul>
              </small>
            </div>

            <div>
              {renderStatementCheckbox(
                "substances-excess-25g",
                "Contains one or more of the following substances, either alone, or in combination, at a level or in excess of 25 g/100 g"
              )}
              <small>
                <ul>
                  <li>erythritol</li>
                  <li>isomalt</li>
                  <li>polydextrose</li>
                  <li>sorbitol</li>
                </ul>
              </small>
            </div>

            <div>
              {renderStatementCheckbox(
                "substances-combination-10g",
                "Contains one or more of the following substances in combination at a level of or in excess of 10 g/100 g"
              )}
              <small>
                <ul>
                  <li>erythritol</li>
                  <li>isomalt</li>
                  <li>lactitol</li>
                  <li>maltitol</li>
                  <li>maltitol syrup</li>
                  <li>mannitol</li>
                  <li>polydextrose</li>
                  <li>sorbitol</li>
                  <li>xylitol</li>
                </ul>
              </small>
            </div>

            {renderStatementCheckbox(
              "aspartame-acesulphame",
              "Aspartame or aspartame-acesulphame salt"
            )}
            {renderStatementCheckbox(
              "phytosterols-phytostanols",
              "Added phytosterols, phytostanols or their esters."
            )}
            {renderStatementCheckbox("quinine", "Quinine")}
            {renderStatementCheckbox(
              "guarana-extracts",
              "Guarana or extracts of guarana"
            )}
          </>
        );
      },
    },

    {
      label: "Food containing alcohol",
      key: "foodContainingAlcohol",

      renderChildren: () => {
        return renderStatementCheckbox(
          "food-more-than-1.15-alcohol",
          "A food that contains more than 1.15% alcohol by volume",
          hint
        );
      },
    },
    {
      label: "Honey and bee products",
      key: "honeyAndBeeProducts",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox("bee-pollen", "Bee pollen", hint)}
            {renderStatementCheckbox("propolis", "Propolis")}
            {renderStatementCheckbox("royal-jelly", "Royal jelly")}
          </div>
        );
      },
    },
    {
      label: "Kava and kava root",
      key: "kavaAndKavaRoot",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "kava-root",
              "Dried or raw kava root",
              hint
            )}
            {renderStatementCheckbox(
              "kava-beverage",
              "A beverage obtained by the aqueous suspension of kava root using cold water only, and not using any organic solvent"
            )}
          </div>
        );
      },
    },
    {
      label: "Legumes and pulses",
      key: "legumesAndPulses",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "milk-soy-beverage",
              "Milk, or an equivalent beverage made from soy, that contains no more than 2.5% m/m fat.",
              hint
            )}
            {renderStatementCheckbox(
              "evaporated-dried-soy-beverage",
              "Evaporated milk, dried milk, or an equivalent product made from soy, that, when reconstituted as a beverage according to directions for direct consumption, contains no more than 2.5% m/m fat."
            )}
          </div>
        );
      },
    },
    {
      label: "Meat and meat products",
      key: "meatAndMeatProducts",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "raw-meat-formed",
              "Raw meat that has been formed to look like of a cut of meat, whether coated or not, using a binding system without the application of heat.",
              hint
            )}
            {renderStatementCheckbox(
              "raw-meat-joined",
              "Raw meat that has been joined to look like of a cut of meat, whether coated or not, using a binding system without the application of heat."
            )}
          </div>
        );
      },
    },
    {
      label: "Milk, dairy and dairy alternatives",
      key: "milkDairyAndDairyAlternatives",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "unpasteurised-milk",
              "Unpasteurised milk",
              hint
            )}
            {renderStatementCheckbox(
              "unpasteurised-liquid-milk-products",
              "Unpasteurised liquid milk products"
            )}
            {renderStatementCheckbox(
              "milk-soy-beverage",
              "Milk, or an equivalent beverage made from soy, that contains no more than 2.5% m/m fat."
            )}
            {renderStatementCheckbox(
              "evaporated-dried-soy-beverage-2.5%",
              "Evaporated milk, dried milk, or an equivalent product made from soy, that, when reconstituted as a beverage according to directions for direct consumption, contains no more than 2.5% m/m fat."
            )}
          </div>
        );
      },
    },
    {
      label: "Non-alcoholic drinks",
      key: "nonAlcoholicDrinks",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "cola-beverage-with-caffeine",
              "A cola beverage that contains added caffeine",
              hint
            )}
            {renderStatementCheckbox(
              "food-with-cola-beverage-containing-caffeine",
              "A food that contains a cola beverage that also contains added caffeine as an ingredient."
            )}
            {renderStatementCheckbox(
              "bottled-water-with-fluoride",
              "Bottled water presented that contains added fluoride"
            )}
          </div>
        );
      },
    },
    {
      label: "Oils and margarine",
      key: "oilsAndMargarine",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "edible-oil-conditions",
              "Edible oil where",
              hint
            )}
            <small>
              <ul>
                <li>
                  the label lists the specific source name of the oil, and
                </li>
                <li>
                  the oil has undergone a process that has altered its fatty
                  acid composition (e.g.: hydrogenation)
                </li>
              </ul>
            </small>
          </div>
        );
      },
    },
    {
      label: "Salt and salt substitutes",
      key: "saltAndSaltSubstitutes",

      renderChildren: () => {
        return (
          <div className="d-flex flex-column">
            {renderStatementCheckbox(
              "reduced-sodium-salt-mixtures",
              "Reduced sodium salt mixtures and salt substitutes",
              hint
            )}
          </div>
        );
      },
    },
  ];

  const selectedLabels = allCheckboxConfigs
    .filter((config) => form[config.key as keyof StatementsFormData])
    .map((config) => config.label);

  const handleCheckboxChange = (
    key: keyof StatementsFormData,
    checked: boolean
  ) => {
    updateStatements({
      form: {
        ...form,
        [key]: checked ? "1" : "",
      },
    });
  };

  const statementMessages = [
    statementData.statementSelections["unpasteurised-egg-products"]
      ? "The product is unpasteurised."
      : null,
    statementData.statementSelections["substances-excess-10g"] ||
    statementData.statementSelections["substances-excess-25g"] ||
    statementData.statementSelections["substances-combination-10g"]
      ? "Excess consumption may have a laxative effect."
      : null,
    statementData.statementSelections["aspartame-acesulphame"]
      ? "This product contains phenylalanine."
      : null,
    statementData.statementSelections["phytosterols-phytostanols"]
      ? "This product should be consumed as part of a healthy diet. This product may not be suitable for children under 5 years and pregnant or lactating women. Plant sterols do not provide additional benefits when consumed in excess of 3 grams per day."
      : null,
    statementData.statementSelections["quinine"]
      ? "This product contains quinine."
      : null,
    statementData.statementSelections["guarana-extracts"] ||
    statementData.statementSelections["cola-beverage-with-caffeine"] ||
    statementData.statementSelections["food-with-cola-beverage-containing-caffeine"]
      ? "The product contains caffeine."
      : null,
    statementData.statementSelections["bee-pollen"]
      ? "The product contains bee pollen which can cause severe allergic reactions."
      : null,
    statementData.statementSelections["propolis"]
      ? "The product contains propolis which can cause severe allergic reactions."
      : null,
    statementData.statementSelections["royal-jelly"]
      ? "This product contains royal jelly which has been reported to cause severe allergic reactions and in rare cases, fatalities, especially in asthma and allergy sufferers."
      : null,
    statementData.statementSelections["milk-soy-beverage"] ||
    statementData.statementSelections["evaporated-dried-soy-beverage"] ||
    statementData.statementSelections["evaporated-dried-soy-beverage-2.5%"]
      ? "The product is not suitable as a complete milk replacement for children under 2 years."
      : null,
    statementData.statementSelections["unpasteurised-milk"] ||
    statementData.statementSelections["unpasteurised-liquid-milk-products"]
      ? "The product has not been pasteurised."
      : null,
    statementData.statementSelections["raw-meat-formed"]
      ? "This food is formed."
      : null,
    statementData.statementSelections["raw-meat-joined"] ||
    statementData.statementSelections["raw-fish-binding-system"]
      ? "This food is joined."
      : null,
    statementData.statementSelections["kava-root"] ||
    statementData.statementSelections["kava-beverage"]
      ? "Use in moderation. May cause drowsiness."
      : null,
    statementData.statementSelections["bottled-water-with-fluoride"]
      ? "The product contains added fluoride."
      : null,
    statementData.sodiumPotassiumContent.trim() !== ""
      ? `Sodium and potassium content: ${statementData.sodiumPotassiumContent.trim()}.`
      : null,
  ].filter(Boolean) as string[];

  return (
    <>
      <div className="main-content">
        <div className="title-image">
          <h1>Statements</h1>
          <figure className="d-flex flex-column flex-lg-row gap-3 align-items-start">
            <figcaption>
              Some foods or ingredients may be harmful to some people who are
              allergic or sensitive. <br />
              These foods or ingredients must be written on the label no matter
              how small the amount <br /> and may also need a warning statement.
            </figcaption>
            <img
              src="https://www.qld.gov.au/?a=145923"
              alt="Example food label with advisory statements, warning statements and declarations."
              className="img-fluid"
            />
          </figure>
        </div>

        <div>
          <h3>Allergen declarations</h3>
          <section>
            <article>
              <b>
                Select any food or ingredient in your food from the{" "}
                <a
                  href="#alt-declaration"
                  onClick={handleGuideLink("alt-declaration")}
                >
                  {" "}
                  allergen declaration{" "}
                </a>
                list below.
              </b>
            </article>
          </section>
        </div>

        <div>
          <div className="cereals-block">
            <p>Cereals and grains</p>
            {CerealsAndGrainsCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                hint={config.hint}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="egg-block">
            <p> Egg and egg products</p>
            {EggAndEggProductsCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="fish-seafood-block">
            <p>Fish, crustacea and seafood</p>
            {FishCrustaceaSeafoodCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                hint={config.hint}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="food-additives-flavour-block">
            <p>Food additives and flavouring</p>
            {FoodAdditivesFlavourCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="legumes-and-pulses-block">
            <p>Legumes and pulses</p>
            {LegumesAndPulsesCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                hint={config.hint}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="milk-and-diary-block">
            <p>Milk and diary products</p>
            {MilkAndDiaryCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                hint={config.hint}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <div className="nuts-and-seeds-block">
            <p>Nuts and seeds</p>
            {NutsAndSeedsCheckboxConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                hint={config.hint}
                checked={!!form[config.key as keyof StatementsFormData]}
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
              />
            ))}
          </div>

          <Alert
            alertHeading="The allergens should be shown on the food label as:"
            alertMessage={
              <>
                <p>
                  <b>Contains</b>
                  {selectedLabels.length > 0
                    ? ` ${selectedLabels.join(", ")}`
                    : " "}
                </p>
              </>
            }
          />
        </div>

        <div className="warning-advisory-statements-block">
          <h3>Warning and advisory statements</h3>
          <article>
            <p>
              Select the food and ingredients from the list below to create{" "}
              <a
                href="#warn-statement"
                onClick={handleGuideLink("warn-statement")}
              >
                {" "}
                warning{" "}
              </a>
              and
              <a href="#ad-statement" onClick={handleGuideLink("ad-statement")}>
                {" "}
                advisory{" "}
              </a>
              statements.
            </p>
          </article>

          <div>
            {FoodAndIngredientsConfigs.map((config) => (
              <CheckboxWithInput
                label={config.label}
                key={config.key}
                checked={!!form[config.key as keyof StatementsFormData]}
                hint={
                  form[config.key as keyof StatementsFormData] ? config.hint : null
                }
                onChange={(checked) =>
                  handleCheckboxChange(
                    config.key as keyof StatementsFormData,
                    checked
                  )
                }
                children={
                  config.renderChildren ? (
                    <div className="px-3 py-1">
                      {config.renderChildren()}
                    </div>
                  ) : null
                }
              />
            ))}

            <div className="d-flex flex-column gap-3">
              <Textarea
                label="Enter the sodium and potassium content expressed per 100g. You may also include a declaration of the percentage reduction of sodium in the food, relative to salt."
                required={true}
                id="sodium-potassim-content"
                value={statementData.sodiumPotassiumContent}
                onChange={(event) =>
                  updateStatements({
                    sodiumPotassiumContent: event.target.value,
                  })
                }
                onInput={(event) => toggleInvalidState(event.currentTarget)}
                onBlur={(event) => toggleInvalidState(event.currentTarget)}
                invalidMessage="The sodium and potassium content must be entered for reduced sodium salt mixtures and salt substitutes."
              />

              <Alert
                alertHeading="The statements should be shown on the food label as:"
                alertMessage={
                  <p className="wrap">
                    {statementMessages.length > 0
                      ? statementMessages.join(" ")
                      : " "}
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="page-navigation-block d-flex flex-wrap gap-3 mt-3">
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className={`btn btn-primary${
            statementData.sodiumPotassiumContent.trim() === ""
              ? " disabled pe-none"
              : ""
          }`}
          role="button"
          onClick={(event) => {
            handleNextClick(event);
          }}
          aria-disabled={statementData.sodiumPotassiumContent.trim() === ""}
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
        content={<StatementsPage activeSectionId={activeSectionId} />}
      />
    </>
  );
};
