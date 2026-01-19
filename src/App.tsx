import { useState } from "react";
import "./App.css";
import "@qld-gov-au/qgds-bootstrap5/qld.bootstrap.css";
import "@qld-gov-au/qgds-bootstrap5/qld.bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { TermsOfUse } from "./pages/TermsOfUse";
import { Home } from "./pages/Home";
import { AboutFoodLabels } from "./pages/AboutFoodLabels";
import { Limitations } from "./pages/Limitations";
import { FoodName } from "./pages/FoodName";
import { BusinessDetails } from "./pages/BusinessDetails";
import { DateMarks } from "./pages/DateMarks";
import { StorageAndUse } from "./pages/StorageAndUse";
import { Ingredients } from "./pages/Ingredients";
import { Statements } from "./pages/Statements";
import { YourLabel } from "./pages/YourLabel";
import { LabelBusterSideNav } from "./components/LabelBusterSideNav";
import { ConfirmModal } from "./components/ConfirmModal";
import { PagePrintButton } from "./components/PagePrintButton";
import {
  FormDataProvider,
  useFormData,
  type StepKey,
} from "./context/FormDataContext";

type Page =
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

const AppContent = () => {
  const [page, setPage] = useState<Page>("home");
  const [cancelOpen, setCancelOpen] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const { completeStep, resetProgress, startSession } = useFormData();

  const handleCancel = () => {
    setCancelOpen(true);
  };

  const handleConfirmCancel = () => {
    resetProgress();
    setPage("home");
    setCancelOpen(false);
    setSessionKey((prev) => prev + 1);
  };

  const handleDismissCancel = () => {
    setCancelOpen(false);
  };

  const goNext = (step: StepKey, nextPage: Page) => () => {
    completeStep(step);
    setPage(nextPage);
  };

  return (
    <div className="container-xxl py-4">
      <div className="app-layout row g-4">
        <aside className="app-sidenav col-12 col-lg-3 col-xl-2">
          <LabelBusterSideNav page={page} onNavigate={setPage} />
        </aside>
        <main className="app-content col-12 col-lg-9 col-xl-10" key={sessionKey}>
          <div className="page-print-button">
            <PagePrintButton />
          </div>
          <ConfirmModal
            open={cancelOpen}
            title="Are you sure you want to leave?"
            message="Your progress will not be saved."
            onConfirm={handleConfirmCancel}
            onCancel={handleDismissCancel}
          />
          <div className={`page-section ${page === "home" ? "is-active" : ""}`}>
            <Home
              onStart={() => {
                startSession();
                setPage("terms");
              }}
            />
          </div>
          <div className={`page-section ${page === "terms" ? "is-active" : ""}`}>
            <TermsOfUse
              onBack={() => setPage("home")}
              onAccept={goNext("terms", "about")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "about" ? "is-active" : ""}`}>
            <AboutFoodLabels
              onBack={() => setPage("terms")}
              onNext={goNext("about", "limitations")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "limitations" ? "is-active" : ""}`}>
            <Limitations
              onBack={() => setPage("about")}
              onNext={goNext("limitations", "foodName")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "foodName" ? "is-active" : ""}`}>
            <FoodName
              onBack={() => setPage("limitations")}
              onNext={goNext("foodName", "businessDetails")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "businessDetails" ? "is-active" : ""}`}>
            <BusinessDetails
              onBack={() => setPage("foodName")}
              onNext={goNext("businessDetails", "dateMarks")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "dateMarks" ? "is-active" : ""}`}>
            <DateMarks
              onBack={() => setPage("businessDetails")}
              onNext={goNext("dateMarks", "storageUse")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "storageUse" ? "is-active" : ""}`}>
            <StorageAndUse
              onBack={() => setPage("dateMarks")}
              onNext={goNext("storageUse", "ingredients")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "ingredients" ? "is-active" : ""}`}>
            <Ingredients
              onBack={() => setPage("storageUse")}
              onNext={goNext("ingredients", "statements")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "statements" ? "is-active" : ""}`}>
            <Statements
              onBack={() => setPage("ingredients")}
              onNext={goNext("statements", "yourLabel")}
              onCancel={handleCancel}
            />
          </div>
          <div className={`page-section ${page === "yourLabel" ? "is-active" : ""}`}>
            <YourLabel
              onBack={() => setPage("statements")}
              onCancel={handleCancel}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <FormDataProvider>
    <AppContent />
  </FormDataProvider>
);

export default App;
