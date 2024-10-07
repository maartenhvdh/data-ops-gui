// src/components/Home.tsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { WizardContext } from "../WizardContext";

const Home: React.FC = () => {
  const { setAction } = useContext(WizardContext);
  const navigate = useNavigate();

  const handleSelectAction = (selectedAction: string) => {
    setAction(selectedAction);
    if (selectedAction === "sync") {
      navigate("/sync/source");
    } else {
      alert("This action is not implemented yet.");
    }
  };

  return (
    <div>
      <h2>Select an Action</h2>
      <ul>
        <li>
          <button onClick={() => handleSelectAction("sync")}>Sync</button>
        </li>
        <li>
          <button disabled>Diff Model</button>
        </li>
        <li>
          <button disabled>Import/Export</button>
        </li>
        <li>
          <button disabled>Clean</button>
        </li>
      </ul>
    </div>
  );
};

export default Home;
