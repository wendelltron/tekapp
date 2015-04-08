'use strict';

describe('Filter: ExtractFile', function () {

  // load the filter's module
  beforeEach(module('tekForumApp'));

  // initialize a new instance of the filter before each test
  var ExtractFile;
  beforeEach(inject(function ($filter) {
    ExtractFile = $filter('ExtractFile');
  }));

  it('should return the input prefixed with "ExtractFile filter:"', function () {
    var text = 'angularjs';
    expect(ExtractFile(text)).toBe('ExtractFile filter: ' + text);
  });

});
