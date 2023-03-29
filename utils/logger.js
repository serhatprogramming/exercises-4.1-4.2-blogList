const info = (...params) => {
  if (params[1]) {
    if (params[1].password) {
      console.log(params[0], { ...params[1], password: "hidden" });
    } else {
      console.log(...params);
    }
  }
};

const error = (...params) => {
  console.error(...params);
};

module.exports = { info, error };
