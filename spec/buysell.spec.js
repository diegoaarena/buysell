const buysell = require('../buysell');

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
        },
        {
            input: [1, 5, 1, 5, 1, 5],
            output: [0, 1]
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

    let runTests = method => {
        let start = process.hrtime();
        for (let i = 0; i < 1000000; i++) {
            for(let testcase of testcases) {
                method(testcase.input);
            }
        }
        let elapsed = process.hrtime(start)[1] / 1000000;
        console.log(method.name, process.hrtime(start)[0] + ' s, ' + elapsed.toFixed(3) + ' ms');
    };

    it('method timing', () => {
        runTests(buysell.bruteforce);
        runTests(buysell.dynamic);
    });
});
