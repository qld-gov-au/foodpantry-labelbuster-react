import React from "react";

export type SideNavItem = {
  label: React.ReactNode;
  href?: string;
  target?: string;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children?: SideNavItem[];
};

type SideNavigationProps = {
  title?: React.ReactNode;
  titleHref?: string;
  items: SideNavItem[];
  collapseId?: string;
  ariaLabel?: string;
};

export const SideNavigation: React.FC<SideNavigationProps> = ({
  title,
  titleHref,
  items,
  collapseId = "sideNavCollapse",
  ariaLabel = "Side Navigation",
}) => {
  const renderItems = (list: SideNavItem[], depth: number) => {
    const listClassName =
      depth === 1 ? "nav" : depth >= 3 ? "with-stalks" : undefined;

    return (
      <ul className={listClassName}>
        {list.map((item, index) => {
          const isActive =
            !!item.active && !(item.children && item.children.length > 0);
          const isDisabled = !!item.disabled && !isActive;
          const content = isDisabled ? (
            <span
              className="nav-link disabled text-muted pe-none"
              aria-disabled="true"
              tabIndex={-1}
            >
              {item.label}
            </span>
          ) : item.onClick && !isActive ? (
            <a
              className="nav-link"
              href={item.href ?? "#"}
              target={item.target}
              onClick={(event) => {
                if (!item.href || item.href === "#") {
                  event.preventDefault();
                }
                item.onClick?.();
              }}
            >
              {item.label}
            </a>
          ) : item.href && !isActive ? (
            <a className="nav-link" href={item.href} target={item.target}>
              {item.label}
            </a>
          ) : (
            <span className="nav-link">{item.label}</span>
          );

          return (
            <li
              className={`nav-item${isActive ? " active" : ""}${
                isDisabled ? " disabled" : ""
              }`}
              key={`${depth}-${index}`}
            >
              {content}
              {item.children && item.children.length > 0
                ? renderItems(item.children, depth + 1)
                : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className="qld-side-navigation" aria-label={ariaLabel}>
      <div className="nav-wrapper collapse d-lg-block" id={collapseId}>
        {title && (
          <h2 className="nav-title">
            {titleHref ? (
              <a className="nav-link" href={titleHref}>
                {title}
              </a>
            ) : (
              <span className="nav-link">{title}</span>
            )}
          </h2>
        )}
        {renderItems(items, 1)}
      </div>
    </nav>
  );
};
