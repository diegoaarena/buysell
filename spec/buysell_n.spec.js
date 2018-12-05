const buysell = require('../buysell_n');

describe('buysell n times', () => {
    // Where n is the number of transactions (alternating buy then sell)

    const testcases = [
        {
            input: [[1, 2, 1, 2, 3, 2, 3, 2], 4],
            output: { trades: [0, 1, 2, 4], profit: 3 }
        },
        {
            input: [[1, 2, 3, 4, 5, 1, 2, 3], 4],
            output: { trades: [0, 4, 5, 7], profit: 6 }
        },
        {
            input: [[1, 2, 3, 4, 5, 1, 2, 3], 3],
            output: { trades: [0, 4, 5], profit: 3 }
        },
        {
            input: [[1, 1, 1, 5, 6, 7], 3],
            output: { trades: [0, 0, 0], profit: -1 }
        }
    ];

    it('bruteforce should pass all the test cases', () => {
        for (let testcase of testcases) {
            let result = buysell.bruteforce(...testcase.input);
            expect(result).toEqual(testcase.output);
        }
    });

    describe('bruteforceLoops', () => {
        it('should actually terminate', () => {
            expect(() => buysell.bruteforceLoops([1, 1, 1, 5, 6, 7], 3)).not.toThrow();
        });

        it('should pass all the test cases', () => {
            for (let testcase of testcases) {
                let result = buysell.bruteforceLoops(...testcase.input);
                expect(result).toEqual(testcase.output);
            }
        });
    });

    describe('increment', () => {
        it('should add units', () => {
            const actual = buysell.increment([0, 0, 0]);
            expect(actual).toEqual([0, 0, 1]);
        });

        it('should carry over from units to the next column', () => {
            const actual = buysell.increment([0, 0, 1]);
            expect(actual).toEqual([0, 1, 0]);
        });

        it('should overflow', () => {
            const actual = buysell.increment([1, 1, 1]);
            expect(actual).toEqual([0, 0, 0]);
        });
    });

    describe('ltorIncrement', () => {
        it('should add units', () => {
            const actual = buysell.ltorIncrement([0, 0, 0]);
            expect(actual).toEqual([0, 0, 1]);
        });

        it('should carry over units', () => {
            let actual = buysell.ltorIncrement([0, 0, 1]);
            expect(actual).toEqual([0, 1, 1]);

            actual = buysell.ltorIncrement([0, 0, 2], 2);
            expect(actual).toEqual([0, 1, 1]);
        });
    });

    describe('isDone', () => {
        it('should return false when array not all n', () => {
            expect(buysell.isDone([0, 0, 0], 1)).toBeFalsy();
        });

        it('should return true when all array elements are n', () => {
            expect(buysell.isDone([1, 1, 1], 1)).toBeTruthy();
        });
    });
});
