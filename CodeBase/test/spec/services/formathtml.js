'use strict';

describe('Service: FormatHTML', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FormatHTML;
  beforeEach(inject(function (_FormatHTML_) {
    FormatHTML = _FormatHTML_;
  }));

  it('should do something', function () {
    expect(!!FormatHTML).toBe(true);
  });

});
