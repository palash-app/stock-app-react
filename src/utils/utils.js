export const convertData = stockData => {
    let formattedData = {};

    for (const stock in stockData) {
        formattedData = {
            data: Object.entries(stockData[stock]).map(([time, entry]) => ({
                open: entry.Open,
                high: entry.High,
                low: entry.Low,
                close: entry.Close,
                time: new Date(time),
            })),
        };
    }
    return formattedData.data;
};

export const querydata = [
    {
        regex: "^(\\w+) stocks$",
        statements: ["all stocks", "nifty50 stocks", "nifty100 stocks"],
        variables: {
            0: ["all", "nifty50", "nifty100"],
        },
        parent: "given",
    },
    {
        regex: "^stocks (\\w+(?:,*\\s*\\w*)*)$",
        statements: ["stocks <list>"],
        variables: {
            1: ["<list>"],
        },
    },
    {
        regex: "^remove stocks (\\w+(?:,*\\s*\\w*)*)$",
        statements: ["remove stocks <list>"],
        variables: {
            2: ["<list>"],
        },
    },
    {
        regex: "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+)$",
        statements: [
            "day close ema <number> > close",
            "week close ema <number> > close",
            "hour close ema <number> > close",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            2: ["ema", "ma"],
            3: ["<number>"],
            4: [">", "<", "!=", "==", ">=", "<="],
            5: ["close", "open", "high", "low"],
        },
    },
    {
        regex:
            "^(\\w+) (\\w+) (\\w+) (\\d+) ([><=!]+) (\\w+) (\\w+) (\\w+) (\\d+)$",
        statements: [
            "day close ema <number> > day close ema <number>",
            "week close ema <number> > day close ema <number>",
            "hour close ema <number> > day close ema <number>",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            2: ["ema", "ma"],
            3: ["<number>"],
            4: [">", "<", "!=", "==", ">=", "<="],
            5: ["day", "week", "hour"],
            6: ["close", "open", "high", "low"],
            7: ["ema", "ma"],
            8: ["<number>"],
        },
    },
    {
        regex: "^(\\w+) (\\w+) (\\w+) (\\d+) in (\\w+) for (\\d+) days$",
        statements: [
            "day close ema <number> in uptrend for <number> days",
            "week close ema <number> in uptrend for <number> days",
            "hour close ema <number> in uptrend for <number> days",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            2: ["ema", "ma"],
            3: ["<number>"],
            5: ["uptrend", "downtrend"],
            7: ["<number>"],
        },
    },
    {
        regex: "^([-+]?\\d*\\.\\d+) of (\\d+) (\\w+) (\\w+) ([><=!]+) (\\w+)$",
        statements: ["<number> of <number> day close > close"],
        variables: {
            0: ["<number>"],
            2: ["<number>"],
            3: ["day", "week", "hour"],
            4: ["close", "open", "high", "low"],
            5: [">", "<", "!=", "==", ">=", "<="],
            6: ["close", "open", "high", "low"],
        },
    },
    {
        regex: "^(\\w+) (\\w+) ([><=!]+) (\\w+) of last (\\d+) ticks$",
        statements: [
            "day close > close of last <number> ticks",
            "week close > close of last <number> ticks",
            "hour close > close of last <number> ticks",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            2: [">", "<", "!=", "==", ">=", "<="],
            3: ["close", "open", "high", "low"],
            6: ["<number>"],
        },
    },
    {
        regex:
            "^(\\w+) (\\w+) shows macd divergence with window (\\d+) fastperiod (\\d+) slowperiod (\\d+) signalperiod (\\d+) in last (\\d+) ticks$",
        statements: [
            "day close shows macd divergence with window <number> fastperiod <number> slowperiod <number> signalperiod <number> in last <number> ticks",
            "week close shows macd divergence with window <number> fastperiod <number> slowperiod <number> signalperiod <number> in last <number> ticks",
            "hour close shows macd divergence with window <number> fastperiod <number> slowperiod <number> signalperiod <number> in last <number> ticks",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            7: ["<number>"],
            9: ["<number>"],
            11: ["<number>"],
            13: ["<number>"],
            16: ["<number>"],
        },
    },
    {
        regex:
            "^(\\w+) (\\w+) shows macd divergence with window (\\d+) in last (\\d+) ticks$",
        statements: [
            "day close shows macd divergence with window <number> in last <number> ticks",
            "week close shows macd divergence with window <number> in last <number> ticks",
            "hour close shows macd divergence with window <number> in last <number> ticks",
        ],
        variables: {
            0: ["day", "week", "hour"],
            1: ["close", "open", "high", "low"],
            7: ["<number>"],
            10: ["<number>"],
        },
    },
    {
        regex: "^quarterly earnings (\\w+) growth rate ([><=!]+) (\\d+) %$",
        statements: ["quarterly earnings net growth rate > <number> %"],
        variables: {
            2: ["net", "recent"],
            5: [">", "<", "!=", "==", ">=", "<="],
            6: ["<number>"],
        },
    },
    {
        regex:
            "^quarterly earnings quarter to quarter growth rate ([><=!]+) (\\d+) %$",
        statements: [
            "quarterly earnings quarter to quarter growth rate > <number> %",
        ],
        variables: {
            7: [">", "<", "!=", "==", ">=", "<="],
            8: ["<number>"],
        },
    },
    {
        regex: "^relative strength in (\\w+) ([><=!]+) (\\d+)$",
        statements: ["relative strength in all > <number>"],
        variables: {
            3: ["all", "nifty50", "nifty100"],
            4: [">", "<", "!=", "==", ">=", "<="],
            5: ["<number>"],
        },
    },
    {
        regex: "^relative strength ([><=!]+) (\\d+)$",
        statements: ["relative strength > <number>"],
        variables: {
            2: [">", "<", "!=", "==", ">=", "<="],
            3: ["<number>"],
        },
    },
    {
        regex: "^get list$",
        statements: ["^get list$"],
        variables: {
            "-1": [""],
        },
    },
    {
        regex: "^get list of stocks with signals$",
        statements: ["^get list of stocks with signals$"],
        variables: {
            "-1": [""],
        },
    },
];

export const checkQuery = str => {
    const q = str.trim();
    var uniqueValues = [];
    if (q == "") {
        uniqueValues = Array.from(
            new Set(querydata.flatMap(item => item.variables[0]))
        );
        console.log(uniqueValues);
    } else {
        const words = q.split(" ");
        console.log(words);
        const key = words.length;
        const last = words[key - 1];
        console.log(last + "@");
        var requredArr = [];
        if (isNaN(last)) {
            requredArr = querydata.filter(item => {
                return (
                    item.variables[key - 1] && item.variables[key - 1].includes(last)
                );
            });
        } else {
            requredArr = querydata.filter(item => {
                return (
                    item.variables[key - 1] &&
                    item.variables[key - 1].includes("<number>")
                );
            });
        }
        uniqueValues = Array.from(
            new Set(requredArr.flatMap(item => item.variables[key]))
        );
    }
    return uniqueValues;
};

class Response {
    constructor(status, data, error) {
        this.status = status;
        this.data = data;
        this.error = error;
    }

    getStatus() {
        return this.ok;
    }

    getData() {
        return this.data;
    }

    getError() {
        return this.error;
    }
}

export { Response };
