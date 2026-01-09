import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Accordion,
  type AccordionItemConfig,
} from "../../components/Accordion";

type StorageAndUsePageProps = {
  activeSectionId?: string | null;
};

const generalRequirements: AccordionItemConfig[] = [
  {
    id: "directions-for-use",
    title: "Directions for use",
    content: (
      <>
        <p>
          Directions for use are the instructions for how to prepare the food so
          that it is ready to eat. This includes directions that are required
          for health or safety reasons.
        </p>
        <p>
          For example: frozen chicken tenders may have the directions for use as
          “This is a raw product. Must be cooked prior to eating. Cook from
          frozen. Please ensure chicken is fully cooked before eating”.
        </p>
        <h4>Further information</h4>
        <p>
          <i>Australia and New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="http://www.comlaw.gov.au/Series/F2015L00393"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.6
            </a>{" "}
            Information requirements – directions for use and storage
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "storage-conditions",
    title: "Storage conditions",
    content: (
      <>
        <p>
          Storage conditions are instructions about how to store food so that
          the food will keep until the best-before or use-by date.
        </p>
        <p>
          For example, storage conditions for milk may be “store below 5°C”.
        </p>
        <h4>Further information</h4>
        <p>
          <i>Australia and New Zealand Food Standards Code</i>
        </p>
        <ul>
          <li>
            <a
              href="http://www.comlaw.gov.au/Series/F2015L00393"
              target="_blank"
              rel="noopener"
            >
              Standard 1.2.6
            </a>{" "}
            Information requirements – directions for use and storage
          </li>
        </ul>
      </>
    ),
  },
];

const extraRequirements: AccordionItemConfig[] = [
  {
    id: "bamboo-shoot",
    title: "Bamboo shoots",
    content: (
      <>
        <p>
          <b>If the food is raw bamboo shoots:</b>
          <br />
          The label must include directions for use indicating that bamboo
          shoots should be fully cooked before being eaten.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00393"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.6
              </a>{" "}
              Information requirements – directions for use and storage
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "cassava-food",
    title: "Cassava",
    content: (
      <>
        <p>
          <b>If the food is raw sweet cassava:</b>
          <br />
          The label must include directions for use indicating that sweet
          cassava should be peeled and fully cooked before being consumed.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00393"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.6
              </a>{" "}
              Information requirements – directions for use and storage
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "fish-seafood",
    title: "Fish, crustacea and seafood",
    content: (
      <>
        <p>
          <b>
            If the food is raw fish which has been moulded or combined to look
            like a cut or fillet of fish:
          </b>
          <br />
          The label must say that the food is either formed or joined and give
          cooking instructions to make it safe to eat.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00393"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.6
              </a>{" "}
              Information requirements – directions for use and storage
            </li>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00429"
                target="_blank"
                rel="noopener"
              >
                Standard 2.2.3
              </a>{" "}
              Fish and fish products.
              <ul>
                <li>See section 2.2.3—3 Labelling of formed or joined fish</li>
              </ul>
            </li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: "meat-food",
    title: "Meat and meat products",
    content: (
      <>
        <p>
          <b>
            If the food is raw meat which has been moulded or combined to look
            like a cut of meat:
          </b>
          <br />
          The label must say that the food is either formed or joined and give
          cooking instructions to make it safe to eat.
        </p>
        <section>
          <h4>Further reading</h4>
          <p>
            <i>Australia New Zealand Food Standards Code</i>
          </p>
          <ul>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00393"
                target="_blank"
                rel="noopener"
              >
                Standard 1.2.6
              </a>{" "}
              Information requirements – directions for use and storage
            </li>
            <li>
              <a
                href="https://www.legislation.gov.au/Series/F2015L00427"
                target="_blank"
                rel="noopener"
              >
                Standard 2.2.1
              </a>{" "}
              Meat and meat products.
              <ul>
                <li>
                  See section 2.2.1—8 Information about raw meat joined or
                  formed into the semblance of a cut of meat
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </>
    ),
  },
];

export const StorageAndUsePage = ({
  activeSectionId = null,
}: StorageAndUsePageProps) => {
  return (
    <div className="side-padding vertical-padding">
      <a className="controls btn-print" role="button">
        <FontAwesomeIcon icon={faPrint} />
        Print
      </a>

      <h2>General requirements</h2>
      <Accordion
        items={generalRequirements}
        activeItemId={activeSectionId}
      />

      <h2 style={{ marginTop: "32px" }}>Food with extra requirements</h2>
      <Accordion items={extraRequirements} activeItemId={activeSectionId} />
    </div>
  );
};
