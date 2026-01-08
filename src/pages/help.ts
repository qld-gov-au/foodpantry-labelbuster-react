import type React from "react";
import type { MouseEvent } from "react";

type NavHandlers = {
  handleNextClick: React.MouseEventHandler<HTMLElement>;
  handleBackClick: React.MouseEventHandler<HTMLElement>;
};

export const createNavHandlers = (
  onNext?: () => void,
  onBack?: () => void
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
    (sectionId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setActiveSectionId(sectionId);
      setGuideOpen(true);
    };

  return { handleGuideLink };
};
