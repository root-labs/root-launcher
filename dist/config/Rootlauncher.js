"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _RootLauncher_instances, _RootLauncher_auth, _RootLauncher_base, _RootLauncher_views, _RootLauncher_json, _RootLauncher_fs, _RootLauncher_dryRun, _RootLauncher_devMode, _RootLauncher_verbose, _RootLauncher_displayHelp, _RootLauncher_name, _RootLauncher_isOutOfSync, _RootLauncher_isCurrentFolder, _RootLauncher_isPnpm, _RootLauncher_skipInstall, _RootLauncher_setDebug, _RootLauncher_setSkipInstall, _RootLauncher_setPackageManagers, _RootLauncher_setName, _RootLauncher_setDisplayHelp, _RootLauncher_setDryRun, _RootLauncher_setBase, _RootLauncher_setViews, _RootLauncher_setFs, _RootLauncher_setJson, _RootLauncher_setVerbose, _RootLauncher_setAuth, _RootLauncher_isBoolean;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const GetInputs_1 = __importDefault(require("../core/inputs/GetInputs"));
const Package_1 = require("../core/pkg/Package");
const validator_1 = require("../core/validator");
const cli_1 = require("../utils/cli");
class RootLauncher {
    // Constructor
    constructor(flags, inputs) {
        this.flags = flags;
        this.inputs = inputs;
        _RootLauncher_instances.add(this);
        // Initial Values
        _RootLauncher_auth.set(this, false);
        _RootLauncher_base.set(this, false);
        _RootLauncher_views.set(this, false);
        _RootLauncher_json.set(this, false);
        _RootLauncher_fs.set(this, false);
        _RootLauncher_dryRun.set(this, false);
        _RootLauncher_devMode.set(this, false);
        _RootLauncher_verbose.set(this, false);
        _RootLauncher_displayHelp.set(this, false);
        _RootLauncher_name.set(this, "");
        _RootLauncher_isOutOfSync.set(this, false);
        _RootLauncher_isCurrentFolder.set(this, false);
        _RootLauncher_isPnpm.set(this, false);
        _RootLauncher_skipInstall.set(this, false);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setAuth).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setBase).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setVerbose).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setJson).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setViews).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setFs).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setDryRun).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setDisplayHelp).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setName).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setPackageManagers).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setSkipInstall).call(this);
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_setDebug).call(this);
    }
    // GETTERS
    get name() {
        return __classPrivateFieldGet(this, _RootLauncher_name, "f");
    }
    get packageManager() {
        if (__classPrivateFieldGet(this, _RootLauncher_isPnpm, "f") && !this.dryRun) {
            return `pnpm`;
        }
        return "npm";
    }
    get variant() {
        if (__classPrivateFieldGet(this, _RootLauncher_auth, "f")) {
            return "authentication";
        }
        return "base";
    }
    get base() {
        return __classPrivateFieldGet(this, _RootLauncher_base, "f");
    }
    get skipInstall() {
        return __classPrivateFieldGet(this, _RootLauncher_skipInstall, "f");
    }
    get template() {
        if (this.fs) {
            return "fullstack";
        }
        if (this.json) {
            return "json";
        }
        return "views";
    }
    get views() {
        return __classPrivateFieldGet(this, _RootLauncher_views, "f");
    }
    get verbose() {
        return __classPrivateFieldGet(this, _RootLauncher_verbose, "f");
    }
    get isPnpm() {
        return __classPrivateFieldGet(this, _RootLauncher_isPnpm, "f");
    }
    get devMode() {
        return __classPrivateFieldGet(this, _RootLauncher_devMode, "f");
    }
    get fs() {
        return __classPrivateFieldGet(this, _RootLauncher_fs, "f");
    }
    get json() {
        return __classPrivateFieldGet(this, _RootLauncher_json, "f");
    }
    get dryRun() {
        return __classPrivateFieldGet(this, _RootLauncher_dryRun, "f");
    }
    get auth() {
        return __classPrivateFieldGet(this, _RootLauncher_auth, "f");
    }
    get displayHelp() {
        return __classPrivateFieldGet(this, _RootLauncher_displayHelp, "f");
    }
    get isOutOfSync() {
        return __classPrivateFieldGet(this, _RootLauncher_isOutOfSync, "f");
    }
    get isCurrentFolder() {
        return __classPrivateFieldGet(this, _RootLauncher_isCurrentFolder, "f");
    }
    // Methods
    debug() {
        console.log(`---- TEMPLATE ----`);
        console.log(`TEMPLATE: - ${this.template}`);
        console.log(`---- VARIANT ----`);
        console.log(`VARIANT: ${__classPrivateFieldGet(this, _RootLauncher_auth, "f") ? "auth" : __classPrivateFieldGet(this, _RootLauncher_base, "f") ? "base" : "not_defined"}`);
        console.log(`NAME: ${this.name}`);
        console.log(`---- DEBUG ----`);
        console.log(`DRYRUN: ${this.dryRun}`);
        console.log(`---- displayHelp ----`);
        console.log(`DISPLAY_HELP: ${this.displayHelp}`);
    }
    get variantDefined() {
        return __classPrivateFieldGet(this, _RootLauncher_base, "f") || __classPrivateFieldGet(this, _RootLauncher_auth, "f");
    }
    get templateDefined() {
        return __classPrivateFieldGet(this, _RootLauncher_json, "f") || __classPrivateFieldGet(this, _RootLauncher_fs, "f") || __classPrivateFieldGet(this, _RootLauncher_views, "f");
    }
    arrangeName() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield GetInputs_1.default.getName();
            __classPrivateFieldSet(this, _RootLauncher_name, name.replace(/\s+/g, "-"), "f");
        });
    }
    arrangeVariant() {
        return __awaiter(this, void 0, void 0, function* () {
            const { variant } = yield GetInputs_1.default.getVariant();
            if (variant) {
                __classPrivateFieldSet(this, _RootLauncher_auth, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _RootLauncher_base, true, "f");
            }
        });
    }
    arrangeTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = yield GetInputs_1.default.getProject();
            if (project === "fullstack") {
                __classPrivateFieldSet(this, _RootLauncher_fs, true, "f");
            }
            // @ts-ignore
            if (project === "json") {
                __classPrivateFieldSet(this, _RootLauncher_json, true, "f");
            }
            // @ts-ignore
            if (project === "views") {
                __classPrivateFieldSet(this, _RootLauncher_views, true, "f");
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.devMode) {
                const isBad = yield Package_1.Package.isOutOfSync();
                __classPrivateFieldSet(this, _RootLauncher_isOutOfSync, isBad, "f");
                if (isBad) {
                    return;
                }
            }
            if (!this.name) {
                yield this.arrangeName();
            }
            if (!this.templateDefined) {
                yield this.arrangeTemplate();
            }
            if (!this.variantDefined) {
                yield this.arrangeVariant();
            }
        });
    }
}
_RootLauncher_auth = new WeakMap(), _RootLauncher_base = new WeakMap(), _RootLauncher_views = new WeakMap(), _RootLauncher_json = new WeakMap(), _RootLauncher_fs = new WeakMap(), _RootLauncher_dryRun = new WeakMap(), _RootLauncher_devMode = new WeakMap(), _RootLauncher_verbose = new WeakMap(), _RootLauncher_displayHelp = new WeakMap(), _RootLauncher_name = new WeakMap(), _RootLauncher_isOutOfSync = new WeakMap(), _RootLauncher_isCurrentFolder = new WeakMap(), _RootLauncher_isPnpm = new WeakMap(), _RootLauncher_skipInstall = new WeakMap(), _RootLauncher_instances = new WeakSet(), _RootLauncher_setDebug = function _RootLauncher_setDebug() {
    const { debug = false } = this.flags;
    const isDev = process.env.DEV === "true";
    __classPrivateFieldSet(this, _RootLauncher_devMode, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, isDev) || __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, debug), "f");
}, _RootLauncher_setSkipInstall = function _RootLauncher_setSkipInstall() {
    const { ["skip-install"]: skipInstall } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_skipInstall, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, skipInstall), "f");
}, _RootLauncher_setPackageManagers = function _RootLauncher_setPackageManagers() {
    const { p = false, pnpm = false } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_isPnpm, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, p) || __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, pnpm), "f");
}, _RootLauncher_setName = function _RootLauncher_setName() {
    // const {inputs, flags} = this
    let [name = ""] = this.inputs;
    const isEmpty = !validator_1.FsValidator.dirNotEmpty();
    if (name.trim() === "." && !isEmpty) {
        return;
    }
    if (name.trim() === ".") {
        __classPrivateFieldSet(this, _RootLauncher_name, process.cwd().split(path_1.sep).slice(-1)[0], "f");
        __classPrivateFieldSet(this, _RootLauncher_isCurrentFolder, true, "f");
        return;
    }
    const exists = validator_1.FsValidator.folderExists(name);
    if (exists) {
        return;
    }
    __classPrivateFieldSet(this, _RootLauncher_name, name, "f");
}, _RootLauncher_setDisplayHelp = function _RootLauncher_setDisplayHelp(startingValue = false) {
    const { help, h } = this.flags;
    const isHelpInFlags = Object.values(this.flags).includes("help");
    __classPrivateFieldSet(this, _RootLauncher_displayHelp, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, help) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, h) ||
        this.inputs.includes("help") ||
        isHelpInFlags, "f");
}, _RootLauncher_setDryRun = function _RootLauncher_setDryRun(startingValue = false) {
    const { ["dry-run"]: dryRun = false, dryRun: dryRunCommand } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_dryRun, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, dryRun) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, dryRunCommand), "f");
}, _RootLauncher_setBase = function _RootLauncher_setBase(startingValue = false) {
    const { base, b } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_base, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, base) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, b), "f");
}, _RootLauncher_setViews = function _RootLauncher_setViews(startingValue = false) {
    const { views } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_views, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, views), "f");
}, _RootLauncher_setFs = function _RootLauncher_setFs(startingValue = false) {
    const { fs, fullStack, fullstack } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_fs, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, fs) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, fullStack) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, fullstack), "f");
}, _RootLauncher_setJson = function _RootLauncher_setJson(startingValue = false) {
    const { json } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_json, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, json), "f");
}, _RootLauncher_setVerbose = function _RootLauncher_setVerbose(startingValue = false) {
    const { v, verbose } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_verbose, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, v) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, verbose), "f");
}, _RootLauncher_setAuth = function _RootLauncher_setAuth(startingValue = false) {
    const { a = false, auth = false } = this.flags;
    __classPrivateFieldSet(this, _RootLauncher_auth, __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, a) ||
        __classPrivateFieldGet(this, _RootLauncher_instances, "m", _RootLauncher_isBoolean).call(this, auth), "f");
}, _RootLauncher_isBoolean = function _RootLauncher_isBoolean(option = false) {
    return ((typeof option === "boolean" ||
        JSON.parse(JSON.stringify(option)) === "boolean") &&
        option == true);
};
const RootLauncherConfig = new RootLauncher(cli_1.flags, cli_1.inputs);
exports.default = RootLauncherConfig;
