function bruteforce(prices) {
    let buy = 0;
    let sell = 0;
    let bestProfit = 0;

    const numPrices = prices.length;
    for(let i = 0; i < numPrices; i++) {
        for (let j = i + 1; j < numPrices; j++) {
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

function fp(prices) {
    let buy = 0;
    let sell = 0;
    let min = 0;
    let bestProfit = 0;
    prices.map((value, i) => {
        if (value < prices[min]) {
            min = i;
        }
        else if (value - prices[min] > bestProfit) {
            buy = min;
            sell = i;
            bestProfit = value - prices[min];
        }
    });
    return [buy, sell];
}

function dynamic(prices) {
    let buy = 0;
    let sell = 0;
    let min = 0;
    let bestProfit = 0;
    for(let i = 1; i < prices.length; i++) {
        if (prices[i] < prices[min]) {
            min = i;
        }
        else if (prices[i] - prices[min] > bestProfit) {
            buy = min;
            sell = i;
            bestProfit = prices[i] - prices[min];
        }
    }

    return  [buy, sell];
}

module.exports.dynamic = dynamic;
module.exports.bruteforce = bruteforce;
module.exports.fp = fp;
