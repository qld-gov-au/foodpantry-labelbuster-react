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
  const { completeStep, resetProgress, startSession } = useFormData();

  const handleCancel = () => {
    setCancelOpen(true);
  };

  const handleConfirmCancel = () => {
    resetProgress();
    setPage("home");
    setCancelOpen(false);
  };

  const handleDismissCancel = () => {
    setCancelOpen(false);
  };

  const goNext = (step: StepKey, nextPage: Page) => () => {
    completeStep(step);
    setPage(nextPage);
  };

  return (
    <div className="app-layout">
      <aside className="app-sidenav">
        <LabelBusterSideNav page={page} onNavigate={setPage} />
      </aside>
      <main className="app-content">
        <ConfirmModal
          open={cancelOpen}
          title="Are you sure you want to leave?"
          message="Your progress will not be saved."
          onConfirm={handleConfirmCancel}
          onCancel={handleDismissCancel}
        />
        <div style={{ display: page === "home" ? "block" : "none" }}>
          <Home
            onStart={() => {
              startSession();
              setPage("terms");
            }}
          />
        </div>
        <div style={{ display: page === "terms" ? "block" : "none" }}>
          <TermsOfUse
            onBack={() => setPage("home")}
            onAccept={goNext("terms", "about")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "about" ? "block" : "none" }}>
          <AboutFoodLabels
            onBack={() => setPage("terms")}
            onNext={goNext("about", "limitations")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "limitations" ? "block" : "none" }}>
          <Limitations
            onBack={() => setPage("about")}
            onNext={goNext("limitations", "foodName")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "foodName" ? "block" : "none" }}>
          <FoodName
            onBack={() => setPage("limitations")}
            onNext={goNext("foodName", "businessDetails")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "businessDetails" ? "block" : "none" }}>
          <BusinessDetails
            onBack={() => setPage("foodName")}
            onNext={goNext("businessDetails", "dateMarks")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "dateMarks" ? "block" : "none" }}>
          <DateMarks
            onBack={() => setPage("businessDetails")}
            onNext={goNext("dateMarks", "storageUse")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "storageUse" ? "block" : "none" }}>
          <StorageAndUse
            onBack={() => setPage("dateMarks")}
            onNext={goNext("storageUse", "ingredients")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "ingredients" ? "block" : "none" }}>
          <Ingredients
            onBack={() => setPage("storageUse")}
            onNext={goNext("ingredients", "statements")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "statements" ? "block" : "none" }}>
          <Statements
            onBack={() => setPage("ingredients")}
            onNext={goNext("statements", "yourLabel")}
            onCancel={handleCancel}
          />
        </div>
        <div style={{ display: page === "yourLabel" ? "block" : "none" }}>
          <YourLabel onBack={() => setPage("statements")} onCancel={handleCancel} />
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <FormDataProvider>
    <AppContent />
  </FormDataProvider>
);

export default App;
