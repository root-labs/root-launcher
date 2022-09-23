import { baseExpress, baseCookieAuth } from "./base.deps";

export const JSON_EXPRESS_DEPS = [...baseExpress, `cookie-parser`, "cors"];

export const EXPRESS_RootLauncher_AUTH_DEPS = [
  ...JSON_EXPRESS_DEPS,
  ...baseCookieAuth,
];
