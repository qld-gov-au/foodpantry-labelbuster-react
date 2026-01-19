import {
  Accordion,
  type AccordionItemConfig,
} from "../../components/Accordion";
import { PrintButton } from "../../components/PrintButton";

const generalRequirements: AccordionItemConfig[] = [
  {
    id: "business-details",
    title: "Business details",
    content: (
      <>
        <p>
          Business details are the name and address of the food business that is
          the supplier, manufacturer, packer, vendor or importer of the food.
        </p>
        <h4>Further reading</h4>
        <i>Australia New Zealand Food Standards Code</i>
        <ul>
          <li>
            <a
              href="http://www.comlaw.gov.au/Series/F2015L00386"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.1
            </a>{" "}
            Requirements to have labels or otherwise provide information
          </li>
          <li>
            <a
              href="http://www.comlaw.gov.au/Series/F2015L00389"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.2
            </a>{" "}
            Information requirements - food identification
          </li>
        </ul>
        <i>Food Standards Australia and New Zealand</i>
        <ul>
          <li>
            <a
              href="https://www.foodstandards.gov.au/code/userguide/pages/overviewoffoodlabell1267.aspx"
              target="_blank"
              rel="noopener"
            >
              User Guides - Overview of Food Labelling
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

const extraRequirements: AccordionItemConfig[] = [
  {
    id: "vending-food",
    title: "Food sold from a vending machine",
    content: (
      <>
        <p>
          <b>If your food is sold from a vending machine:</b>
          <br />
          The name and business address of the supplier of the vending machine
          must be clearly displayed on the vending machine.
        </p>
        <h4>Further reading</h4>
        <i>Australia New Zealand Food Standards Code</i>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00386"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.1
            </a>{" "}
            Requirements to have labels or otherwise provide information
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "hamper-food",
    title: "Food sold in a hamper",
    content: (
      <>
        <p>
          If your food is sold in a hamper (e.g. gourmet cheese, olives and nuts
          in a gift box with cheese knife):
          <br />
          The name and address of the supplier of the hamper must be provided
          with the hamper.
        </p>
        <p>
          Note: Labelling information must be provided for each item of food in
          the hamper. This can include information on a label for packaged food,
          or information provided in a product sheet for unpackaged food.
        </p>
        <h4>Further reading</h4>
        <i>Australia New Zealand Food Standards Code</i>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00386"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.1
            </a>{" "}
            Requirements to have labels or otherwise provide information
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "kava-root",
    title: "Kava and kava root",
    content: (
      <>
        <p>
          <b>
            If the food for sale is not in a package and consists of kava root:
          </b>
          <br />
          The name and address for the supplier of the kava root must:
        </p>
        <ul>
          <li>Be displayed with the food; or</li>
          <li>Accompany the food for sale</li>
        </ul>
        <h4>Further reading</h4>
        <i>Australia New Zealand Food Standards Code</i>
        <ul>
          <li>
            <a
              href="https://www.legislation.gov.au/Series/F2015L00386"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.1
            </a>{" "}
            Requirements to have labels or otherwise provide information
          </li>
        </ul>
      </>
    ),
  },
];

type BusinessDetailsPageProps = {
  activeSectionId?: string | null;
};

export const BusinessDetailsPage = ({
  activeSectionId = null,
}: BusinessDetailsPageProps) => {
  return (
    <div className="side-padding vertical-padding">
      <PrintButton />
      <h2>General requirements</h2>
      <Accordion items={generalRequirements} activeItemId={activeSectionId} />
      <h2 className="mt-4">Food with extra requirements</h2>
      <Accordion items={extraRequirements} activeItemId={activeSectionId} />
    </div>
  );
};
