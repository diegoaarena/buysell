function bruteforce(prices, n) {
    if (n == 0 || prices.length == 0) {
        return 0;
    }

    // This alternates the cost of each transaction between buy and sell (starting with buy)
    let sumTrades = (total, current, index) => {
        return (index % 2 === 0)? total - prices[current] : total + prices[current];
    };


    // Fill up the matrix with the cost of transacting n-times on day zero.
    let T = [];
    for (let i = 0; i < n + 1; i++) {
        let zeroTrades = Array(i).fill(0);
        let zeroValue = zeroTrades.reduce(sumTrades, 0);
        T[i] = Array(prices.length).fill({ trades: Array.from(zeroTrades), value: zeroValue });
    }


    for (let i = 1; i < n + 1; i++) {
        for (let j = 1; j < prices.length; j++) {  

            // We insert into the matrix the max of 
            // -  selling/buying today or
            // - not transacting today at all (T[i][j-1])
            // if we buy/sell today then we must check the max
            // of each day where we've transacted only (i-1) times.

            let maxVal = { trades: Array.from(T[i][0].trades), value: T[i][0].value };
            for (let m = 0; m < j; m++) {
                let trades = Array.from(T[i-1][m].trades);
                trades.push(j);
                let thisProfit = trades.reduce(sumTrades, 0);
                if (thisProfit > maxVal.value) {
                    maxVal.trades = trades;
                    maxVal.value = thisProfit;
                }
            }
            T[i][j] = (maxVal.value > T[i][j-1].value)? maxVal : T[i][j-1];
        }
    }

    // console.log(T[n]);
    // console.log(T[n][prices.length - 1]);
    return T[n][prices.length - 1];
}

module.exports.bruteforce = bruteforce;