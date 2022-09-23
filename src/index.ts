#!/usr/bin/env node
import { createTemplateFolder } from "create-template-folder";
import { RootLauncherConfig } from "./config";
import { FolderOps } from "./core/cmd";
import { install } from "./core/install/install";
import { logger } from "./core/logger";
import { helpText } from "./utils/cli";
import { init } from "./utils/init";

async function main() {
  // init()o;

  init();
  if (RootLauncherConfig.displayHelp) {
    if (RootLauncherConfig.devMode) {
      return logger.greenAndRest({ inGreen: "HELP", rest: "asked by user" });
    } else {
      return logger.log(helpText);
    }
  }

  await RootLauncherConfig.init();
  // RootLauncherConfig.debug();
  if (RootLauncherConfig.isOutOfSync) {
    return logger.error(
      `Packages are out of sync. Please run command again with @latest in front of the package`
    ); // TODO: ADD SOME LOGGING MESSAGE HERE
  }

  if (RootLauncherConfig.devMode) {
    RootLauncherConfig.debug();
  }

  const newInDirPath = FolderOps.inDirectory();
  const outDirPath = FolderOps.outDirectory(RootLauncherConfig.name);
  // return;
  const vars = { name: RootLauncherConfig.name };

  const templatedFiles = await createTemplateFolder(
    {
      inDir: newInDirPath,
      outDir: outDirPath,
      vars,
    },
    {
      dryRun: RootLauncherConfig.dryRun,
    }
  );
  await install(outDirPath, templatedFiles);
}

main();
