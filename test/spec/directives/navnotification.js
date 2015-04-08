'use strict';

describe('Directive: NavNotification', function () {

  // load the directive's module
  beforeEach(module('tekForumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-notification></-nav-notification>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavNotification directive');
  }));
});
