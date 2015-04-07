'use strict';

describe('Directive: NavOther', function () {

  // load the directive's module
  beforeEach(module('tekForumApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-nav-other></-nav-other>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the NavOther directive');
  }));
});
