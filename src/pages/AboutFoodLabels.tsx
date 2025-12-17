import React, { useEffect } from "react";
import Collapse from "bootstrap/js/dist/collapse";

type AboutFoodLabelsProps = {
  onBack?: () => void;
  onNext?: () => void;
};

export const AboutFoodLabels = ({ onBack, onNext }: AboutFoodLabelsProps) => {
  const handleNextClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNext?.();
  };

  const handleBackClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onBack?.();
  };

  const sections = [
    {
      id: "one",
      heading: "1 Food name and description",
      img: { src: "https://www.qld.gov.au/?a=145669", alt: "Example food label with a food name and description." },
      body: (
        <>
          <p>
            Food labels must show the name of the food to help identify the food.
          </p>
          <p>
            The name and description of the food must reflect its true nature. For example, strawberry yoghurt must
            contain strawberries. If the yoghurt contained strawberry flavouring rather than real fruit, then the name
            would need to indicate that it is strawberry-flavoured yoghurt.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145669" alt="Example food label with a food name and description." />
          </figure>
          <p>
            If the name of the food does not reflect its true nature, then you must include a description of the true
            nature on the label. For example, Luke's Hot's Sauce (<i>red chilli pepper sauce</i>).
          </p>
        </>
      ),
    },
    {
      id: "two",
      heading: "2 Business details",
      img: { src: "https://www.qld.gov.au/?a=145666", alt: "Example food label with the business name and the street address of the food business." },
      body: (
        <>
          <p>
            To help customers identify where food has come from or to use for a food recall when food is unsafe, a food
            label must include the following business details:
          </p>
          <ul>
            <li>name of the business supplying the food</li>
            <li>
              business address in Australia or New Zealand, or a description of the location, of the premises where the
              business is being operated. A postal address cannot be used.
            </li>
          </ul>
          <figure>
            <img
              src="https://www.qld.gov.au/?a=145666"
              alt="Example food label with the business name and the street address of the food business."
            />
          </figure>
        </>
      ),
    },
    {
      id: "three",
      heading: "3 Weights",
      img: { src: "https://www.qld.gov.au/?a=145675", alt: "Example food label with the weight of the food." },
      body: (
        <>
          <p>
            The National Measurement Institute is responsible for making sure food is measured and weighed correctly,
            and that the food is labelled with the correct weight and unit.
          </p>
          <p>
            For example, food labelled as being 500g should weigh 500g and use the metric system of grams (g), kilograms
            (kg), millilitres (mL), litres (L), etc.
          </p>
          <p>
            Visit the
            <a
              href="https://www.industry.gov.au/regulations-and-standards/buying-and-selling-goods-and-services-by-weights-and-other-measures"
              target="_blank"
            >
              NMI website
            </a>
            for more information on how to comply with the laws around weights and other measures.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145675" alt="Example food label with the weight of the food." />
          </figure>
        </>
      ),
    },
    {
      id: "four",
      heading: "4 Date marks",
      img: { src: "https://www.qld.gov.au/?a=145668", alt: "Example food label with a date mark such as a use by date, best before date, baked on, or baked for date." },
      body: (
        <>
          <p>Food packaged with a shelf life of 2 years or less must show a date mark.</p>
          <p>
            Foods that should be eaten before a certain date for health and safety reasons must be labelled with a
            use-by date. Otherwise, a best-before date is required if the food has a shelf life of less than 2 years.
            Although it may be safe to eat the food after the best-before date, the food may have lost quality or some
            nutritional value.
          </p>
          <p>Bread with a shelf-life of less than 7 days, can use a baked-for date or baked-on date instead of a best-before date.</p>
          <figure>
            <img
              src="https://www.qld.gov.au/?a=145668"
              alt="Example food label with a date mark such as a use by date, best before date, baked on, or baked for date."
            />
          </figure>
        </>
      ),
    },
    {
      id: "five",
      heading: "5 Lot identification",
      img: { src: "https://www.qld.gov.au/?a=145672", alt: "Example food label with the lot identification." },
      body: (
        <>
          <p>
            The lot identification means a number or other information that identifies where the food was made and the
            batch it was part of. It is not always necessary to include a lot identification on a label if a date mark,
            business name and address can identify the food. If date marking is not required, lot identification must be
            added so that the food can be identified.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145672" alt="Example food label with the lot identification." />
          </figure>
        </>
      ),
    },
    {
      id: "six",
      heading: "6 Storage conditions and directions for use",
      img: { src: "https://www.qld.gov.au/?a=145674", alt: "Example food label with storage conditions and directions for use." },
      body: (
        <>
          <p>
            <b>Storage conditions</b>
            <br />
            To keep food until its best-before or use-by date include storage conditions on your label.
          </p>
          <p>
            <b>Directions for use</b>
            <br />A food label must have directions on how to use or prepare the food if needed for health and safety
            reasons.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145674" alt="Example food label with storage conditions and directions for use." />
          </figure>
        </>
      ),
    },
    {
      id: "seven",
      heading: "7 Ingredients",
      img: { src: "https://www.qld.gov.au/?a=145670", alt: "Example food label with a list of ingredients." },
      body: (
        <>
          <p>
            A food label must contain a list of ingredients. The Food Standards Code has rules that describe how each
            ingredient must be listed, how it is named, extra requirements if an ingredient contains allergens, and how
            the list is formatted.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145670" alt="Example food label with a list of ingredients." />
          </figure>
        </>
      ),
    },
    {
      id: "eight",
      heading: "8 Advisory statements, warning statements and declarations",
      img: { src: "https://www.qld.gov.au/?a=145670", alt: "Example food label with a list of ingredients." },
      body: (
        <>
          <p>
            A food label must contain a list of ingredients. The Food Standards Code has rules that describe how each
            ingredient must be listed, how it is named, extra requirements if an ingredient contains allergens, and how
            the list is formatted.
          </p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145670" alt="Example food label with a list of ingredients." />
          </figure>
        </>
      ),
    },
    {
      id: "nine",
      heading: "9 Nutrition information panel",
      img: { src: "https://www.qld.gov.au/?a=145671", alt: "Example food label with nutrition information panel." },
      body: (
        <>
          <p>
            The nutrition information panel (NIP) shows the number of servings in the package and the average amounts in
            a serving of food and per 100 grams (or 100 millilitres) of food for:
          </p>
          <ul>
            <li>energy (in kilojoules)</li>
            <li>protein</li>
            <li>fat (including saturated fat)</li>
            <li>carbohydrates (including sugars)</li>
            <li>sodium</li>
          </ul>
          <figure>
            <img src="https://www.qld.gov.au/?a=145671" alt="Example food label with nutrition information panel." />
          </figure>
          <p>
            If a nutrition, health or related claim is made, the NIP must also show the amount of nutrient or substance.
            For example: the amount of calcium must be shown in the nutrition information panel if a claim about calcium
            is made.
          </p>
        </>
      ),
    },
    {
      id: "ten",
      heading: "10 Claims",
      img: { src: "https://www.qld.gov.au/?a=145667", alt: "Example food label with nutrition or health claims." },
      body: (
        <>
          <p>
            There are strict requirements about claims that can be made and how they should be written on a label.
          </p>
          <p>
            Nutrition content claims are claims about the content of certain nutrients or substances in a food. For
            example, contains calcium.
          </p>
          <p>Health claims refer to a relationship between food and health. For example, calcium for bone and teeth.</p>
          <figure>
            <img src="https://www.qld.gov.au/?a=145667" alt="Example food label with nutrition or health claims." />
          </figure>
        </>
      ),
    },
  ];

  useEffect(() => {
    const group = document.getElementById("accordion-group-1");
    if (!group) return;

    const cleanups: Array<() => void> = [];

    // Ensure collapses are initialised but don't auto-toggle on init
    group.querySelectorAll<HTMLElement>(".accordion-collapse").forEach((el) => {
      Collapse.getOrCreateInstance(el, { toggle: false });
    });

    // Allow each button to toggle its own panel open/closed
    group.querySelectorAll<HTMLButtonElement>(".accordion-button").forEach((button) => {
      const targetSelector = button.getAttribute("data-bs-target");
      if (!targetSelector) return;
      const target = document.querySelector<HTMLElement>(targetSelector);
      if (!target) return;

      const handler = (event: Event) => {
        event.preventDefault();
        Collapse.getOrCreateInstance(target, { toggle: false }).toggle();
      };

      button.addEventListener("click", handler);
      cleanups.push(() => button.removeEventListener("click", handler));
    });

    // Basic "open/close all" support
    const toggleAllButton = group.querySelector<HTMLButtonElement>(".accordion-toggle-btn");
    if (toggleAllButton) {
      const toggleAllHandler = (event: Event) => {
        event.preventDefault();
        const collapses = Array.from(group.querySelectorAll<HTMLElement>(".accordion-collapse"));
        const anyClosed = collapses.some((el) => !el.classList.contains("show"));

        collapses.forEach((el) => {
          const instance = Collapse.getOrCreateInstance(el, { toggle: false });
          if (anyClosed) {
            instance.show();
          } else {
            instance.hide();
          }
        });

        toggleAllButton.classList.toggle("accordion-toggle-btn--open", anyClosed);
        toggleAllButton.classList.toggle("accordion-toggle-btn--closed", !anyClosed);
        toggleAllButton.textContent = anyClosed ? "Close all" : "Open all";
      };

      toggleAllButton.addEventListener("click", toggleAllHandler);
      cleanups.push(() => toggleAllButton.removeEventListener("click", toggleAllHandler));
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div>
        <h1>About food labels</h1>

        <figure className="">
          <figcaption>
            Select on the food label sections below to learn about labels.
          </figcaption>
          <img
            className="image-ratio-3x2  position-x-center position-y-center"
            src="https://www.qld.gov.au/?a=148648"
            alt="An example label for strawberry yoghurt"
          />
        </figure>

        <div className="accordion-group">
          <div className="accordion-toggle">
            <button
              className="accordion-toggle-btn accordion-toggle-btn--closed"
              type="button"
            >
              Open all
            </button>
          </div>
          <div className="accordion" id="accordion-group-1">
            {sections.map((section, index) => {
              const headingId = `heading-${section.id}`;
              const collapseId = `collapse-${section.id}`;
              const isFirst = index === 0;
              return (
                <div className="accordion-item" key={section.id}>
                  <h2 className="accordion-header" id={headingId}>
                    <button
                      className={`accordion-button ${isFirst ? "" : "collapsed"}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${collapseId}`}
                      aria-expanded={isFirst}
                      aria-controls={collapseId}
                    >
                      {section.heading}
                    </button>
                  </h2>

                  <div
                    id={collapseId}
                    className={`accordion-collapse collapse ${isFirst ? "show" : ""}`}
                    aria-labelledby={headingId}
                    role="region"
                  >
                    <div className="accordion-body">
                      {section.body}
                      {section.img && (
                        <figure>
                          <img src={section.img.src} alt={section.img.alt} />
                        </figure>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <a className="btn btn-primary" role="button" onClick={handleBackClick}>
          <span className="btn-label-default">Back</span>
        </a>

        <a className="btn btn-primary" role="button" onClick={handleNextClick}>
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
    </>
  );
};
