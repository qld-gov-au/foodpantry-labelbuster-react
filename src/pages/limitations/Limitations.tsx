import React, { useCallback, useState } from "react";
import { HelpGuide } from "../../components/helpGuides/HelpGuide";
import { InitialPage } from "../helpGuide/InitialPage";
import { SeekProAdvice } from "../../components/helpGuides/seekProAdvice";
import { Limitation2 } from "./Limitation2";

export const Limitations = () => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [serviceChoice, setServiceChoice] = useState<"yes" | "no" | null>(null);

  const handlePrint = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      
      window.print();
    },
    []
  );

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string | null
  ) => {
    if (sectionId) {

      event.preventDefault();
      setActiveSectionId(sectionId);
      setGuideOpen(true);
    }
  };

  const guideContent = (
    <InitialPage onPrint={handlePrint} activeSectionId={activeSectionId} />
  );

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
          Is your food:
          <abbr
            className="required"
            title="(required)"
            style={{ color: "red" }}
          >
            *
          </abbr>
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

      <div>
        <div style={{ display: "flex", gap: "40px" }}>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceMain"
              id="serviceChoiceMainYes"
              value="1"
              tabindex={0}
              onChange={() => setServiceChoice("yes")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceMainYes">
              Yes
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceMain"
              id="serviceChoiceMainNo"
              value="2"
              tabindex={0}
              onChange={() => setServiceChoice("no")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceMainNo">
              No
            </label>
          </div>
        </div>
      </div>

      {serviceChoice === "yes" ? <SeekProAdvice /> : <Limitation2 />}

      <HelpGuide
        heading="Help guide"
        content={guideContent}
        initialOpen={false}
        open={guideOpen}
        onOpenChange={setGuideOpen}
      />
    </>
  );
};
