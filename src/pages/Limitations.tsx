import React, { useCallback, useState } from "react";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { InitialPage } from "./helpGuide/InitialPage";
import { SeekProAdvice } from "../components/GlobalAlert";
import { createNavHandlers } from "./help";
import { RadioGroup, type Option } from "../components/RadioGroup";

type LimitationsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

const options: Option[] = [
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];

export const Limitations = ({
  onBack,
  onNext,
  onCancel,
}: LimitationsProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [serviceChoice, setServiceChoice] = useState<string | null>(null);
  const [serviceChoiceSpecial, setServiceChoiceSpecial] = useState<
    string | null
  >(null);
  const [serviceChoiceNovel, setServiceChoiceNovel] = useState<string | null>(
    null
  );
  const [serviceChoiceGenetic, setServiceChoiceGenetic] = useState<
    string | null
  >(null);
  const [serviceChoiceIrradiated, setServiceChoiceIrradiated] = useState<
    string | null
  >(null);
  const [serviceChoiceClaim, setServiceChoiceClaim] = useState<string | null>(
    null
  );

  const { handleNextClick, handleBackClick, handleCancelClick } =
    createNavHandlers(onNext, onBack, onCancel);

  const showSpecialBlock = serviceChoice === "2";
  const showNovelBlock = showSpecialBlock && serviceChoiceSpecial === "2";
  const showGeneticBlock = showNovelBlock && serviceChoiceNovel === "2";
  const showIrradiatedBlock = showGeneticBlock && serviceChoiceGenetic === "2";
  const showClaimBlock = showIrradiatedBlock && serviceChoiceIrradiated === "2";

  const allowNext = serviceChoiceClaim === "2";

  const handlePrint = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.print();
    },
    []
  );

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    event.preventDefault();

    setActiveSectionId(sectionId);
    setGuideOpen(true);
  };

  return (
    <>
      <div>
        <h1>Limitations of Label Buster</h1>
        <p>
          Foods with complex labelling requirements are excluded from Label
          Buster. The following questions will help you to work out if you can
          use Label Buster for your food.
        </p>

        <div>
          <p style={{ display: "flex", fontWeight: "bold" }}>
            Is your food:
            <abbr
              className="required"
              title="(required)"
              style={{ color: "red" }}
            >
              *
            </abbr>
          </p>
          <ul>
            <li>
              <span style={{ display: "flex", gap: "4px" }}>
                an
                <a
                  className="link"
                  href="#alcoholic-drinks"
                  onClick={(e) => handleLinkClick(e, "alcoholic-drinks")}
                >
                  alcoholic drink
                </a>
              </span>
            </li>
            <li>
              <span style={{ display: "flex", gap: "4px" }}>
                a
                <a
                  className="link"
                  href="#caffeinated-drinks"
                  onClick={(e) => handleLinkClick(e, "caffeinated-drinks")}
                >
                  formulated caffeinated drink,
                </a>
              </span>
            </li>
            <li>
              <span style={{ display: "flex", gap: "4px" }}>
                an
                <a
                  className="link"
                  href="#drinks-electrolyte"
                  onClick={(e) => handleLinkClick(e, "drinks-electrolyte")}
                >
                  electrolyte drink
                </a>
              </span>
            </li>
            <li>
              <a
                className="link"
                href="#drinks-made"
                onClick={(e) => handleLinkClick(e, "drinks-made")}
              >
                drink made from cereals, nuts, and/or seeds
              </a>
            </li>
            <li>
              a drink base (solid or liquid) that is used to make any of the
              drinks above?
            </li>
          </ul>
        </div>

        <p>
          <small className="hint">
            For example: Beer, wine, spirits, energy drink or breakfast drink.
            Select no if your food contains alcohol as an ingredient but is not
            a drink (e.g.: brandy custard, rum balls).
          </small>
        </p>
      </div>

      <RadioGroup
        name="alcoholicDrink"
        options={options}
        value={serviceChoice}
        onChange={setServiceChoice}
      />

      {serviceChoice === "1" && <SeekProAdvice />}

      {serviceChoice === "2" && (
        <div className="special-food">
          <div>
            <p style={{ display: "flex", fontWeight: "bold" }}>
              Is your food a{" "}
              <a
                className="link"
                href="#special-food"
                onClick={(e) => handleLinkClick(e, "special-food")}
              >
                special purpose food
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
                  Formulated meal replacements and formulated supplementary
                  foods
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

          <RadioGroup
            name="serviceChoiceSpecial"
            options={options}
            value={serviceChoiceSpecial}
            onChange={setServiceChoiceSpecial}
          />
          {serviceChoiceSpecial === "1" && <SeekProAdvice />}
        </div>
      )}

      {showNovelBlock && (
        <div className="novel-food">
          <div>
            <div style={{ display: "flex", fontWeight: "bold" }}>
              Is your food a
              <a
                className="link"
                href="#novel-food"
                onClick={(e) => handleLinkClick(e, "novel-food")}
              >
                novel food
              </a>
              or does it contain an ingredient that is a novel food?
              <abbr
                className="required"
                title="(required)"
                style={{ color: "red" }}
              >
                *
              </abbr>
            </div>
            <p>
              <small className="hint">
                A novel food is a food or component that does not have a history
                of human consumption in Australia or New Zealand. This includes
                food that is typically not considered food, or a food made from
                processes not previously applied to food.
              </small>
            </p>
          </div>

          <RadioGroup
            name="serviceChoiceNovel"
            options={options}
            value={serviceChoiceNovel}
            onChange={setServiceChoiceNovel}
          />
          {serviceChoiceNovel === "1" && <SeekProAdvice />}
        </div>
      )}

      {showGeneticBlock && (
        <div className="genetically-modified-food">
          <p style={{ fontWeight: "bold" }}>
            Does your food contain ingredients that are produced from gene
            technology, or is your food a
            <a
              className="link"
              href="#modified-food"
              onClick={(e) => handleLinkClick(e, "modified-food")}
            >
              genetically modified food
            </a>
            ?
            <abbr
              className="required"
              title="(required)"
              style={{ color: "red" }}
            >
              *
            </abbr>{" "}
          </p>
          <RadioGroup
            name="serviceChoiceGenetic"
            options={options}
            value={serviceChoiceGenetic}
            onChange={setServiceChoiceGenetic}
          />
          {serviceChoiceGenetic === "1" && <SeekProAdvice />}
        </div>
      )}

      {showIrradiatedBlock && (
        <div className="irradiated-food">
          <div>
            <p style={{ fontWeight: "bold", display: "flex", gap: "5px" }}>
              Is your food an{" "}
              <a
                className="link"
                href="#irradiated-food"
                onClick={(e) => handleLinkClick(e, "irradiated-food")}
              >
                irradiated food
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
                Irradiation of food is prohibited unless specifically permitted
                by the Food Standards Code and must comply with the specified
                conditions, using only a permitted source of radiation.
              </small>
            </p>
          </div>

          <RadioGroup
            name="serviceChoiceIrradiated"
            options={options}
            value={serviceChoiceIrradiated}
            onChange={setServiceChoiceIrradiated}
          />
          {serviceChoiceIrradiated === "1" && <SeekProAdvice />}
        </div>
      )}

      {showClaimBlock && (
        <div className="claim-food">
          <div>
            <p style={{ fontWeight: "bold", display: "flex" }}>
              Do you make a{" "}
              <a
                className="link"
                href="#nutrition-claims"
                onClick={(e) => handleLinkClick(e, "nutrition-claims")}
              >
                claim
              </a>{" "}
              about your food?
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
                Claims are voluntary statements made on a food label and in
                advertising about a link between your food and health. For
                example, Gluten free, good source of calcium, organic, cage
                free.
              </small>
            </p>
          </div>
          <RadioGroup
            name="serviceChoiceClaim"
            options={options}
            value={serviceChoiceClaim}
            onChange={setServiceChoiceClaim}
          />
          {serviceChoiceClaim === "1" && <SeekProAdvice />}
        </div>
      )}

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a
          className="btn btn-primary"
          role="button"
          onClick={handleNextClick}
          aria-disabled={!allowNext}
          style={
            !allowNext
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
        content={<InitialPage activeSectionId={activeSectionId} />}
        initialOpen={false}
        open={guideOpen}
        onOpenChange={setGuideOpen}
      />
    </>
  );
};
