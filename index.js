exports.init = (struct) => init(struct);

/**
 * struct : {
 *   load: () => load data
 * }
 *
 * returns {
 *   get: async (key, func) => value
 * }
 */
const init = ({load}) => {
  let cache = {};

  /**
   * key : cache key
   * func : (key, data) => get value from (key, data)
   */
  const get = async (key, func) => {
    if (!cache[key]) {
      cache[key] = {
        value: func(await cached_load()),
      };
    }
    return cache[key].value;
  };

  let data = null;
  const cached_load = async () => {
    if (!data) {
      data = {
        value: await load(),
      };
    }
    return data.value;
  };

  return {
    get,
  };
};
