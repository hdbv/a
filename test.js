const { test } = require('@jest/globals');
const find = require('find') ;

test('adds 1 + 2 to equal 3', () => {
    expect(find(1, 2)).toBe(3);
});