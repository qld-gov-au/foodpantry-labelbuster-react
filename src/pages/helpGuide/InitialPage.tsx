import React from "react";
import {
  Accordion,
  type AccordionItemConfig,
} from "../../components/Accordion";
import { PrintButton } from "../../components/PrintButton";

type HelpGuideHandlers = {
  activeSectionId?: string | null;
};

const sections: AccordionItemConfig[] = [
  {
    id: "alcoholic-drinks",
    title: "Alcoholic drinks",
    content: (
      <>
        <p>
          Alcohol includes beer, wine and spirits and has unique and additional
          requirements such as number of standard drinks.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00469"
              target="_blank"
              rel="noopener"
            >
              Standard 2.7.1
            </a>{" "}
            Labelling of alcoholic beverages and food containing alcohol
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00384"
              target="_blank"
              rel="noopener"
            >
              Standard 2.7.2
            </a>{" "}
            Beer
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00388"
              target="_blank"
              rel="noopener"
            >
              Standard 2.7.3
            </a>{" "}
            Fruit wine, vegetable wine and mead
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00391"
              target="_blank"
              rel="noopener"
            >
              Standard 2.7.4
            </a>{" "}
            Wine and wine product
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00399"
              target="_blank"
              rel="noopener"
            >
              Standard 2.7.5
            </a>{" "}
            Spirits
          </li>
          <li>
            <a
              href="https://www.foodstandards.gov.au/consumer/labelling/Pages/Labelling-of-alcoholic-beverages.aspx"
              target="_blank"
              rel="noopener"
            >
              Labelling of alcoholic beverages
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "nutrition-claims",
    title: "Claims: Nutrition, health and related claims",
    content: (
      <>
        <p>
          Nutrition, health and related claims are voluntary statements made by
          food businesses on labels and in advertising about the content of
          certain nutrients or substances in a food, or the relationship between
          food and health.
        </p>
        <h4>Claims cannot be made about:</h4>
        <ul>
          <li>kava</li>
          <li>infant formula</li>
          <li>
            any food that contains more than 1.15% alcohol by volume, other than
            a nutrition content claim about energy, carbohydrate or gluten
            content; or salt or sodium content about a food that is not a
            beverage.
          </li>
        </ul>

        <h4>Health claims</h4>
        <p>
          Health claims refer to a relationship between a food and health. For
          example:
        </p>
        <ul>
          <li>Calcium for bones and teeth</li>
          <li>
            Diets high in calcium may reduce the risk of osteoporosis in people
            65 years and over
          </li>
        </ul>
        <p>
          Health claims are not permitted on foods that are high in saturated
          fat, sugar or salt.
          <br />
          There are lists of pre-approved food-health relationships that
          businesses can base their claims on. These are listed in{" "}
          <a
            href="https://www.legislation.gov.au/Series/F2015L00474"
            target="_blank"
            rel="noopener"
          >
            Schedule 4 of the Code
          </a>
          .
        </p>

        <h4>Nutrition content claims</h4>
        <p>
          Nutrition content claims indicate the presence or absence of certain
          nutrients or substances in the food, for example, &apos;low in
          fat&apos; or &apos;good source of calcium&apos;. These claims will
          need to meet certain criteria set out in the Standard. For example,
          food with a &apos;good source of calcium&apos; claim will need to
          contain not less than the amount of calcium specified in the Standard.
        </p>

        <h4>Endorsements</h4>
        <p>
          An endorsement is a nutrition content claim or health claim that is
          made with the permission of an endorsing body, for example the Heart
          Foundation Tick.
        </p>

        <h4>Consumer value claims</h4>
        <p>
          Other consumer value claims such as cage free; organic or locally
          grown are covered by Australian Competition and Consumer Commission.
        </p>

        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Details/F2018C00942"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.7
            </a>{" "}
            Nutrition, health and related claims.
            <ul>
              <li>See section 1.2.7-23 Endorsing bodies</li>
              <li>See section 1.2.7-24 Criteria for endorsements</li>
            </ul>
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00474"
              target="_blank"
              rel="noopener"
            >
              Schedule 4
            </a>{" "}
            Nutrition, health and related claims
          </li>
          <li>
            Australian Government Department of Health
            <ul>
              <li>
                Getting Your Claims Right 7. Endorsing bodies and endorsements{" "}
                <a
                  href="https://www1.health.gov.au/internet/publications/publishing.nsf/Content/frs-getting-your-claims-right-toc~7-endorsing"
                  target="_blank"
                  rel="noopener"
                >
                  https://www1.health.gov.au/internet/publications/publishing.nsf/Content/frs-getting-your-claims-right-toc~7-endorsing
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="https://www.accc.gov.au/business"
              target="_blank"
              rel="noopener"
            >
              Australian Competition and Consumer Commission
            </a>
            <ul>
              <li>website https://www.accc.gov.au/business</li>
              <li>
                Food and beverage industry - Food descriptors guideline to the
                Trade Practices Act
              </li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "drinks-made",
    title: "Drinks made from cereals, nuts, and/or seeds",
    content: (
      <>
        <p>
          Drinks made from cereals, nuts and or seeds are not suitable for
          certain age groups, depending on the amount of protein and fats in the
          product. There are strict rules on how this information must be
          labelled.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Details/F2017C00418"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.3
            </a>{" "}
            Information requirements - warning statements, advisory statements
            and declarations
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Details/F2016C00827"
              target="_blank"
              rel="noopener"
            >
              Schedule 9
            </a>{" "}
            Mandatory advisory statements and declarations
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "drinks-electrolyte",
    title: "Electrolyte drinks",
    content: (
      <>
        <p>
          Electrolyte drinks are formulated drinks which are designed for the
          rapid replacement of fluid, carbohydrates, electrolytes and minerals.
          These types of drinks, or drink bases, have strict rules about what
          substances are allowed and how this information must be labelled.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Details/F2017C00721"
              target="_blank"
              rel="noopener"
            >
              Standard 2.6.2
            </a>{" "}
            Non-alcoholic beverages and brewed soft drinks
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "caffeinated-drinks",
    title: "Formulated caffeinated drinks",
    content: (
      <>
        <p>
          Formulated caffeinated drinks have very specific rules about what
          substances are allowed and how this information must be labelled.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Details/F2015L00467"
              target="_blank"
              rel="noopener"
            >
              Standard 2.6.4
            </a>{" "}
            Formulated caffeinated beverages
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "modified-food",
    title: "Genetically modified food",
    content: (
      <>
        <p>
          Food produced using gene technology means a food that has been derived
          or developed from an organism that has been genetically modified.
          Genetically modified food means a food produced using gene technology
          that contains novel DNA, novel protein or is listed in{" "}
          <a
            href="https://www.legislation.gov.au/Series/F2015L00450"
            target="_blank"
            rel="noopener"
          >
            Schedule 26
          </a>{" "}
          of the Food Standard Code.
        </p>

        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00404"
              target="_blank"
              rel="noopener"
            >
              Standard 1.5.2
            </a>{" "}
            Food produced using gene technology
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00450"
              target="_blank"
              rel="noopener"
            >
              Schedule 26
            </a>{" "}
            Food produced using gene technology
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "irradiated-food",
    title: "Irradiated food",
    content: (
      <>
        <p>
          Food irradiation is a technology that improves the safety and extends
          the shelf life of foods by reducing or eliminating microorganisms and
          insects. Some fruits, vegetables, herbs and spices are allowed to be
          irradiated under strict conditions.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00406"
              target="_blank"
              rel="noopener"
            >
              Standard 1.5.3
            </a>{" "}
            Irradiation of food
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "novel-food",
    title: "Novel foods",
    content: (
      <>
        <p>
          Novel foods are non-traditional foods that require a safety assessment
          by FSANZ before they used in Australia. Examples of novel foods
          include:
        </p>
        <ul>
          <li>
            Dried marine micro-algae (Schizochytrium sp.) rich in
            docosahexaenoic acid
          </li>
          <li>Insects for human consumption as a protein source</li>
        </ul>
        <p>
          The{" "}
          <a
            href="https://www.foodstandards.gov.au/industry/novel/Pages/default.aspx"
            target="_blank"
            rel="noopener"
          >
            Australian Novel Food Committee
          </a>{" "}
          has developed resources to help determine if a food is a novel food
          that needs assessment.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00403"
              target="_blank"
              rel="noopener"
            >
              Standard 1.5.1
            </a>{" "}
            Novel foods
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00440"
              target="_blank"
              rel="noopener"
            >
              Schedule 25
            </a>{" "}
            Permitted Novel foods
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "special-food",
    title: "Special purpose foods",
    content: (
      <>
        <p>
          Special purpose foods have complex labelling requirements, such as an
          expanded nutrition information panel, compositional requirements and
          advisory statements. Special purpose foods include:
        </p>
        <ul>
          <li>Infant formula products</li>
          <li>Foods for infants</li>
          <li>
            Formulated meal replacements and formulated supplementary foods
          </li>
          <li>Formulated supplementary sports foods</li>
          <li>Food for special medical purposes</li>
        </ul>

        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00409"
              target="_blank"
              rel="noopener"
            >
              Standard 2.9.1
            </a>{" "}
            Infant formula products
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00417"
              target="_blank"
              rel="noopener"
            >
              Standard 2.9.2
            </a>{" "}
            Food for infants
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00419"
              target="_blank"
              rel="noopener"
            >
              Standard 2.9.3
            </a>{" "}
            Formulated meal replacements and formulated supplementary foods
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00421"
              target="_blank"
              rel="noopener"
            >
              Standard 2.9.4
            </a>{" "}
            Formulated supplementary sports foods
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00472"
              target="_blank"
              rel="noopener"
            >
              Standard 2.9.5
            </a>{" "}
            Food for special medical purposes
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "required-name",
    title: "Required names",
    content: (
      <>
        <p>
          Some special purpose foods have mandated naming requirements and
          additional advisory statements that must appear on pack.
        </p>
        <h4>Further reading</h4>
        <p>
          <i>Australia New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00403"
              target="_blank"
              rel="noopener"
            >
              Standard 1.5.1
            </a>{" "}
            Novel foods
          </li>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00440"
              target="_blank"
              rel="noopener"
            >
              Schedule 25
            </a>{" "}
            Permitted Novel foods
          </li>
        </ul>
      </>
    ),
  },
];

export const LimitationPage: React.FC<HelpGuideHandlers> = ({
  activeSectionId = null,
}) => {
  return (
    <div className="side-padding vertical-padding">
      <PrintButton/>
      <h3>Complex requirements</h3>
      <Accordion items={sections} activeItemId={activeSectionId} />
    </div>
  );
};
