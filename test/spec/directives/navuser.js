'use strict';

describe('Directive: NavUser', function () {

  // load the directive's module
  beforeEach(module('tekForumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-user></-nav-user>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavUser directive');
  }));
});
