import {
  Accordion,
  type AccordionItemConfig,
} from "../../components/Accordion";
import { PrintButton } from "../../components/PrintButton";

const generalRequirements: AccordionItemConfig[] = [
  {
    id: "what-date-mark",
    title: "What is a date mark?",
    content: (
      <>
        <p>
          A date mark is a guide to how long a food will last when stored 
          in accordance with any storage conditions provided on the label.
        </p>
        <p>Shelf life refers to the length of time a food remains:</p>
        <ul>
          <li>safe to eat</li>
          <li>looks, smells and tastes ok, and</li>
          <li>
            retains any specific qualities for which claims have been made.
          </li>
        </ul>
        <p>
          All packaged food with a shelf life of two years or less must show a date mark, except for:  
        </p>
        <ul>
          <li>Individual portions of ice cream or ice confection;</li>
          <li>
            food that is made and packaged at the premises from which it was sold; or 
          </li>
          <li>
            food that is packaged in the presence of the purchaser. 
          </li>
        </ul>
        <p>
          It may be necessary to seek expert advice from a food testing laboratory to determine:
        </p>
        <ul>
          <li>what type of date mark is required for your food </li>
          <li>
            the shelf life of the food. 
          </li>
        </ul>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
            <li>
              <a
                href="https://www.foodstandards.gov.au/consumer/labelling/dates"
                target="_blank"
                rel="noopener"
              >
                Use-by and best-before dates
              </a>{" "}
              
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "baked-for-on-date",
    title: "Baked-on and baked-for dates",
    content: (
      <>
        <p>
          The label on a package of bread with a shelf life of less than 7 days
          may be date marked with a baked-on date or a baked-for date instead of
          a{" "}
          <a
            href="#best-before-date"
            onClick={(e) => {
              e.preventDefault();
              const item = document.getElementById("accordion-item-best-before-date");
              const btn = item?.querySelector<HTMLButtonElement>(".accordion-button");
              if (btn && btn.getAttribute("aria-expanded") === "false") btn.click();
              item?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            Use-by and best-before dates
          </a>
          .
        </p>
        <p>The baked-on date means the date on which the bread was baked.</p>
        <p>The baked-for date means:</p>
        <ul>
          <li>
            If the time at which the bread was baked is before midday – the
            baked-on date
          </li>
          <li>
            If the time at which the bread was baked is after midday – the day 
            after the baked-on date. Bread that is baked after midday on one day 
            may have a baked-for date of the following day. The baked-for date 
            must not be later than 12 hours after the time the bread was baked. 
          </li>
        </ul>
        <p>
          The words ‘Baked On’ or ‘Baked For’, or the shortened terms, ‘Bkd On’
          or ‘Bkd For’, must be included on the label followed by the date, for
          example, Bkd On 15 Apr.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>Queensland Health publication</p>
          <ul>
            <li>
              <a
                href="https://www.qld.gov.au/health/staying-healthy/food-pantry/food
                -labelling/food-product-guides/bread-and-bakery-products"
                target="_blank"
                rel="noopener"
              >
                Bread and Bakery Products
              </a>
            </li>
          </ul>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "best-before-date",
    title: "Best-before dates",
    content: (
      <>
        <p>
          A best-before date is the last date on which you can expect a food to look, 
          smell and taste fresh, and to keep any property for which a claim has been made. 
          This is on the condition that the food has been stored according to any storage 
          conditions on the label and the package is unopened. 
        </p>
        <p>
          A food that has passed its best-before date will still be safe to eat.
        </p>
        <p>
          The words ‘Best Before’ must be included on the label followed by the
          date, or a direction provided about where the date is located. For
          example:
        </p>
        <ul>
          <li>Best Before 23 Dec 2027</li>
          <li>Best Before – see base of can</li>
        </ul>
        <b>
          <i>Foods may be sold after the best-before date if the food has not
          spoiled and complies with any other legislation.</i>
        </b>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "date-format",
    title: "Date mark formats",
    content: (
      <>
        <p>
          The Food Standards Code has requirements for the format of the date mark (how it appears on the label).
        </p>
        <p>The date format depends on the shelf life of the food:</p>
        <ul>
          <li>The day and month (e.g. 15/03/2027) are required for a food with a shelf life of 3 months or less.</li>
          <li>
            The month and year (e.g. Apr 2027) are required for a food with a longer shelf life.
          </li>
        </ul>
        <p>The day, month and year must be written so that it is clear which number refers to the day, the month or the year.</p>
        <p>The month can be expressed in either:</p>
        <ul>
          <li>numerical form, e.g. 01 for January; or</li>
          <li>in letters, which can be upper case, e.g. JAN or JANUARY, or lower case, e.g. Jan or January.</li>
        </ul>
        <p>
          A year can be expressed in numerical form using either: 
        </p>
        <ul>
          <li>2 digits, e.g. 27; or </li>
          <li>4 digits, e.g. 2027.</li>
        </ul>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "lot-identification",
    title: "Lot identification",
    content: (
      <>
        <p>
          Lot identification (batch number) means a number or other information 
          that identifies the premises where the food was prepared or packed, 
          and the batch the food is part of. This may be useful when several 
          batches of the same food are prepared, manufactured or packed on the 
          same day. There is no set format for lot identification. 
        </p>
        <p>
          It is not always necessary to include a separate lot identification on 
          a label, e.g. if a date mark, business name and address can identify 
          the batch of the food. If date marking is not required, lot identification 
          must be added so that the food can be identified. 
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00389/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.2
              </a>{" "}
              Information requirements – food identification
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "use-by-date",
    title: "Use-by dates",
    content: (
      <>
        <p>
          The use-by date is the date after which the food should not be eaten because 
          it is no longer safe, provided it has been stored according to any stated 
          storage conditions on the label and the package is unopened. 
        </p>
        <p>
          For example, milk is usually labelled with a use-by date because it
          may become unsafe before it becomes rancid, bitter, or separates.
        </p>
        <p>
          The words ‘Use By’ must be included on the label followed by the date. 
          For example, Use By 23 Dec 2027. 
        </p>
        <b>
          <i>Food cannot be sold and should not be eaten after the use-by date.</i>
        </b>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
];

const extraRequirements: AccordionItemConfig[] = [
  {
    id: "small-package",
    title: "Food in small packages",
    content: (
      <>
        <p>
          If the food is sold in a small package where the package has a surface
          area of less than 100 cm
          <sup>2</sup>, date marking information is only required for food requiring a use-by date. For example: A
          small bar of chocolate.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "ice-confection",
    title: "Ice cream or ice confection",
    content: (
      <>
        <p>
          If the food is a single serve of ice cream or ice confection, no date
          marking information is required.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/F2015L00401/latest/text"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.5
              </a>{" "}
              Information requirements – date marking of food for sale
            </li>
          </ul>
        </section>
      </>
    ),
  },
];

type DateMarkPageProps = {
  activeSectionId?: string | null;
};

export const DateMarkPage = ({ activeSectionId = null }: DateMarkPageProps) => {
  return (
    <div className="side-padding vertical-padding">
      <PrintButton />
      <h3>General requirements</h3>
      <Accordion items={generalRequirements} activeItemId={activeSectionId} />
      <h3 className="mt-4">Food with extra requirements</h3>
      <Accordion items={extraRequirements} activeItemId={activeSectionId} />
    </div>
  );
};
