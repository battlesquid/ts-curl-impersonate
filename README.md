# ts-curl-impersonate

Fork of [curl-impersonate-node](https://github.com/wearrrrr/curl-impersonate-node) that adds windows support along with some other features.

## Install

```bash
# or with your package manager of choice
npm i ts-curl-impersonate
```

You'll also need the the correct binary package for your platform. If your platform is supported, it should automatically be installed via [optionalDependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#optionaldependencies). See this field in the [`package.json`](packages/ts-curl-impersonate/package.json) for a list of supported platforms; all packages are in the format `ts-curl-impersonate-bin-${process.platform}-${process.arch}`.

Finally before using, ensure you have `nss` (firefox's TLS library) and CA certificates, [as outlined in the original curl-impersonate project](https://github.com/lwthiker/curl-impersonate#pre-compiled-binaries). Here is a minimal [example Dockerfile](Dockerfile) that installs these dependencies. 

## Usage

```ts
import { RequestBuilder } from "ts-curl-impersonate";

// normal request with default presets
const response = await new RequestBuilder()
    .url(/** YOUR URL HERE **/)
    .header("x-foo-bar", "baz")
    .send();

// make a post request
const response = await new RequestBuilder()
    .url(/** YOUR URL HERE **/)
    .method("POST")
    .body({ foo: "bar" })
    .send();

// explicitly use a browser preset (options vary by platform)
const response = await new RequestBuilder()
    .url(/** YOUR URL HERE **/)
    .preset({ name: "chrome", version: "110" })
    .send();

// specify flags to be added in the final command
// preset flags will always take precedence
const response = await new RequestBuilder()
    .url(/** YOUR URL HERE **/)
    .flag("--user", "user:password") // add a flag with a value
    .flag("-I")                      // add a flag without a value
    .flags({
        "-d": "foo=\"bar\""          // add flags via object (values can be undefined too)
    })
    .send();
```
