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

const App = () => {
  const [page, setPage] = useState<Page>("home");
  return (
    <>
      <div className="app-layout">
        <aside className="app-sidenav">
          <LabelBusterSideNav page={page} onNavigate={setPage} />
        </aside>
        <main className="app-content">
          <div style={{ display: page === "home" ? "block" : "none" }}>
            <Home onStart={() => setPage("terms")} />
          </div>
          <div style={{ display: page === "terms" ? "block" : "none" }}>
            <TermsOfUse
              onBack={() => setPage("home")}
              onAccept={() => setPage("about")}
            />
          </div>
          <div style={{ display: page === "about" ? "block" : "none" }}>
            <AboutFoodLabels
              onBack={() => setPage("terms")}
              onNext={() => setPage("limitations")}
            />
          </div>
          <div style={{ display: page === "limitations" ? "block" : "none" }}>
            <Limitations
              onBack={() => setPage("about")}
              onNext={() => setPage("foodName")}
            />
          </div>
          <div style={{ display: page === "foodName" ? "block" : "none" }}>
            <FoodName
              onBack={() => setPage("limitations")}
              onNext={() => setPage("businessDetails")}
            />
          </div>
          <div
            style={{ display: page === "businessDetails" ? "block" : "none" }}
          >
            <BusinessDetails
              onBack={() => setPage("foodName")}
              onNext={() => setPage("dateMarks")}
            />
          </div>
          <div style={{ display: page === "dateMarks" ? "block" : "none" }}>
            <DateMarks
              onBack={() => setPage("businessDetails")}
              onNext={() => setPage("storageUse")}
            />
          </div>
          <div style={{ display: page === "storageUse" ? "block" : "none" }}>
            <StorageAndUse
              onBack={() => setPage("dateMarks")}
              onNext={() => setPage("ingredients")}
            />
          </div>
          <div style={{ display: page === "ingredients" ? "block" : "none" }}>
            <Ingredients
              onBack={() => setPage("storageUse")}
              onNext={() => setPage("statements")}
            />
          </div>
          <div style={{ display: page === "statements" ? "block" : "none" }}>
            <Statements
              onBack={() => setPage("ingredients")}
              onNext={() => setPage("yourLabel")}
            />
          </div>
          <div style={{ display: page === "yourLabel" ? "block" : "none" }}>
            <YourLabel onBack={() => setPage("statements")} />
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
