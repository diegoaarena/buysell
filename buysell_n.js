function bruteforce(prices, n) {
    if (n == 0 || prices.length == 0) {
        return 0;
    }

    let T = [];
    for (let i = 0; i < n + 1; i++) {
        let emptyTrades = Array(i).fill([0, 0]);
        T[i] = Array(prices.length).fill({ trades: Array.from(emptyTrades), value: 0 });
    }


    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < prices.length; j++) {
            let maxVal = { trades: Array.from(T[i][0].trades), value: 0 };
            for (let m = 0; m < j; m++) {
                if (prices[j] - prices[m] + T[i - 1][m].value > maxVal.value) {
                    maxVal.trades.length = 0;
                    maxVal.trades.push(...T[i-1][m].trades);
                    maxVal.trades.push([m, j]);
                    maxVal.value = prices[j] - prices[m] + T[i - 1][m].value;
                }
            }
            T[i][j] = (maxVal.value > T[i][j-1].value)? maxVal : T[i][j-1];
        }
    }

    //console.log(T);
    //console.log(T[n][prices.length - 1]);
    return T[n][prices.length - 1];
}

module.exports.bruteforce = bruteforce;