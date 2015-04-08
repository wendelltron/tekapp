'use strict';

describe('Directive: NavTablet', function () {

  // load the directive's module
  beforeEach(module('tekForumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-tablet></-nav-tablet>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavTablet directive');
  }));
});
