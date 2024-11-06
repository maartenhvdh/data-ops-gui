export type MenuAction = {
  title: MenuActionTitle;
  tooltip: string;
  subMenuActions?: MenuAction[];
  route?: string;
};

export type MenuActionTitle =
  | "Sync model"
  | "Run sync"
  | "Create sync snapshot"
  | "Migrate content"
  | "Environment Backup"
  | "Environment Restore"
  | "Clean";

export const mainMenu: ReadonlyArray<MenuAction> = [
  {
    title: "Sync model",
    tooltip: "Synchronize models between environments or create a sync snapshot for later use.",
    subMenuActions: [
      {
        title: "Run sync",
        route: "sync/source",
        tooltip:
          "Synchronize content models between two environments or between a previously generated snapshot and a target environment.",
      },
      {
        title: "Create sync snapshot",
        tooltip:
          "Creates a snapshot of an environment's content model and saves it as a .zip file for later synchronization.",
      },
    ],
  },
  {
    title: "Migrate content",
    tooltip: "Migrate content between two environments.",
  },
  {
    title: "Environment Backup",
    tooltip: "Backup all environment data to a .zip file.",
  },
  {
    title: "Environment Restore",
    tooltip: "Restore environment from an existing backup.",
  },
  {
    title: "Clean",
    tooltip: "Remove or deactivate all entities in an environment.",
  },
];
