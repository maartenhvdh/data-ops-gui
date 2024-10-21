import React from "react";

import { MenuAction } from "../../utils/navigation";

type TooltipProps = {
  hoveredAction: MenuAction | null;
};

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return (
    <div className="menu-column tooltip">
      {props.hoveredAction
        ? props.hoveredAction.tooltip
        : ""}
    </div>
  );
};
