'use strict';

describe('Service: ServerAddress', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var ServerAddress;
  beforeEach(inject(function (_ServerAddress_) {
    ServerAddress = _ServerAddress_;
  }));

  it('should do something', function () {
    expect(!!ServerAddress).toBe(true);
  });

});
