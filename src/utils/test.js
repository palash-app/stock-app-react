const QUERY_JSON = {
  /** STOCK-APP MOCK QUERY*/
  GIVEN: [
    "nifty100 stocks",
    "all stocks",
    "remove stocks under surveillance",
    "remove stocks AGI, ASTRAMICRO, ARVIND",
  ],
  WHEN: [
    "relative strength > 70",
    "day close ma 50 < close",
    "1.25 of 52 week low < close",
    "day close ma 50 > day close ma 150",
  ],
  THEN: ["get list"],
};

const niftyRegex = /^nifty(50|100)\sstocks$/i;
const allRegex =
  /^(nifty(50|100)\sstocks|all\sstocks|(remove|add)\sstocks(\sunder\ssurveillance)?(,\s[A-Z]+)*)$/i;

// const regexPattern = /^nifty(50|100)\sstocks$/i;

// const string1 = "nifty100 stocks";
// const string2 = "nifty50 stocks";
// const string3 = "nifty150 stocks";

// console.log(regexPattern.test(string1));

[
  {
    regex: "/ga/",
    options: ["abc", "cab", "bac"],
    variables: ["em", "ma", "ema"],
  },
  {
    regex: "/ga/",
    options: ["day close ma  50 < close", "cab", "bac"],
    variables: ["em", "ma", "ema"],
  },
  {
    regex: "/ga/",
    options: ["abc", "cab", "bac"],
    variables: ["em", "ma", "ema"],
  },
  {
    regex: "/ga/",
    options: ["abc", "cab", "bac"],
    variables: ["em", "ma", "ema"],
  },
  {
    regex: "/ga/",
    options: ["abc", "cab", "bac"],
    variables: ["em", "ma", "ema"],
  },
];
