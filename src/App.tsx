import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [postage, setPostage] = useState<string | null>(null);

  const weightToPostage = (weightInKg: number) => {
    const numOf500Gms = Math.ceil(weightInKg / 0.5);
    console.log();
    const remaining500Gms = Math.max(numOf500Gms - 1, 0);
    const cost = 1.18 * (19 + 16 * remaining500Gms + 17);
    return Math.round(cost * 100) / 100;
  };

  const handleSubmit = (/*e: React.FormEvent<HTMLFormElement>*/) => {
    /* e.preventDefault(); */
    const max_weight = 35;
    const bo_max_weight = 10;
    const weightFloat = parseFloat(weight);
    if (isNaN(weightFloat) || weightFloat < 0) {
      setPostage("Invalid weight");
    } else if (weightFloat > max_weight) {
      setPostage("Weight too high. Keep it below " + max_weight + "kg");
    } else {
      const calculatedPostage = weightToPostage(weightFloat);
      if (weightFloat > bo_max_weight) {
        setPostage(
          "The required postage is Rs." +
            calculatedPostage +
            ". (Cannot be sent from BO. Go to GPO)."
        );
      } else {
        setPostage(
          "The required postage is Rs." +
            calculatedPostage +
            "(Can be done from BO)"
        );
      }
    }
  };

  return (
    <div className="form-group">
      <h1>India Post Registered Parcel Charge Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="weight">Enter weight of package in kgs:</label>
        <input
          type="number"
          step="0.01"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Calculate Postage
        </button>
      </form>
      {postage && <h3>{postage}</h3>}
    </div>
  );
}

export default App;
