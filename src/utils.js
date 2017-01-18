function leftpad(s, l, p='0') {
  s = s.toString();
  while (s.length < l) s = p + s;
  return s;
}

export function formatDate(date) {
  return `${date.getFullYear()}-${leftpad(date.getMonth() + 1, 2)}-${leftpad(date.getDate(), 2)}`;
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
