/// <reference path="../types/index.d.ts" />
import unhandled from "cli-handle-unhandled";
import welcome from "cli-welcome";
import { RootLauncherConfig } from "../config";
import { Package } from "../core/pkg/Package";

export function init() {
  unhandled();
  if (!RootLauncherConfig.devMode) {
    welcome({
      title: "RootGenerator",
      tagLine: "by RootLearn",
      description: Package.description,
      bgColor: "#2DC5FA",
      color: "#000000",
      version: Package.version,
      clear: true,
      bold: true,
    });
  }
}
