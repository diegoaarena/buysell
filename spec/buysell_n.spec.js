const Rx = require('rxjs/Rx');
const buysell = require('../buysell_n');

describe('buysell n times', () => {

    // Where n is the number of transactions (alternating buy then sell)

    const testcases = [
        {
            input: [[1, 2, 1, 2, 3, 2, 3, 2], 4],
            output: { trades: [ 0, 1, 2, 4 ], value: 3 }
        },
        {
            input: [[1, 2, 3, 4, 5, 1, 2, 3], 4],
            output: { trades: [ 0, 4, 5, 7 ], value: 6 }
        },
        {
            input: [[1, 2, 3, 4, 5, 1, 2, 3], 3],
            output: { trades: [ 0, 4, 5 ], value: 3 }
        },
        {
            input: [[1, 1, 1, 5, 6, 7], 3],
            output: { trades: [ 0, 0, 0 ], value: -1 }
        }
    ]

    it('bruteforce should pass all the test cases', () => {
        for (let testcase of testcases) {
            let result = buysell.bruteforce(...testcase.input);
            expect(result).toEqual(testcase.output);
        }
    });

});
