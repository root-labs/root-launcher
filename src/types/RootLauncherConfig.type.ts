export interface ICLIConfig {
  [arg: string]: string | boolean;
}

export interface BaseConfig {
  // variants
  auth: boolean;
  base: boolean;

  //   templates
  json: boolean;
  views: boolean;
  fs: boolean;

  //   doesn't run anything
  dryRun: boolean;
  //   debugging
  verbose: boolean;
  devMode: boolean;
  variant: RootLauncherVariant;
  template?: RootLauncherTemplate;
  displayHelp: boolean;
  name: string;
  isPnpm: boolean;
  packageManager: `npm` | "pnpm";
  skipInstall: boolean;
}

export type RootLauncherTemplate = "views" | "json" | "fullstack";
export type RootLauncherVariant = "base" | "authentication";

export interface RootLauncherConfig extends BaseConfig {
  init(): Promise<void>;
}

export interface RootLauncherType {
  tech: "views" | "json" | "fs";
  variant: "authentication" | "base";
}
