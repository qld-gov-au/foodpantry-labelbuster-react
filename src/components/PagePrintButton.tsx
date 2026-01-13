import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export const PagePrintButton = () => {
  
  const handlePrint = useCallback(() => {
    document.body.classList.add("print-page-only");

    const cleanup = () => {
      document.body.classList.remove("print-page-only");
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);
    requestAnimationFrame(() => {
      window.print();
    });
  }, []);

  return (
    <a
      role="button"
      onClick={(event) => {
        event.preventDefault();

        handlePrint();
      }}
      className="controls btn-print page-print-trigger"
      aria-label="Print this page"
    >
      <FontAwesomeIcon icon={faPrint} />
      <span>Print</span>
    </a>
  );
};
