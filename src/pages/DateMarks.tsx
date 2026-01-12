import { useState } from "react";
import type { MouseEvent } from "react";
import { RadioGroup } from "../components/RadioGroup";
import { Input } from "../components/Input";
import { HelpGuide } from "../components/helpGuides/HelpGuide";
import { DateMarkPage } from "./helpGuide/DateMarkPage";
import { createNavHandlers } from "./help";
import { Alert } from "../components/GlobalAlert";
import { useFormData } from "../context/FormDataContext";

type DateMarksProps = {
  onBack?: () => void;
  onNext?: () => void;
  onCancel?: () => void;
};

export const DateMarks = ({ onBack, onNext, onCancel }: DateMarksProps) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const { formData, updateDateMarks } = useFormData();
  const {
    shelfLife2DaysChoice,
    shelfLife7DaysChoice,
    shelfLifeCertainDaysChoice,
    dateMarkType,
    dateValue,
    lotIdentification,
  } = formData.dateMarks;

  const { handleBackClick, handleNextClick, handleCancelClick } =
    createNavHandlers(onNext, onBack, onCancel);

  const toggleInvalidState = (el: HTMLInputElement | HTMLSelectElement) => {
    if (el.value.trim()) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
    }
  };

  const handleGuideLink = (
    sectionId: string,
    event: MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();

    setActiveSectionId(sectionId);
    setGuideOpen(true);
  };

  const dateMarkBlockVisible =
    shelfLife2DaysChoice === "1" ||
    shelfLife7DaysChoice === "1" ||
    shelfLifeCertainDaysChoice === "1" ||
    shelfLifeCertainDaysChoice === "2";

  const isValid =
    dateMarkBlockVisible &&
    !!dateMarkType &&
    (dateMarkType === "none-mark"
      ? lotIdentification.trim().length > 0
      : dateValue.trim().length > 0);

  const renderDateMarkBlock = () => (
    <div className="food-date-mark-select">
      <p style={{ fontWeight: "bold", display: "flex" }}>
        What type of date mark do you need for your food?{" "}
        <abbr className="required" title="(required)" style={{ color: "red" }}>
          *
        </abbr>
      </p>
      <RadioGroup
        inline={false}
        name="dateMark"
        options={[
          { label: "Use-by date", value: "use-by" },
          { label: "Best-before date", value: "best-before" },
          { label: "Baked-on date", value: "baked-on" },
          { label: "Baked-for date", value: "baked-for" },
          { label: "Do not need a date mark", value: "none-mark" },
        ]}
        value={dateMarkType || ""}
        onChange={(val) => updateDateMarks({ dateMarkType: val })}
      />

      {dateMarkType && dateMarkType !== "none-mark" && (
        <div className="food-date-input-block">
          <p style={{ fontWeight: "bold", display: "flex" }}>
            What is the date for the food?{" "}
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
              The date will usually be in the{" "}
              <a
                href="#date-format"
                onClick={(e) => handleGuideLink("date-format", e)}
              >
                {" "}
                date format{" "}
              </a>
              of:
              <ul>
                <li>
                  dd/mm/yyyy (e.g.: 15/3/2020) for food with a shelf life of 3
                  months or less, or
                </li>
                <li>
                  mmm/yyyy (e.g.: Apr 2021) for food with a shelf life of more
                  than 3 months.
                </li>
              </ul>
            </small>
          </div>

          <Input
            type="text"
            id="food-date"
            label="Food date"
            hint="Leave this question blank if the food is not packaged or does not need a date mark."
            value={dateValue}
            onChange={(e) => updateDateMarks({ dateValue: e.target.value })}
            onInput={(e) => toggleInvalidState(e.currentTarget)}
            onBlur={(e) => toggleInvalidState(e.currentTarget)}
            invalidMessage="Date must be entered when type of date mark is selected"
            required
          />

          <Input
            type="text"
            id="lotIdentification-optional"
            label="Lot identification"
            hint={
              <p>
                <a
                  href="#lot-identification"
                  onClick={(e) => handleGuideLink("lot-identification", e)}
                >
                  Lot identification
                </a>{" "}
                helps identify food. You must include lot identification if you
                are not using a date mark. If your date mark is your lot
                identification, leave blank; otherwise enter a lot
                identification below.
              </p>
            }
            value={lotIdentification}
            required={false}
            onChange={(e) =>
              updateDateMarks({ lotIdentification: e.target.value })
            }
          />
        </div>
      )}

      {dateMarkType === "none-mark" && (
        <Input
          type="text"
          id="lotIdentification-required"
          label="Lot identification"
          hint={
            <p>
              <a
                href="#lot-identification"
                onClick={(e) => handleGuideLink("lot-identification", e)}
              >
                Lot identification
              </a>{" "}
              helps identify food. You must include lot identification if you
              are not using a date mark. If your date mark is your lot
              identification, leave blank; otherwise enter a lot identification
              below.
            </p>
          }
          value={lotIdentification}
          required
          invalidMessage="The lot identification is mandatory"
          onChange={(e) =>
            updateDateMarks({ lotIdentification: e.target.value })
          }
          onInput={(e) => toggleInvalidState(e.currentTarget)}
          onBlur={(e) => toggleInvalidState(e.currentTarget)}
        />
      )}
    </div>
  );

  return (
    <>
      <div>
        <h1>Date marks</h1>
        <figure style={{ display: "flex" }} className="">
          <figcaption>
            Foods that should be eaten before a certain date for health and
            safety reasons must be labelled with a{" "}
            <a
              href="#use-by-date"
              onClick={(e) => handleGuideLink("use-by-date", e)}
            >
              use-by date
            </a>
            . Other food that should be eaten in 2 years must have a{" "}
            <a
              href="#best-before-date"
              onClick={(e) => handleGuideLink("best-before-date", e)}
            >
              best-before date
            </a>
            .
          </figcaption>
          <img
            className="image-ratio-2x3  position-x-center position-y-center"
            src="https://www.qld.gov.au/?a=145668"
            alt="Example food label with the business name and the street address of the food business."
          ></img>
        </figure>
      </div>

      <div>
        <div className="shelf-life-2days-block">
          <p style={{ fontWeight: "bold", display: "flex" }}>
            Does your food have a shelf life of more than 2 years?
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
                <li>Apricot jam in a bottle that has been heat treated</li>
                <li>Canned peaches</li>
              </ul>
            </small>
          </div>

          <RadioGroup
            name="shelfLife2DaysChoice"
            options={[
              { label: "Yes", value: "1" },
              { label: "No", value: "2" },
            ]}
            value={shelfLife2DaysChoice}
            onChange={(val) => updateDateMarks({ shelfLife2DaysChoice: val })}
            inline
          />

          {shelfLife2DaysChoice === "1" && (
            <>
              <Alert
                variant="info"
                alertHeading=" No date mark is required"
                alertMessage={
                  <p>
                    No date marking information is required for a food with a
                    shelf life of more than 2 years. If date marking is not
                    required, a food business must add a
                    <a
                      href="#lot-identification"
                      onClick={(e) => handleGuideLink("lot-identification", e)}
                    >
                      {" "}
                      Lot identification{" "}
                    </a>
                    so that the food can be identified.
                  </p>
                }
              />
              {renderDateMarkBlock()}
            </>
          )}
        </div>

        {shelfLife2DaysChoice === "2" && (
          <div className="shelf-life-7days-block">
            <p style={{ fontWeight: "bold", display: "flex" }}>
              Is your food bread, with a shelf life of less than 7 days?
              <abbr
                className="required"
                title="(required)"
                style={{ color: "red" }}
              >
                *
              </abbr>
            </p>

            <RadioGroup
              name="shelfLife7DaysChoice"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "2" },
              ]}
              value={shelfLife7DaysChoice}
              onChange={(val) => updateDateMarks({ shelfLife7DaysChoice: val })}
            />

            {shelfLife7DaysChoice === "1" && (
              <>
                <Alert
                  variant="info"
                  alertHeading="Best-before, baked-on or baked-for date"
                  alertMessage={
                    <div>
                      Bread with a shelf life of less than 7 days can be
                      labelled using either a:
                      <ul>
                        <li>
                          <a
                            href="#best-before-date"
                            onClick={(e) =>
                              handleGuideLink("best-before-date", e)
                            }
                          >
                            Best-before date
                          </a>
                        </li>
                        <li>
                          <a
                            href="#baked-for-on-date"
                            onClick={(e) =>
                              handleGuideLink("baked-for-on-date", e)
                            }
                          >
                            Baked-for date{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="#baked-for-on-date"
                            onClick={(e) =>
                              handleGuideLink("baked-for-on-date", e)
                            }
                          >
                            Baked-on date{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  }
                />
                {renderDateMarkBlock()}
              </>
            )}
          </div>
        )}

        {shelfLife7DaysChoice === "2" && (
          <>
            <div>
              <p style={{ fontWeight: "bold", display: "flex" }}>
                Does your food need to be eaten before a certain date because of
                health and safety?
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
                      Food that may contain bacteria that will grow at fridge
                      temperatures (e.g.: Listeria)
                    </li>
                    <li>
                      Perishable ready-to-eat food that will spoil (become
                      mouldy, rancid or soured) before it becomes unsafe (e.g.:
                      deli salads, prepared salads).
                    </li>
                  </ul>
                </small>
              </div>
            </div>

            <RadioGroup
              name="shelfLifeCertainDaysChoice"
              options={[
                { label: "Yes", value: "1" },
                { label: "No", value: "2" },
              ]}
              value={shelfLifeCertainDaysChoice}
              onChange={(val) =>
                updateDateMarks({ shelfLifeCertainDaysChoice: val })
              }
            />

            {shelfLifeCertainDaysChoice === "1" && (
              <>
                <Alert
                  variant="info"
                  alertHeading=" Use-by date"
                  alertMessage={
                    <p>
                      These foods must be labelled with a{" "}
                      <a
                        href="#use-by-date"
                        onClick={(e) => handleGuideLink("use-by-date", e)}
                      >
                        {" "}
                        use-by date{" "}
                      </a>
                      because they may become unsafe to eat after the use-by
                      date has passed. A food may look, smell and taste ok but
                      be unsafe to eat.
                    </p>
                  }
                />
                {renderDateMarkBlock()}
              </>
            )}

            {shelfLifeCertainDaysChoice === "2" && (
              <>
                <Alert
                  variant="info"
                  alertHeading="Best-before date"
                  alertMessage={
                    <p>
                      A best-before date is required for all foods with a shelf
                      life of 2 years or less that do not need a use-by date.
                      The best-before date is the date up to which the food
                      remains with good appearance, smell and taste, and keeps
                      any qualities for which a claim has been made.
                    </p>
                  }
                />
                {renderDateMarkBlock()}
              </>
            )}
          </>
        )}
      </div>

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
          onClick={handleNextClick}
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
        open={guideOpen}
        onOpenChange={setGuideOpen}
        content={<DateMarkPage activeSectionId={activeSectionId} />}
      />
    </>
  );
};
