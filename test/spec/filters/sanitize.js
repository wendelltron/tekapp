'use strict';

describe('Filter: Sanitize', function () {

  // load the filter's module
  beforeEach(module('tekForumApp'));

  // initialize a new instance of the filter before each test
  var Sanitize;
  beforeEach(inject(function ($filter) {
    Sanitize = $filter('Sanitize');
  }));

  it('should return the input prefixed with "Sanitize filter:"', function () {
    var text = 'angularjs';
    expect(Sanitize(text)).toBe('Sanitize filter: ' + text);
  });

});
