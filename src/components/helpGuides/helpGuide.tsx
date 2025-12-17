import React, { useState } from "react";
import "./helpGuide.css";
import { faBook,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type HelpGuideProps = {
  heading?: string;
  content: React.ReactNode;
  calloutLabel?: string;
  initialOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const HelpGuide: React.FC<HelpGuideProps> = ({
  heading = "Help guide",
  content,
  calloutLabel = "Help guide",
  initialOpen = false,
  open,
  onOpenChange,
}) => {
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(initialOpen);
  const isOpen = isControlled ? (open as boolean) : internalOpen;

  const setOpenState = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <div id="help-guide">
      {!isOpen && (
        <button
          type="button"
          className="help-guide-callout"
          onClick={() => setOpenState(true)}
        >
          <FontAwesomeIcon icon={faBook} inverse/>
          <span>{calloutLabel}</span>
        </button>
      )}

      {isOpen && (
        <>
          {/* <div className="overlay visible" onClick={() => setOpen(false)} /> */}
          <div className="help-guide-content open-menu">
            <div className="top-block">
              <div className="left-content">
                <FontAwesomeIcon icon={faBook} size="xl" inverse/>
                <h3>{heading}</h3>
              </div>
              <button
                type="button"
                className="btn btn-link help-guide-close"
                onClick={() => setOpenState(false)}
              >
                Hide <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            {content}
          </div>
        </>
      )}
    </div>
  );
};
