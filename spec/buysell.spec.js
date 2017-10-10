buysell = require('../buysell');

describe('buysell', () => {

    const testcases = [
        {
            input: [],
            output: [0, 0]
        },
        {
            input: [1, 2, 3, 4, 5],
            output: [0, 4]
        },
        {
            input: [5, 4, 3, 2, 1],
            output: [0, 0]
        },
        {
            input: [1, 5, 1, 6, 9],
            output: [0, 4]
        },
        {
            input: [2, 5, 1, 3, 5],
            output: [2, 4]
        }
    ]

    it('dynamic should pass all the test cases', () => {
        for(let testcase of testcases) {
            let result = buysell.dynamic(testcase.input);
            expect(result).toEqual(testcase.output);
        }
    });

    it('bruteforce should pass all the test cases', () => {
        for(let testcase of testcases) {
            let result = buysell.bruteforce(testcase.input);
            expect(result).toEqual(testcase.output);
        }
    });
});
