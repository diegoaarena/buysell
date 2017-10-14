const Rx = require('rxjs/Rx');
const buysell = require('../buysell_n');

describe('buysell n times', () => {

    // Where n is the number of full buy-then-sell transactions.

    const testcases = [
        {
            input: [[1, 2, 1, 2, 3, 2, 3, 2], 4],
            output: 4
        }
    ]

    it('bruteforce should pass all the test cases', () => {
        for (let testcase of testcases) {
            let result = buysell.bruteforce(...testcase.input);
            expect(result).toEqual(testcase.output);
        }
    });

});
