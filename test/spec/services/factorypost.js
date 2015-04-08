'use strict';

describe('Service: FactoryPost', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryPost;
  beforeEach(inject(function (_FactoryPost_) {
    FactoryPost = _FactoryPost_;
  }));

  it('should do something', function () {
    expect(!!FactoryPost).toBe(true);
  });

});
