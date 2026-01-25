import type React from "react";
import type { MouseEvent } from "react";

type NavHandlers = {
  handleNextClick: React.MouseEventHandler<HTMLElement>;
  handleBackClick: React.MouseEventHandler<HTMLElement>;
  handleCancelClick: React.MouseEventHandler<HTMLElement>;
};

export const createNavHandlers = (
  onNext?: () => void,
  onBack?: () => void,
  onCancel?: () => void
): NavHandlers => {
  return {
    handleNextClick: (event) => {
      event.preventDefault();
      onNext?.();
    },
    handleBackClick: (event) => {
      event.preventDefault();
      onBack?.();
    },
    handleCancelClick: (event) => {
      event.preventDefault();
      onCancel?.();
    },
  };
};

type UseGuideNavigationOptions = {
  setGuideOpen: (open: boolean) => void;
  setActiveSectionId: (id: string) => void;
};

export const useGuideNavigation = ({
  setGuideOpen,
  setActiveSectionId,
}: UseGuideNavigationOptions) => {
  const handleGuideLink =
    (sectionId: string) => (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setActiveSectionId(sectionId);
      setGuideOpen(true);
    };

  return { handleGuideLink };
};
