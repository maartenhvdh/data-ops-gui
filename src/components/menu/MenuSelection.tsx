import React, { useContext } from "react";
import { WizardContext } from "../../WizardContext";
import { handleSelectAction, menuOptions } from "../../utils/navigation";
import { useNavigate } from "react-router";

export const MenuSelection: React.FC = () => {
  const { setAction } = useContext(WizardContext);
  const navigate = useNavigate();

  return (
    <div className="menu-column">
      {[...menuOptions.values()].map((action) => (
        <button className="button" key={action.title} onClick={() => handleSelectAction(action, setAction, navigate)}>
          {action.title}
        </button>
      ))}
    </div>
  );
};
