import path from "node:path";

export type BrowserType = "chrome" | "firefox" | "safari";

export interface Browser {
    name: BrowserType;
    arch: NodeJS.Architecture;
    binary: string;
}

export const BINARY_PATH = require
    .resolve(
        `ts-curl-impersonate-bin-${process.platform}-${process.arch}/package.json`,
        { paths: [path.resolve(process.cwd(), './node_modules')] }
    )
    .replace("package.json", "")
    .concat("bin");

console.log(BINARY_PATH)

export const BROWSERS: Record<string, Browser[] | undefined> = {
    win32: [
        {
            name: "chrome",
            arch: "x64",
            binary: "chrome.exe"
        },
        {
            name: "safari",
            arch: "x64",
            binary: "chrome.exe"
        }
    ],
    darwin: [
        {
            name: "firefox",
            arch: "x64",
            binary: "firefox"
        },
        {
            name: "chrome",
            arch: "x64",
            binary: "chrome"
        }
    ],
    linux: [
        {
            name: "firefox",
            arch: "x64",
            binary: "firefox"
        },
        {
            name: "chrome",
            arch: "x64",
            binary: "chrome"
        },
        {
            name: "firefox",
            arch: "arm64",
            binary: "firefox"
        },
        {
            name: "chrome",
            arch: "arm64",
            binary: "chrome"
        }
    ]
};

export const getCompatibleBrowsers = () => {
    const browsers = BROWSERS[process.platform];
    if (browsers === undefined) {
        throw new Error(`No browsers defined for the platform ${process.platform}`);
    }
    const matchingArchs = browsers.filter((b) => b.arch === process.arch);
    if (matchingArchs.length === 0) {
        const availableArchs = browsers.map((b) => b.arch).join(", ");
        throw new Error(`Unable to find browser binary that matches system architecture (system: ${process.arch}, available: ${availableArchs})`);
    }
    return matchingArchs;
};

export const getDefaultPlatformBrowser = () => {
    const browsers = getCompatibleBrowsers();
    return browsers[0];
};

export const resolveBrowser = (browser: BrowserType) => {
    const browsers = getCompatibleBrowsers();
    const foundBrowser = browsers.find((b) => b.name === browser);
    if (foundBrowser === undefined) {
        const availableNames = browsers.map((b) => b.name).join(", ");
        throw new Error(`Unable to find browser with name '${browser}' (available: ${availableNames})`);
    }
    return foundBrowser;
};
