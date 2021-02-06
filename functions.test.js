const find = require('./modules/find');
const payment = require('./modules/payment');
const calculatedayvalue = require('./modules/calculatedayvalue');

let find_testarray = [
    'RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00',
    'ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00'
]

let test_empfound_rene = ['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'];
let test_empfound_astrid = ['ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00']
let test_day ='SU20:00-21:00';

//find test positive
test('find Rene on test_array expects specific array', () => {
  expect(find(find_testarray,'RENE')).toStrictEqual(['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00','RENE']);
});

//Show if the calculation of the aount to pay Rene is correct
test('calculates the paymet for Rene expects 215', () => {
    expect(payment(test_empfound_rene)).toBe(215);
});

//Show if the calculation of the aount to pay Astrid is correct based on a random number greater than what is expected
test('calculates the paymet for Astrid not expects other value than 85', () => {
    expect(payment(test_empfound_astrid)).not.toBe(Math.floor(Math.random()*10)+86);
});

//test for the function calculateday values 
test('Calculates the amount to be paid on SU20:00-21:00 which is (25)', () => {
    expect(calculatedayvalue(test_day)).toBe(25);
});