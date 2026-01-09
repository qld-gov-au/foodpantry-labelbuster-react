import React, { useState } from "react";

export type AccordionItemConfig = {
  title: React.ReactNode;
  content: React.ReactNode;
  id?:string;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItemConfig[];
  flush?: boolean;
};

export const TestAccordion: React.FC<AccordionProps> = ({
  items,
  flush = false,
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(() => {
    const initialOpen = new Set<number>();
    items.forEach((item, index) => {
      if (item.defaultOpen) {
        initialOpen.add(index);
      }
    });
    return initialOpen;
  });

  const handleToggle = (key: number): void => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const expandAll = (): void => {
    const allItems = new Set<number>();
    items.forEach((_, index) => allItems.add(index));
    setOpenItems(allItems);
  };

  const collapseAll = (): void => {
    setOpenItems(new Set());
  };

  const allExpanded = openItems.size === items.length;

  const accordionClass = ["accordion", flush && "accordion-flush"]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
        <div className="d-flex justify-content-end mb-2">
          <button
            type="button"
            className="btn btn-link text-decoration-none p-0"
            onClick={allExpanded ? collapseAll : expandAll}
            style={{ fontSize: "0.95rem" }}
          >
            {allExpanded ? "Collapse all" : "Expand all"}
          </button>
        </div>

      <div className={accordionClass}>
        {items.map((item, index) => {
          const isActive = openItems.has(index);

          return (
            <AccordionItem
              key={index}
              id={`item-${index}`}
              title={item.title}
              content={item.content}
              isActive={isActive}
              onToggle={() => handleToggle(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

type AccordionItemProps = {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
};

const AccordionItem = ({
  id,
  title,
  content,
  isActive,
  onToggle,
}: AccordionItemProps) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${id}`}>
        <button
          className={`accordion-button ${!isActive ? "collapsed" : ""}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isActive}
        >
          {title}
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
        aria-labelledby={`heading-${id}`}
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};
