'use strict';

describe('Service: FactoryBadge', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryBadge;
  beforeEach(inject(function (_FactoryBadge_) {
    FactoryBadge = _FactoryBadge_;
  }));

  it('should do something', function () {
    expect(!!FactoryBadge).toBe(true);
  });

});
