import SettlerBody from '../utils/SettlerBody';

const calculateBodyToSpawnAssertions = [
  {assert: {bP: '1W1M', eC: 100}, expected: []},
  {assert: {bP: '1W1M', eC: 150}, expected: [WORK, MOVE]},
  {assert: {bP: '1W1M', eC: 200}, expected: [WORK, MOVE]},
  {assert: {bP: '1W1M', eC: 250}, expected: [WORK, MOVE]},

  {assert: {bP: '2W1M', eC: 200}, expected: []},
  {assert: {bP: '2W1M', eC: 250}, expected: [WORK, WORK, MOVE]},
  {assert: {bP: '2W1M', eC: 300}, expected: [WORK, WORK, MOVE]},
  {assert: {bP: '2W1M', eC: 350}, expected: [WORK, WORK, MOVE]},

  {assert: {bP: '^6W1M', eC: 100}, expected: []},
  {assert: {bP: '^6W1M', eC: 150}, expected: [WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 200}, expected: [WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 250}, expected: [WORK, WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 300}, expected: [WORK, WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 350}, expected: [WORK, WORK, WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 400}, expected: [WORK, WORK, WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 450}, expected: [WORK, WORK, WORK, WORK, MOVE]},
  {assert: {bP: '^6W1M', eC: 1000}, expected: [WORK, WORK, WORK, WORK, WORK, WORK, MOVE]},

  {assert: {bP: '^2W*C1M', eC: 200}, expected: [WORK, CARRY, MOVE]},
  {assert: {bP: '^2W*C1M', eC: 250}, expected: [WORK, CARRY, MOVE]},
  {assert: {bP: '^2W*C1M', eC: 300}, expected: [WORK, CARRY, MOVE]},
  {assert: {bP: '^2W*C1M', eC: 350}, expected: [WORK, WORK, CARRY, CARRY, MOVE]},
  {assert: {bP: '^2W*C1M', eC: 400}, expected: [WORK, WORK, CARRY, CARRY, CARRY, MOVE]},
  {assert: {bP: '^2W*C1M', eC: 450}, expected: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE]},

  {assert: {bP: '1M2W*C1M', eC: 250}, expected: []},
  {assert: {bP: '1M2W*C1M', eC: 300}, expected: []},
  {assert: {bP: '1M2W*C1M', eC: 350}, expected: [MOVE, WORK, WORK, CARRY, MOVE]}
];

describe('SettlerBody', () => {
  it('calculateBodyToSpawn should return correct BodyPartConstant[]', () => {
    calculateBodyToSpawnAssertions.forEach(({assert, expected}) => {
      const {bP, eC} = assert;
      expect(SettlerBody.calculateBodyFromPattern(bP, eC)).toEqual(expected);
    });
  });
});
