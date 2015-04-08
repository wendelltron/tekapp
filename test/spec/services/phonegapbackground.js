'use strict';

describe('Service: PhoneGapBackground', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var PhoneGapBackground;
  beforeEach(inject(function (_PhoneGapBackground_) {
    PhoneGapBackground = _PhoneGapBackground_;
  }));

  it('should do something', function () {
    expect(!!PhoneGapBackground).toBe(true);
  });

});
