import React, { useState } from "react";
import { useNavigate } from "react-router";

import { MenuAction } from "../../utils/navigation";
import { Tooltip } from "./Tooltip";

type MenuProps = {
  actions: MenuAction[];
  style?: string;
};

export const Menu: React.FC<MenuProps> = (props) => {
  const [hoveredAction, setHoveredAction] = useState<MenuAction | null>(null);
  const [subMenu, setSubMenu] = useState<MenuAction | null>(null);
  const navigate = useNavigate();

  const handleActionSelect = (action: MenuAction) =>
    action.subMenuActions
      ? setSubMenu(action)
      : action.route
      ? navigate(action.route)
      : alert("This feature is not implemented yet.");

  return (
    <>
      <div className="menu-column">
        {[...props.actions.values()].map((action) => (
          <button
            className={`button ${props.style ?? ""}`}
            key={action.title}
            onClick={() => handleActionSelect(action)}
            onMouseEnter={() => setHoveredAction(action)}
            onMouseLeave={() => setHoveredAction(null)}
            type="button"
          >
            {action.title}
          </button>
        ))}
      </div>
      {subMenu?.subMenuActions && <Menu actions={subMenu.subMenuActions} style="secondary" />}
      {hoveredAction && <Tooltip hoveredAction={hoveredAction} />}
    </>
  );
};
