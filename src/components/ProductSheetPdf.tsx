import { Document, Page, StyleSheet, Text, View, Image, Link } from "@react-pdf/renderer";
import type { ReactNode } from "react";

export type ProductSheetData = {
  foodName: string;
  productDescription: string;
  business: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  ingredientList: string;
  containsList: string[];
  statementMessages: string[];
  dateMarkLabel: string;
  dateMarkValue: string;
  hasDateMark: boolean;
  lotIdentification: string;
  storageConditionsText: string;
  directionsText: string;
};

const NA = "No data provided";

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
    color: "#000000",
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  h2: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginTop: 16,
    marginBottom: 4,
  },
  para: {
    marginBottom: 6,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  callout: {
    backgroundColor: "#f2f7ea",
    borderLeftWidth: 5,
    borderLeftColor: "#9ebf6d",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingRight: 10,
  },
  bulletGlyph: {
    width: 12,
  },
  bulletText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  rowGrey: {
    backgroundColor: "#f6f6f6",
  },
  rowLeft: {
    width: "50%",
    paddingRight: 10,
  },
  rowRight: {
    width: "50%",
  },
  rowValueLine: {
    marginBottom: 2,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#4a4a4a",
  },
});

const Bullet = ({ children }: { children: ReactNode }) => (
  <View style={styles.bullet}>
    <Text style={styles.bulletGlyph}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

/** Two-column data row (heading left / value right) with optional grey band. */
const Row = ({
  heading,
  secondary,
  children,
}: {
  heading: string;
  secondary?: boolean;
  children: ReactNode;
}) => (
  <View style={secondary ? [styles.row, styles.rowGrey] : styles.row} wrap={false}>
    <View style={styles.rowLeft}>
      <Text style={styles.bold}>{heading}</Text>
    </View>
    <View style={styles.rowRight}>{children}</View>
  </View>
);

const Line = ({ children }: { children: ReactNode }) => (
  <Text style={styles.rowValueLine}>{children}</Text>
);

const allergenKeywordMap: Record<string, string[]> = {
  "cereals containing gluten": ["cereal", "cereals", "gluten", "wheat", "barley", "oats", "rye", "grain", "grains"],
  wheat: ["wheat"],
  egg: ["egg"],
  crustacea: ["crustacea", "crab", "crayfish", "lobster", "prawn", "prawns"],
  fish: ["fish"],
  mollusc: ["mollusc", "mussel", "oyster", "octopus", "squid", "calamari", "clam"],
  sulphites: ["sulphite", "sulphites"],
  lupin: ["lupin"],
  soybeans: ["soybean", "soybeans", "soy", "soya"],
  milk: ["milk", "whey", "casein", "cream", "butter"],
  almond: ["almond"],
  "brazil nut": ["brazil nut", "brazilnut"],
  cashew: ["cashew"],
  hazelnut: ["hazelnut"],
  macadamia: ["macadamia"],
  peanuts: ["peanut", "peanuts"],
  pecan: ["pecan"],
  "pine nut": ["pine nut", "pinenut"],
  pistachio: ["pistachio"],
  "sesame seed": ["sesame seed", "sesameseed", "sesame"],
  walnut: ["walnut"],
};

const isAllergenIngredient = (ingredient: string, allergenLabels: string[]) => {
  const normalizedIngredient = ingredient.trim().toLowerCase();

  return allergenLabels.some((label) => {
    const normalizedLabel = label.trim().toLowerCase();
    const keywords = allergenKeywordMap[normalizedLabel] ?? [normalizedLabel];

    return keywords.some((keyword) => normalizedIngredient.includes(keyword));
  });
};

const renderIngredientList = (ingredientList: string, allergenLabels: string[]) => {
  if (!ingredientList) {
    return null;
  }

  return ingredientList
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((ingredient, index) => {
      const isAllergen = isAllergenIngredient(ingredient, allergenLabels);

      return (
        <Text key={`${ingredient}-${index}`}>
          {index > 0 ? ", " : ""}
          {isAllergen ? <Text style={styles.bold}>{ingredient}</Text> : ingredient}
        </Text>
      );
    });
};

/**
 * The downloadable Product Sheet PDF — matches the Product Sheet template
 * (section order and wording) and the original product-sheet styling
 * (green success callout, two-column grey-banded data rows).
 */
export const ProductSheetDocument = ({ data }: { data: ProductSheetData }) => {
  const addressLines = [
    data.business.name,
    data.business.addressLine1,
    data.business.addressLine2,
    data.business.suburb.toUpperCase(),
    [data.business.state, data.business.postcode].filter(Boolean).join(", "),
  ].filter(Boolean);

  const statements = [
    data.containsList.length
      ? `Contains: ${data.containsList.join(", ")}.`
      : null,
    ...data.statementMessages,
  ].filter(Boolean) as string[];

  const renderedStatements = statements.map((statement, index) => {
    const isContainsStatement = statement.startsWith("Contains:");

    return (
      <Line key={`${statement}-${index}`}>
        {isContainsStatement ? <Text style={styles.bold}>{statement}</Text> : statement}
      </Line>
    );
  });

  return (
    <Document title="Label Buster - Product Sheet">
      <Page size="A4" style={styles.page}>
        {/* Your Label */}
        <Text style={styles.title}>Your Label</Text>
        <View style={styles.callout}>
          <Text style={[styles.bold, styles.para]}>
            Congratulations! You have completed all the steps in Label Buster.
          </Text>
          <Text>
            Using your responses to each question, Label Buster has generated a
            product sheet and an example food label.
          </Text>
        </View>
        <Text style={styles.para}>
          Label Buster is a brief guide to help you understand your labelling
          requirements. You may choose to get advice from a labelling
          consultant to make sure that your label complies with the Food
          Standards Code.
        </Text>

        {/* Product sheet */}
        <Text style={styles.h2}>Product sheet</Text>
        <Text style={styles.para}>
          You can take this information to a printer or graphic designer to
          create a label or use your own tools/templates. When creating your
          food label, you must ensure you meet the legibility requirements,
          such as minimum type size.
        </Text>

        {/* Legibility requirements */}
        <Text style={styles.h2}>Legibility requirements</Text>
        <Text style={styles.para}>
          All required words, statements, expressions or designs provided on a
          food label must be in English, be legible, and be prominent so it
          contrasts distinctly with the background of the label.
        </Text>
        <Text style={styles.para}>
          Information in other language is permitted, provided it does not
          negate or contradict the English information.
        </Text>
        <Text style={styles.para}>
          No specific print type or size is defined for general labelling
          requirements, however:
        </Text>
        <Bullet>
          warning statements must be in a type size of at least 3mm (or 1.5mm
          on small packages)
        </Bullet>
        <Bullet>
          a print size is prescribed in the Food Standards Code for some foods
          where a required statement must be shown (e.g. infant formula).
        </Bullet>

        {/* Data sections as two-column rows (alternating grey) */}
        <Row heading="Food name and description" secondary>
          <Line>{data.foodName || NA}</Line>
          {data.productDescription ? (
            <Line>{data.productDescription}</Line>
          ) : null}
        </Row>

        <Row heading="Business details">
          {addressLines.length ? (
            addressLines.map((line, i) => <Line key={i}>{line}</Line>)
          ) : (
            <Line>{NA}</Line>
          )}
        </Row>

        <Row heading="Ingredients" secondary>
          <Line>
            {data.ingredientList ? (
              <Text>
                Ingredients: {renderIngredientList(data.ingredientList, data.containsList)}
              </Text>
            ) : (
              NA
            )}
          </Line>
        </Row>

        {/* Nutritional information panel (static, full width) */}
        <Text style={styles.h2}>Nutritional information panel</Text>
        <Text style={styles.para}>
          A Nutrition Informational Panel must be added to your food label. The
          Food Standards Australia New Zealand nutrition panel calculator
          (
          <Link
              src="www.foodstandards.gov.au/industry/npc/Pages/Nutrition-Panel-Calculator-introduction.aspx"
            >
              www.foodstandards.gov.au/industry/npc/Pages/Nutrition-Panel-Calculator-introduction.aspx
          </Link>  
          )
          can help you prepare your nutrition information panel.
        </Text>

        {/* @todo Example NIP image (static, full width). Replace with real uploaded asset */}
        <Image
          src="src\assets\NIP-example.png"
          style={{
            width: 280.06,
            height: 310.67,
          }}
        />

        <Row heading="Statements and declarations">
          {statements.length ? renderedStatements : <Line>{NA}</Line>}
        </Row>

        <Row heading="Date mark" secondary>
          <Line>
            {data.hasDateMark
              ? `${data.dateMarkLabel}${
                  data.dateMarkValue ? `: ${data.dateMarkValue}` : ""
                }`
              : NA}
          </Line>
        </Row>

        <Row heading="Lot identification">
          <Line>{data.lotIdentification || NA}</Line>
        </Row>

        <Row heading="Storage conditions and directions for use" secondary>
          {data.storageConditionsText ? (
            <Line>
              <Text style={styles.bold}>Storage conditions: </Text>
              {data.storageConditionsText}
            </Line>
          ) : null}
          {data.directionsText ? (
            <Line>
              <Text style={styles.bold}>Directions for use: </Text>
              {data.directionsText}
            </Line>
          ) : null}
          {!data.storageConditionsText && !data.directionsText ? (
            <Line>{NA}</Line>
          ) : null}
        </Row>

        {/* Static guidance sections (full width) */}
        <Text style={styles.h2}>Weight</Text>
        <Text style={styles.para}>
          For information on how to comply with weights and measures laws visit
          the National Measurement Institute website (
            <Link
              src="www.measurement.gov.au"
            >
              www.measurement.gov.au
            </Link>
            ).
        </Text>

        <Text style={styles.h2}>Country of origin</Text>
        <Text style={styles.para}>
          Information on how to calculate and display mandatory country of
          origin
          (
          <Link
              src="www.accc.gov.au/business/advertising-promoting-your-business/country-of-origin-claims/country-of-origin-food-labelling"
            >
              www.accc.gov.au/business/advertising-promoting-your-business/country-of-origin-claims/country-of-origin-food-labelling
          </Link>
          )
          can be found on the Australian Competition and Consumer Commission
          website.
        </Text>

        <Text style={styles.h2}>Health star rating</Text>
        <Text style={styles.para}>
          Information on how to calculate and display a voluntary health star
          rating (
            <Link
              src="www.healthstarrating.gov.au/calculator"
            >
              www.healthstarrating.gov.au/calculator
            </Link>
          ) can be found at the
          Health Star Rating System website.
        </Text>
        

        <View style={styles.footer} fixed>
          <Text>
            https://www.qld.gov.au/health/staying-healthy/food-pantry/label-buster
          </Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `${pageNumber}/${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
};
