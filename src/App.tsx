import { useState } from "react";
import "./App.css";
import "@qld-gov-au/qgds-bootstrap5/qld.bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@qld-gov-au/qgds-bootstrap5/qld.bootstrap.min.js";
import { TermsOfUse } from "./pages/TermsOfUse";
import { Home } from "./pages/Home";
import { AboutFoodLabels } from "./pages/AboutFoodLabels";
import { Limitations } from "./pages/limitations/Limitations";
import { FoodName } from "./pages/FoodName";
import { BusinessDetails } from "./pages/BusinessDetails";

type Page = "home" | "terms" | "about" | "limitations" | "foodName" | "businessDetails";

const App = () => {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
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
      <div style={{ display: page === "businessDetails" ? "block" : "none" }}>
        <BusinessDetails
          onBack={() => setPage("foodName")}
          onNext={() => setPage("home")}
        />
      </div>
    </>
  );
};

export default App;
