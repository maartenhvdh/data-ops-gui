import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { WizardContext } from "../../WizardContext";
import { handleSelectAction, menuOptions } from "../../utils/navigation";

export const SubMenuSelection: React.FC = () => {
  const { setAction, action } = useContext(WizardContext);
  const navigate = useNavigate();

  return action ? (
    <div className="menu-column">
      {menuOptions.get(action)?.subMenuOptions?.map((option) => (
        <button
          key={option.title}
          className="button secondary"
          onClick={() => handleSelectAction(option, setAction, navigate)}
        >
          {option.title}
        </button>
      ))}
    </div>
  ) : (
    <div className="not-displayed"></div>
  );
};
