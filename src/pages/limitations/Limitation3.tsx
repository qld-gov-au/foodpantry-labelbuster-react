import { useState } from "react";

export const Limitation3 = () => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  const [serviceChoice, setServiceChoice] = useState<"yes" | "no" | null>(null);

  const handleLinkClick = () => {
    setActiveSectionId("novel-foods");
    setGuideOpen(true);
  };

  return (
    <>
      <div>
        Is your food a{" "}
        <a
          className="link"
          href="#alcoholic-drinks"
          onClick={() => handleLinkClick()}
        >
          novel food
        </a>
        or does it contain an ingredient that is a novel food?
        <abbr className="required" title="(required)" style={{ color: "red" }}>
          *
        </abbr>
        <p>
          <small className="hint">
            A novel food is a food or component that does not have a history of
            human consumption in Australia or New Zealand. This includes food
            that is typically not considered food, or a food made from processes
            not previously applied to food.
          </small>
        </p>
      </div>

      <div>
        <div style={{ display: "flex", gap: "40px" }}>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceSpecial"
              id="serviceChoiceNovelYes"
              value="1"
              tabIndex={0}
              onChange={() => setServiceChoice("yes")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceNovelYes">
              Yes
            </label>
          </div>
          <div className="form-check ">
            <input
              className="form-check-input"
              type="radio"
              name="serviceChoiceSpecial"
              id="serviceChoiceNovelNo"
              value="2"
              tabIndex={0}
              onChange={() => setServiceChoice("no")}
            />
            <label className="form-check-label" htmlFor="serviceChoiceNovelNo">
              No
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
