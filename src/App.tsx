import { useState } from "react";
import "./App.css";
import "@qld-gov-au/qgds-bootstrap5/qld.bootstrap.css";
import { TermsOfUse } from "./pages/TermsOfUse";
import { Home } from "./pages/Home";
// import '@qld-gov-au/qgds-bootstrap5/dist/js/qgds.bundle.js';

type Page = "home" | "terms";

function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <>
      {page === "home" && <Home onStart={() => setPage("terms")} />}
      {page === "terms" && (
        <TermsOfUse
          onBack={() => setPage("home")}
          onAccept={() => {
            // TODO: wire up next step after terms acceptance.
          }}
        />
      )}
    </>
  );
}

export default App;
