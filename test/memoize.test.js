const memoize = require("../index");

test("memoize async function", async () => {
  let load_count = 0;
  const load = async () => {
    load_count ++;

    return {
      key1: "heavy-data-1",
      key2: "heavy-data-2",

      json1: JSON.stringify({ heavy: "data-1" }),
      json2: JSON.stringify({ heavy: "data-2" }),
    };
  };

  const memo = memoize.init({
    load: load,
  });

  let get_count = {};
  const get = (key) => memo.get(key, (data) => {
    if (!get_count[key]) {
      get_count[key] = 0;
    }
    get_count[key] ++;

    return data[key];
  });

  let json_count = {};
  const json = (key) => memo.get(key, (data) => {
    if (!json_count[key]) {
      json_count[key] = 0;
    }
    json_count[key] ++;

    return JSON.parse(data[key]);
  });

  expect(await get("key1")).toBe("heavy-data-1");
  expect(load_count).toBe(1);
  expect(get_count.key1).toBe(1);

  expect(await get("key1")).toBe("heavy-data-1");
  expect(load_count).toBe(1);
  expect(get_count.key1).toBe(1);

  expect(await get("key2")).toBe("heavy-data-2");
  expect(get_count.key2).toBe(1);

  expect(JSON.stringify(await json("json1"))).toBe(JSON.stringify({heavy: "data-1"}));
  expect(json_count.json1).toBe(1);

  expect(JSON.stringify(await json("json1"))).toBe(JSON.stringify({heavy: "data-1"}));
  expect(json_count.json1).toBe(1);

  expect(JSON.stringify(await json("json2"))).toBe(JSON.stringify({heavy: "data-2"}));
  expect(json_count.json2).toBe(1);
});

test("memoize normal function", async () => {
  let load_count = 0;
  const load = () => {
    load_count ++;

    return {
      key1: "heavy-data-1",
      key2: "heavy-data-2",

      json1: JSON.stringify({ heavy: "data-1" }),
      json2: JSON.stringify({ heavy: "data-2" }),
    };
  };

  const memo = memoize.init({
    load: load,
  });

  let get_count = {};
  const get = (key) => memo.get(key, (data) => {
    if (!get_count[key]) {
      get_count[key] = 0;
    }
    get_count[key] ++;

    return data[key];
  });

  let json_count = {};
  const json = (key) => memo.get(key, (data) => {
    if (!json_count[key]) {
      json_count[key] = 0;
    }
    json_count[key] ++;

    return JSON.parse(data[key]);
  });

  expect(await get("key1")).toBe("heavy-data-1");
  expect(load_count).toBe(1);
  expect(get_count.key1).toBe(1);

  expect(await get("key1")).toBe("heavy-data-1");
  expect(load_count).toBe(1);
  expect(get_count.key1).toBe(1);

  expect(await get("key2")).toBe("heavy-data-2");
  expect(get_count.key2).toBe(1);

  expect(JSON.stringify(await json("json1"))).toBe(JSON.stringify({heavy: "data-1"}));
  expect(json_count.json1).toBe(1);

  expect(JSON.stringify(await json("json1"))).toBe(JSON.stringify({heavy: "data-1"}));
  expect(json_count.json1).toBe(1);

  expect(JSON.stringify(await json("json2"))).toBe(JSON.stringify({heavy: "data-2"}));
  expect(json_count.json2).toBe(1);
});
