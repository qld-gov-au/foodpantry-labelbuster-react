import { SideNavigation, type SideNavItem } from "./SideNavigation";

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
  const stepLabel = (num: number, text: string) => (
    <span className="side-nav-step">
      <span className="side-nav-step-index">{num}</span>
      <span className="side-nav-step-label">{text}</span>
    </span>
  );

  const navItems: SideNavItem[] = [
    {
      label: "About food labels",
      onClick: () => onNavigate("about"),
      active: page === "about",
    },
    {
      label: "Do I need a label?",
      onClick: () => onNavigate("limitations"),
      active: page === "limitations",
    },
    {
      label: "Label Buster",
      children: [
        {
          label: stepLabel(1, "Terms of use"),
          onClick: () => onNavigate("terms"),
          active: page === "terms",
        },
        {
          label: stepLabel(2, "About food labels"),
          onClick: () => onNavigate("about"),
          active: page === "about",
        },
        {
          label: stepLabel(3, "Limitations"),
          onClick: () => onNavigate("limitations"),
          active: page === "limitations",
        },
        {
          label: stepLabel(4, "Food name"),
          onClick: () => onNavigate("foodName"),
          active: page === "foodName",
        },
        {
          label: stepLabel(5, "Business details"),
          onClick: () => onNavigate("businessDetails"),
          active: page === "businessDetails",
        },
        {
          label: stepLabel(6, "Date marks"),
          onClick: () => onNavigate("dateMarks"),
          active: page === "dateMarks",
        },
        {
          label: stepLabel(7, "Storage and use"),
          onClick: () => onNavigate("storageUse"),
          active: page === "storageUse",
        },
        {
          label: stepLabel(8, "Ingredients"),
          onClick: () => onNavigate("ingredients"),
          active: page === "ingredients",
        },
        {
          label: stepLabel(9, "Statements"),
          onClick: () => onNavigate("statements"),
          active: page === "statements",
        },
        {
          label: stepLabel(10, "Your Label"),
          onClick: () => onNavigate("yourLabel"),
          active: page === "yourLabel",
        },
      ],
    },
    {
      label: "Food product guides",
      href: "#",
    },
    {
      label: "Kilojoule menu labelling",
      href: "#",
    },
  ];

  return <SideNavigation title="Food labelling" items={navItems} />;
};
