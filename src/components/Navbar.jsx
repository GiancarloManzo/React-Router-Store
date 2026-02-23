import { Link } from "react-router-dom";
import { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

export default function Navbar() {
  const { budgetMode, setBudgetMode } = useContext(BudgetContext);

  return (
    <nav className="navbar navbar-light bg-light border-bottom">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">
          React Store
        </Link>

        <div className="d-flex gap-2">
          <Link className="btn btn-outline-primary" to="/prodotti">
            Prodotti
          </Link>

          <button
            className="btn btn-primary"
            onClick={() => setBudgetMode((prev) => !prev)}
          >
            {budgetMode
              ? "Disattiva Modalità Budget"
              : "Attiva Modalità Budget"}
          </button>
        </div>
      </div>
    </nav>
  );
}
