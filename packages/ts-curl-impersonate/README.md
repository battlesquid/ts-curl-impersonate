# ts-curl-impersonate

Fork of [curl-impersonate-node](https://github.com/wearrrrr/curl-impersonate-node) that adds windows support along with some other features.

## Install

```sh
# yarn
yarn add ts-curl-impersonate

# npm
npm i ts-curl-impersonate
```

## Usage

```ts
// normal request
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

// use a browser preset (options vary by platform)
const response = await new RequestBuilder()
    .url(/** YOUR URL HERE **/)
    .preset({ name: "chrome", version: "110" })
    .send();
```
