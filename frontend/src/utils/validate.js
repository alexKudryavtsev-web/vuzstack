export function validURL(string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
    'i',
  );

  return !Boolean(pattern.test(string));
}

export function validPhone(string) {
  return !/^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/.test(string);
}

export function validText(string) {
  return !/^[а-яА-Я]+$/.test(string);
}

export function validSize(string) {
  return !Boolean(string.trim());
}

export function validSnils(string) {
  return !/^\d{3}-\d{3}-\d{3}-\d{2}$/.test(string);
}

export function validPassportSeries(string) {
  return !/^\d{4}$/.test(string);
}

export function validPassportID(string) {
  return !/^\d{6}$/.test(string);
}