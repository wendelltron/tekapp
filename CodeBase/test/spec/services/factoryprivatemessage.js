'use strict';

describe('Service: FactoryPrivateMessage', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryPrivateMessage;
  beforeEach(inject(function (_FactoryPrivateMessage_) {
    FactoryPrivateMessage = _FactoryPrivateMessage_;
  }));

  it('should do something', function () {
    expect(!!FactoryPrivateMessage).toBe(true);
  });

});
