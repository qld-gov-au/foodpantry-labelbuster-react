import { useState } from "react";
import { SeekProAdvice } from "../../components/SeekProAdvice";

type Limitation2Props = {
  isSelect: boolean;
  onOpenHelpGuide?: (sectionId: string) => void;
  onClaimChoiceChange?: (choice: "yes" | "no") => void;
};

export const Limitation2 = ({
  isSelect,
  onOpenHelpGuide,
  onClaimChoiceChange,
}: Limitation2Props) => {
  const [serviceChoiceSpecial, setServiceChoiceSpecial] = useState<
    "yes" | "no" | null
  >(null);
  const [serviceChoiceNovel, setServiceChoiceNovel] = useState<
    "yes" | "no" | null
  >(null);
  const [serviceChoiceGenetic, setServiceChoiceGenetic] = useState<
    "yes" | "no" | null
  >(null);
  const [serviceChoiceIrradiated, setServiceChoiceIrradiated] = useState<
    "yes" | "no" | null
  >(null);
  const [serviceChoiceClaim, setServiceChoiceClaim] = useState<
    "yes" | "no" | null
  >(null);

  const showNovelBlock = isSelect && serviceChoiceSpecial === "no";
  const showGeneticBlock = isSelect && serviceChoiceNovel === "no";
  const showIrradiatedBlock = isSelect && serviceChoiceGenetic === "no";
  const showClaimBlock = isSelect && serviceChoiceIrradiated === "no";

  const handleNovelLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onOpenHelpGuide?.("novel-foods");
  };

  return (
    <>
      {isSelect && (
        <div className="special-food">
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
                  onChange={() => {
                    setServiceChoiceSpecial("yes");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceSpecialYes"
                >
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
                  onChange={() => {
                    setServiceChoiceSpecial("no");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceSpecialNo"
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {serviceChoiceSpecial === "yes" && <SeekProAdvice />}

      {showNovelBlock && (
        <div className="novel-food">
          <div>
            <div style={{ display: "flex" }}>
              Is your food a
              <a
                className="link"
                href="#novel-foods"
                onClick={handleNovelLinkClick}
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

          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceNovel"
                  id="serviceChoiceNovelYes"
                  value="1"
                  tabIndex={0}
                  onChange={() => {
                    setServiceChoiceNovel("yes");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceNovelYes"
                >
                  Yes
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceNovel"
                  id="serviceChoiceNovelNo"
                  value="2"
                  tabIndex={0}
                  onChange={() => {
                    setServiceChoiceNovel("no");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceNovelNo"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {serviceChoiceNovel === "yes" && <SeekProAdvice />}
        </div>
      )}

      {showGeneticBlock && (
        <div className="genetically-modified-food">
          <p style={{ fontWeight: "bold" }}>
            Does your food contain ingredients that are produced from gene
            technology, or is your food a genetically modified food? *
          </p>
          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceGenetic"
                  id="serviceChoiceGeneticYes"
                  value="1"
                  tabIndex={0}
                  onChange={() => setServiceChoiceGenetic("yes")}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceGeneticYes"
                >
                  Yes
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceGenetic"
                  id="serviceChoiceGeneticNo"
                  value="2"
                  tabIndex={0}
                  onChange={() => setServiceChoiceGenetic("no")}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceGeneticNo"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          {serviceChoiceGenetic === "yes" && <SeekProAdvice />}
        </div>
      )}

      {showIrradiatedBlock && (
        <div className="irradiated-food">
          <div>
            <p style={{ fontWeight: "bold" }}>
              Is your food an irradiated food? *
            </p>
            <p>
              <small>
                Irradiation of food is prohibited unless specifically permitted
                by the Food Standards Code and must comply with the specified
                conditions, using only a permitted source of radiation.
              </small>
            </p>
          </div>

          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceIrradiated"
                  id="serviceChoiceIrradiatedYes"
                  value="1"
                  tabIndex={0}
                  onChange={() => setServiceChoiceIrradiated("yes")}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceIrradiatedYes"
                >
                  Yes
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceIrradiated"
                  id="serviceChoiceIrradiatedNo"
                  value="2"
                  tabIndex={0}
                  onChange={() => setServiceChoiceIrradiated("no")}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceIrradiatedNo"
                >
                  No
                </label>
              </div>
            </div>
          </div>

          {serviceChoiceIrradiated === "yes" && <SeekProAdvice />}
        </div>
      )}

      {showClaimBlock && (
        <div className="claim-food">
          <div>
            <p style={{ fontWeight: "bold" }}>
              Do you make a claim about your food? *
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

          <div>
            <div style={{ display: "flex", gap: "40px" }}>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceClaim"
                  id="serviceChoiceClaimYes"
                  value="1"
                  tabIndex={0}
                  onChange={() => {
                    setServiceChoiceClaim("yes");
                    onClaimChoiceChange?.("yes");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceClaimYes"
                >
                  Yes
                </label>
              </div>
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="serviceChoiceClaim"
                  id="serviceChoiceClaimNo"
                  value="2"
                  tabIndex={0}
                  onChange={() => {
                    setServiceChoiceClaim("no");
                    onClaimChoiceChange?.("no");
                  }}
                />
                <label
                  className="form-check-label"
                  htmlFor="serviceChoiceClaimNo"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          {serviceChoiceClaim === "yes" && <SeekProAdvice />}
        </div>
      )}
    </>
  );
};
