export function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function debounce(func, time) {
  function run(thisObj) {
    timer = null;
    func.call(thisObj);
  }
  let timer;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(run, time, this);
  };
}
