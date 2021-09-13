const months = [
  { number: 1, name: "Jan" },
  { number: 2, name: "Feb" },
  { number: 3, name: "Mar" },
  { number: 4, name: "Apr" },
  { number: 5, name: "May" },
  { number: 6, name: "Jun" },
  { number: 7, name: "Jul" },
  { number: 8, name: "Aug" },
  { number: 9, name: "Sep" },
  { number: 10, name: "Oct" },
  { number: 11, name: "Nov" },
  { number: 12, name: "Dec" }
];

const monthNumToName = (num) => {
  const filtered = months.filter((month) => month.number === num);
  return filtered[0].name;
};

export const getDateName = (date) => {
  const monthNumberStr = date.substring(
    date.indexOf("_") + 1,
    date.lastIndexOf("_")
  );
  const monthNumber = Number(monthNumberStr);
  const monthName = monthNumToName(monthNumber);

  return date
    .replace(monthNumberStr, monthName)
    .replace("_", " ")
    .replace("_", " ");
};

export const dates = {
  "08_09_2021": { json: require("./08_09_2021.json") },
  "18_01_2021": { json: require("./18_01_2021.json") },

  "19_06_2020": { json: require("./19_06_2020.json") },
  "05_02_2020": { json: require("./05_02_2020.json") },

  "15_11_2019": { json: require("./15_11_2019.json") },
  "06_07_2019": { json: require("./06_07_2019.json") },
  "28_06_2019": { json: require("./28_06_2019.json") }
};
