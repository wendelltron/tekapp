'use strict';

describe('Service: FactoryCategory', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryCategory;
  beforeEach(inject(function (_FactoryCategory_) {
    FactoryCategory = _FactoryCategory_;
  }));

  it('should do something', function () {
    expect(!!FactoryCategory).toBe(true);
  });

});
