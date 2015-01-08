### matchJSON, for Chai

[![Travis CI](https://travis-ci.org/DingoEatingFuzz/chai-match-json.svg?branch=master)](https://travis-ci.org/DingoEatingFuzz/chai-match-json)

A way to assert the structure of given JSON.

## Examples
It looks like this:

```js
var FIXTURE = {
  name       : 'foo',
  value      : 'bar',
  additional : [ 'prop', 'er', 'ties' ]
};

expect(FIXTURE).to.matchJSON({
  '$.name'  : 'foo',
  '$.value' : 'bar'
});
```

It uses [JSONPath](https://github.com/s3u/JSONPath) for validating paths. The JSONPath project is well documented
with how to specify path selectors (such as `$.children[3].prices[price<30]`).

### Build

```sh
$ browserify lib/match-json.js -o chai-match-json.js
```