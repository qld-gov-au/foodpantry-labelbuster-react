import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

export type AccordionItemConfig = {
  title: React.ReactNode;
  content: React.ReactNode;
  id: string;
  defaultOpen?: boolean;
};

type AccordionProps = {
  items: AccordionItemConfig[];
  flush?: boolean;
  activeItemId?: string | null;
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  flush = false,
  activeItemId = null,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initialOpen = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) {
        initialOpen.add(item.id);
      }
    });
    if (activeItemId) {
      initialOpen.add(activeItemId);
    }
    return initialOpen;
  });

  useEffect(() => {
    if (!activeItemId) return;
    setOpenItems((prev) => {
      if (prev.has(activeItemId)) {
        return prev;
      }
      const next = new Set(prev);
      next.add(activeItemId);
      return next;
    });
    const target = document.getElementById(`accordion-item-${activeItemId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeItemId]);

  const handleToggle = (key: string): void => {
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
    const allItems = new Set<string>();
    items.forEach((item) => allItems.add(item.id));
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
          {allExpanded ? (
            <>
              Collapse all
              <FontAwesomeIcon icon={faAngleUp} />
            </>
          ) : (
            <>
              Expand All
              <FontAwesomeIcon icon={faAngleDown} />
            </>
          )}
        </button>
      </div>

      <div className={accordionClass}>
        {items.map((item) => {
          const isActive = openItems.has(item.id);

          return (
            <AccordionItem
              key={item.id}
              id={item.id}
              title={item.title}
              content={item.content}
              isActive={isActive}
              onToggle={() => handleToggle(item.id)}
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
  const itemId = `accordion-item-${id}`;
  return (
    <div className="accordion-item" id={itemId}>
      <h2 className="accordion-header" id={`heading-${id}`}>
        <button
          className={`accordion-button ${!isActive ? "collapsed" : ""}`}
          type="button"
          onClick={onToggle}
          aria-expanded={isActive}
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </h2>
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isActive ? "show" : ""}`}
        aria-labelledby={`heading-${id}`}
      >
        <div className="accordion-body">{content}</div>
      </div>
    </div>
  );
};
