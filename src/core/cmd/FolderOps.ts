import { sep, join } from "path";
import { RootLauncherConfig } from "../../config";

export class FolderOps {
  static getCurrentFolderName() {
    const [currentFolder] = process.cwd().split(sep).slice(-1);

    return currentFolder;
  }

  static get templatesDir() {
    return join(__dirname, "..", "..", "..", "template");
  }

  static inDirectory() {
    return join(
      this.templatesDir,
      RootLauncherConfig.template,
      RootLauncherConfig.variant
    );
  }

  static outDirectory(name: string) {
    return join(process.cwd(), name);
  }
}
