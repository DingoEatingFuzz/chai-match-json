var matchJSON = require('../lib/match-json');

chai.use(matchJSON);
expect = chai.expect;

var FIXTURE = [
  {
    name: 'Object 1',
    value: 'Value 1',
    space: 'One'
  },
  {
    name: 'Object 2',
    value: 'Value 2',
    space: 'One'
  }
];

describe('match-json', function() {
  it('should match json paths for a string', function() {
    expect(FIXTURE.map(function(o) { return JSON.stringify(o); })).to.matchJSON({
      '$.name'  : 'Object 2',
      '$.value' : 'Value 2'
    });
  });

  it('should match json paths for an object', function() {
    expect(FIXTURE).to.matchJSON({
      '$.name'  : 'Object 2',
      '$.value' : 'Value 2'
    });
  });

  it('should throw when json paths are not matched', function() {
    expect(function() {
      expect(FIXTURE).to.matchJSON({
        '$.alien' : 'planets'
      });
    }).to.throw();
  });

  it('should throw when the json paths are met multiple times but the once flag is set', function() {
    expect(function() {
      expect(FIXTURE).to.matchJSON({
        '$.space' : 'One'
      }).once;
    }).to.throw();
  });
});