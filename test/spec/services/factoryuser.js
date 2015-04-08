'use strict';

describe('Service: FactoryUser', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryUser;
  beforeEach(inject(function (_FactoryUser_) {
    FactoryUser = _FactoryUser_;
  }));

  it('should do something', function () {
    expect(!!FactoryUser).toBe(true);
  });

});
