(function() {
  "use strict";

  // From npm

  var jsonPath = require('JSONPath');

  // Revised module systems magic dance. (for browserify support)

  /* istanbul ignore else */
  if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
    // NodeJS
    module.exports = matchJSON;
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define(function () {
      return matchJSON;
    });
  }

  if (chai && typeof chai.use === 'function') {
    chai.use(matchJSON);
  }

  function matchJSON(chai, utils) {
    var Assertion = chai.Assertion;
    var assert    = chai.assert;
    var flag      = utils.flag;

    // expect

    Assertion.addChainableMethod('matchJSON', function(expected) {
      var actual = this._obj;

      if (!(actual instanceof Array)) {
        actual = [ actual ];
      }

      actual = actual.map(function(json) {
        return typeof json === 'string' ? JSON.parse(json) : json;
      });

      var matches = actual.filter(function(json) {
        return objectMatchesPaths(json, expected);
      });

      flag(this, 'matchJSON', matches);

      var messageSuffix = [
        '\n\n',
        JSON.stringify(expected, undefined, 2),
        '\n\n In set \n\n',
        JSON.stringify(actual, undefined, 2)
      ].join('');

      return this.assert(
        matches.length,
        'expected a match for paths' + messageSuffix,
        'expected to not find a match for paths' + messageSuffix
      );
    });

    Assertion.addProperty('once', function () {
      flag(this, 'once', true);

      var matches = flag(this, 'matchJSON');

      if (matches !== undefined) {
        return assert(
          matches.length === 1,
          'expected only one JSON match',
          'expected more than one JSON match'
        );
      }
    });

    // assert

    assert.matchesJSON = function(val, exp, msg) {
      new Assertion(val, msg).to.matchJSON(exp);
    };

    assert.notMatchesJSON = function(val, exp, msg) {
      new Assertion(val, msg).to.not.matchJSON(exp);
    };

    assert.matchesJSONOnce = function(val, exp, msg) {
      new Assertion(val, msg).to.matchJSON(exp).once;
    };

    assert.notMatchesJSONOnce = function(val, exp, msg) {
      new Assertion(val, msg).to.not.matchJSON(exp).once;
    };

    function objectMatchesPaths(obj, paths) {
      if (!obj) { return false; }

      return Object.keys(paths).every(function(prop) {
        var expectation = jsonPath.eval(obj, prop)[0];
        return utils.eql(expectation, paths[prop]);
      });
    }
  }
})();
