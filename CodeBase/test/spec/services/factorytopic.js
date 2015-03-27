'use strict';

describe('Service: FactoryTopic', function () {

  // load the service's module
  beforeEach(module('tekForumApp'));

  // instantiate service
  var FactoryTopic;
  beforeEach(inject(function (_FactoryTopic_) {
    FactoryTopic = _FactoryTopic_;
  }));

  it('should do something', function () {
    expect(!!FactoryTopic).toBe(true);
  });

});
