import moment from "moment";

function getLocalToday(formatOutput = "DD-MM-YYYY HH:mm:ss") {
  return moment().format(formatOutput);
}

function getLocalYear(formatOutput = "YYYY") {
  return moment().format(formatOutput);
}

function getYesterday(formatOutput = "DD-MM-YYYY HH:mm:ss") {
  return moment()
    .subtract(1, "days")
    .format(formatOutput);
}

function getAWeekAgo(formatOutput = "DD-MM-YYYY HH:mm:ss") {
  return moment()
    .subtract(7, "days")
    .format(formatOutput);
}

function getLastMonth(formatOutput = "DD-MM-YYYY HH:mm:ss") {
  const lastMonth = {
    start: moment()
      .subtract(1, "months")
      .startOf("month")
      .format(formatOutput),
    last: moment()
      .subtract(1, "months")
      .endOf("month")
      .format(formatOutput)
  };
  return lastMonth;
}

function convertUTCToLocal(
  input,
  formatInput = "YYYY-MM-DD HH:mm:ss",
  formatOutput = "DD-MM-YYYY HH:mm:ss"
) {
  return moment
    .utc(input, formatInput)
    .local()
    .format(formatOutput);
}

function covertLocalToUTC(
  input,
  formatInput = "DD-MM-YYYY HH:mm:ss",
  formatOutput = "YYYY-MM-DD HH:mm:ss"
) {
  if (isValid(input, formatInput)) {
    return moment(input, formatInput)
      .utc()
      .format(formatOutput);
  } else {
    return "";
  }
}

function convertDateToDateFormat(input, formatOutput = "DD-MM-YYYY") {
  return moment(input, formatOutput);
}

function isValid(input, formatInput = "DD-MM-YYYY HH:mm:ss") {
  const date = moment(input, formatInput);
  return date.isValid();
}

function stringToDate(input, formatInput = "DD-MM-YYYY HH:mm:ss") {
  return moment(input, formatInput).toDate();
}

function convertStringToFormat(input, formatInput, formatOutput) {
  if (isValid(input, formatInput)) {
    return moment(input, formatInput).format(formatOutput);
  } else {
    return "";
  }
}

function getDateUTCToLocal(input, formatInput, formatOutput) {
  if (isValid(input, formatInput)) {
    return convertUTCToLocal(input, formatInput, formatOutput);
  } else {
    return "";
  }
}

function getGMT() {
  const timezone = moment().format("Z");
  const data = timezone.split(":");

  const minute = parseFloat(data[1]) / 60;
  const hour = parseFloat(data[0]);

  let result = 0;
  if (hour >= 0) result = hour + minute;
  else result = hour - minute;

  return result;
}

function isGreaterThan(
  time1 = getLocalToday("YYYY-MM-DD HH:mm:ss"),
  time2 = getLocalToday("YYYY-MM-DD HH:mm:ss")
) {
  return moment(time1).valueOf() >= moment(time2).valueOf();
}

function convertToMillis(input, formatInput) {
  return moment(input, formatInput).valueOf();
}

function convertMillisToFormat(
  input,
  formatInput = "DD/MM/YYYY",
  formatOutput = "YYYY/MM/DD"
) {
  if (isValid(input, formatInput)) {
    return moment(convertToMillis(input, formatInput)).format(formatOutput);
  } else {
    return "";
  }
}

export default {
  getLocalToday,
  getLocalYear,
  getYesterday,
  getAWeekAgo,
  getLastMonth,
  convertUTCToLocal,
  convertDateToDateFormat,
  covertLocalToUTC,
  isValid,
  stringToDate,
  getDateUTCToLocal,
  convertStringToFormat,
  isGreaterThan,

  getGMT,
  convertToMillis,
  convertMillisToFormat
};
