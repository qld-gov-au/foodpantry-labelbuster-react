import { SideNavigation, type SideNavItem } from "./SideNavigation";
import { useFormData, type StepKey } from "../context/FormDataContext";

type LabelBusterPage =
  | "home"
  | "terms"
  | "about"
  | "limitations"
  | "foodName"
  | "businessDetails"
  | "dateMarks"
  | "storageUse"
  | "ingredients"
  | "statements"
  | "yourLabel";

type LabelBusterSideNavProps = {
  page: LabelBusterPage;
  onNavigate: (page: LabelBusterPage) => void;
};

export const LabelBusterSideNav = ({
  page,
  onNavigate,
}: LabelBusterSideNavProps) => {
  const { progress } = useFormData();
  const stepLabel = (num: number, text: string) => (
    <span className="side-nav-step">
      <span className="side-nav-step-index">{num}</span>
      <span className="side-nav-step-label">{text}</span>
    </span>
  );

  const steps: StepKey[] = [
    "terms",
    "about",
    "limitations",
    "foodName",
    "businessDetails",
    "dateMarks",
    "storageUse",
    "ingredients",
    "statements",
    "yourLabel",
  ];

  const firstLockedIndex = steps.findIndex((step) => !progress[step]);
  const maxEnabledIndex = !progress.started
    ? -1
    : firstLockedIndex === -1
    ? steps.length - 1
    : firstLockedIndex;
  const isStepEnabled = (step: StepKey) =>
    steps.indexOf(step) <= maxEnabledIndex;

  const navItems: SideNavItem[] = [
    {
      label: "About food labels",
      href: "https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/about-food-labels",
      target: "_blank",
    },
    {
      label: "Do I need a label?",
      href: "https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/do-I-need-a-label",
      target: "_blank",
    },
    {
      label: "Label Buster",
      onClick: () => onNavigate("home"),
      active: page === "home",
      children: [
        {
          label: stepLabel(1, "Terms of use"),
          onClick: () => onNavigate("terms"),
          active: page === "terms",
          disabled: !isStepEnabled("terms") && page !== "terms",
        },
        {
          label: stepLabel(2, "About food labels"),
          onClick: () => onNavigate("about"),
          active: page === "about",
          disabled: !isStepEnabled("about") && page !== "about",
        },
        {
          label: stepLabel(3, "Limitations"),
          onClick: () => onNavigate("limitations"),
          active: page === "limitations",
          disabled: !isStepEnabled("limitations") && page !== "limitations",
        },
        {
          label: stepLabel(4, "Food name"),
          onClick: () => onNavigate("foodName"),
          active: page === "foodName",
          disabled: !isStepEnabled("foodName") && page !== "foodName",
        },
        {
          label: stepLabel(5, "Business details"),
          onClick: () => onNavigate("businessDetails"),
          active: page === "businessDetails",
          disabled:
            !isStepEnabled("businessDetails") && page !== "businessDetails",
        },
        {
          label: stepLabel(6, "Date marks"),
          onClick: () => onNavigate("dateMarks"),
          active: page === "dateMarks",
          disabled: !isStepEnabled("dateMarks") && page !== "dateMarks",
        },
        {
          label: stepLabel(7, "Storage and use"),
          onClick: () => onNavigate("storageUse"),
          active: page === "storageUse",
          disabled: !isStepEnabled("storageUse") && page !== "storageUse",
        },
        {
          label: stepLabel(8, "Ingredients"),
          onClick: () => onNavigate("ingredients"),
          active: page === "ingredients",
          disabled: !isStepEnabled("ingredients") && page !== "ingredients",
        },
        {
          label: stepLabel(9, "Statements"),
          onClick: () => onNavigate("statements"),
          active: page === "statements",
          disabled: !isStepEnabled("statements") && page !== "statements",
        },
        {
          label: stepLabel(10, "Your Label"),
          onClick: () => onNavigate("yourLabel"),
          active: page === "yourLabel",
          disabled: !isStepEnabled("yourLabel") && page !== "yourLabel",
        },
      ],
    },
    {
      label: "Food product guides",
      href: "https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/food-product-guides",
      target: "_blank",
    },
    {
      label: "Kilojoule menu labelling",
      href: "https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling/kilojoule-menu-labelling",
      target: "_blank",
    },
  ];

  return (
    <SideNavigation
      title="Food labelling"
      titleHref="https://www.qld.gov.au/health/staying-healthy/food-pantry/food-labelling"
      items={navItems}
    />
  );
};
