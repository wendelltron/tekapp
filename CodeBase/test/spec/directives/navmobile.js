'use strict';

describe('Directive: NavMobile', function () {

  // load the directive's module
  beforeEach(module('tekForumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-mobile></-nav-mobile>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavMobile directive');
  }));
});
