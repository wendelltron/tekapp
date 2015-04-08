'use strict';

describe('Service: FactoryNotification', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryNotification;
  beforeEach(inject(function (_FactoryNotification_) {
    FactoryNotification = _FactoryNotification_;
  }));

  it('should do something', function () {
    expect(!!FactoryNotification).toBe(true);
  });

});
