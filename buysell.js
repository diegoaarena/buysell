function bruteforce(prices) {
    buy = 0;
    sell = 0;
    bestProfit = 0;

    for(let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
            let profit = prices[j] - prices[i];
            if (bestProfit < profit) {
                buy = i;
                sell = j;
                bestProfit = profit;
            }
        }
    }

    return [buy, sell];
}

function dynamic(prices) {
    buy = 0;
    sell = 0;
    min = 0;
    bestProfit = 0;
    for(let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[min]) {
            min = i;
        }
        else if (prices[i] - prices[min] > maxDiff) {
            buy = min;
            sell = i;
            bestProfit = prices[i] - prices[min];
        }
    }

    return  [buy, sell];
}

module.exports.dynamic = dynamic;
module.exports.bruteforce = bruteforce;
