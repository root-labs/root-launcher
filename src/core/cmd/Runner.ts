import { spawn } from "child_process";
import type { CommonSpawnOptions } from "child_process";
import { RootLauncherConfig } from "../../types";
import { RootLauncherConfig } from "../../config";

export class Runner {
  constructor(private config: RootLauncherConfig = RootLauncherConfig) {}

  private get stdio(): CommonSpawnOptions["stdio"] {
    return this.config.verbose ? "inherit" : "ignore";
  }
  execute(command: string) {
    return new Promise((res, rej) => {
      const childProcess = spawn(command, { stdio: this.stdio, shell: true });

      childProcess.on("close", res);
      childProcess.on("error", rej);
    });
  }
}
