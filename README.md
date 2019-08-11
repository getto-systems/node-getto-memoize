# node-getto-memoize

memoize async function

status: production ready

```javascript
const memoize = require("getto-memoize");

const load_heavy_data = async () => {
  return {
    key1: "heavy-data",
    key2: JSON.stringify({ heavy: "data" }),
  };
};

const memo = memoize.init({
  load: load_heavy_data,
});

const get = (key) => memo.get(key, (data) => data[key]);
const json = (key) => memo.get(key, (data) => JSON.parse(data[key]));

const get_values = async () => {
  console.log(await get("key1")); // => heavy-data
  console.log(await json("key2")); // => { heavy: "data" }
};
```


###### Table of Contents

- [Requirements](#Requirements)
- [Usage](#Usage)
- [License](#License)

## Requirements

- Node.js: 10.16.0


## Usage

```javascript
const memoize = require("getto-memoize");

const load_heavy_data = async () => {
  console.log("heavy-data loaded");

  return {
    key1: "heavy-data-1",
    key2: "heavy-data-2",

    json1: JSON.stringify({ heavy: "data-1" }),
    json2: JSON.stringify({ heavy: "data-2" }),
  };
};

const memo = memoize.init({
  load: load_heavy_data,
});

const get = (key) => memo.get(key, (data) => {
  console.log("get value: " + key);
  return data[key];
});
const json = (key) => memo.get(key, (data) => {
  console.log("parse json: " + key);
  return JSON.parse(data[key]);
});

const get_values = async () => {
  console.log(await get("key1")); // => heavy-data-1
  // => heavy-data loaded
  // => get value: key1
  console.log(await get("key1")); // => heavy-data-1
  // (get value from cache)

  console.log(await get("key2")); // => heavy-data-2
  // => get value: key2

  console.log(await json("json1")); // => { heavy: "data-1" }
  // => parse json: json1
  console.log(await json("json1")); // => { heavy: "data-1" }
  // (get value from cache)

  console.log(await json("json2")); // => { heavy: "data-2" }
  // => parse json: json2
};
```

### Install

```bash
npm install --save getto-memoize
```


## License

node-getto-memoize is licensed under the [MIT](LICENSE) license.

Copyright &copy; since 2019 shun@getto.systems

