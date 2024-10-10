import { NavigateFunction } from "react-router-dom";

export type MenuOption = {
  title: MenuOptionTitle;
  tooltip: string;
  subMenuOptions?: MenuOption[];
  route?: string;
};

export type MenuOptionTitle =
  | "Sync model"
  | "Synchronize"
  | "Create SyncModel"
  | "Sync content"
  | "Export"
  | "Import"
  | "Clean";

export const handleSelectAction = (
  option: MenuOption,
  setAction: (action: MenuOptionTitle) => void,
  navigate: NavigateFunction
) => {
  if (option.subMenuOptions) {
    setAction(option.title);
  } else if (typeof option.route === "string") {
    navigate(option.route);
  } else {
    alert("This feature is not implemented yet.");
  }
};

export const menuOptions: ReadonlyMap<MenuOptionTitle, MenuOption> = new Map([
  [
    "Sync model",
    {
      title: "Sync model",
      tooltip:
        "Synchronize models between environments or export a SyncModel for later use.",
      subMenuOptions: [
        {
          title: "Synchronize",
          route: "sync/source",
          tooltip:
            "Synchronize content models between two environments or between a previously generated SyncModel and a target environment.",
        },
        {
          title: "Create SyncModel",
          tooltip:
            "Creates a SyncModel of the environment of your choice and exports it as a .zip file for later synchronization.",
        },
      ],
    },
  ],
  [
    "Sync content",
    {
      title: "Sync content",
      tooltip:
        "⚠️ Feature not yet available.\n\nSynchronize content between two environments.",
    },
  ],
  [
    "Export",
    {
      title: "Export",
      tooltip:
        "⚠️ Feature not yet available.\n\nExport environment data to a .zip file.",
    },
  ],
  [
    "Import",
    {
      title: "Import",
      tooltip:
        "⚠️ Feature not yet available.\n\nImport environment data from a previously exported .zip file.",
    },
  ],
  [
    "Clean",
    {
      title: "Clean",
      tooltip:
        "⚠️ Feature not yet available.\n\nRemove all entities from an environment to an extent of MAPI.",
    },
  ],
]);
