import 'es6-promise';

function polyfill(obj, key, value) {
  if (!obj[key]) Object.defineProperty(obj, key, {
    value,
    configurable: true,
    writable: true,
  });
}

polyfill(Object, 'assign', (obj, ...args) => {
  args.forEach(arg => {
    arg && Object.keys(arg).forEach(key => {
      obj[key] = arg[key];
    });
  });
  return obj;
});

polyfill(Math, 'sign', value => {
  return value < 0 ? -1 : value > 0 ? 1 : 0;
});
