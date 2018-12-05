function bruteforce(prices, n) {
    if (n == 0 || prices.length == 0) {
        return 0;
    }

    // This alternates the cost of each transaction between buy and sell (starting with buy)
    let sumTrades = (total, current, index) => {
        return index % 2 === 0 ? total - prices[current] : total + prices[current];
    };

    // Fill up the matrix with the cost of transacting n-times on day zero.
    let T = [];
    for (let i = 0; i < n + 1; i++) {
        let zeroTrades = Array(i).fill(0);
        let zeroValue = zeroTrades.reduce(sumTrades, 0);
        T[i] = Array(prices.length).fill({ trades: Array.from(zeroTrades), profit: zeroValue });
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < prices.length; j++) {
            // We insert into the matrix the max of
            // -  selling/buying today or
            // - not transacting today at all (T[i][j-1])
            // if we buy/sell today then we must check the max
            // of each day where we've transacted only (i-1) times.

            let maxVal = { trades: Array.from(T[i][0].trades), profit: T[i][0].value };
            for (let m = 0; m < j; m++) {
                let trades = Array.from(T[i - 1][m].trades);
                trades.push(j);
                let thisProfit = trades.reduce(sumTrades, 0);
                if (thisProfit > maxVal.profit) {
                    maxVal.trades = trades;
                    maxVal.profit = thisProfit;
                }
            }
            T[i][j] = maxVal.profit > T[i][j - 1].profit ? maxVal : T[i][j - 1];
        }
    }

    // console.log(T[n]);
    // console.log(T[n][prices.length - 1]);
    return T[n][prices.length - 1];
}

// increments an array of units (e.g. [0, 0, 0] => [0, 0, 1] etc.)
function increment(a, max) {
    max = max || 1;
    let result = [...a];
    let carried = true;
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] === max) {
            result[i] = 0;
            carried = true;
        } else if (carried) {
            result[i]++;
            break;
        }
    }
    return result;
}

// triangle increments an array of units (e.g. [0, 0, 1] => [0, 1, 1] => [1, 1, 1] etc.)
function ltorIncrement(a, max) {
    max = max || 1;
    let result = [...a];
    let carried = true;
    for (let i = result.length - 1; i >= 0; i--) {
        if (result[i] === max) {
            result[i] = 0;
            carried = true;
        } else if (carried) {
            result[i]++;
            break;
        }
    }
    for (let i = 1; i < result.length; i++) {
        if (result[i] < result[i - 1]) {
            result[i] = result[i - 1];
        }
    }
    return result;
}

// Checks if an array is all value n
function isDone(a, n) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== n) {
            return false;
        }
    }
    return true;
}

function bruteforceLoops(prices, n) {
    let indices = Array(n).fill(0);
    let solution = { trades: [...indices], profit: -prices[0] };

    let sumTrades = (total, current, index) => {
        return index % 2 === 0 ? total - prices[current] : total + prices[current];
    };

    while (true) {
        let profit = indices.reduce(sumTrades, 0);

        if (solution.profit < profit) {
            solution = {
                trades: [...indices],
                profit
            };
        }

        if (isDone(indices, n)) {
            break;
        } else {
            indices = ltorIncrement(indices, prices.length - 1);
        }
    }

    return solution;
}

module.exports = {
    bruteforce,
    increment,
    ltorIncrement,
    bruteforceLoops,
    isDone
};
