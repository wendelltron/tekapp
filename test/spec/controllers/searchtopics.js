'use strict';

describe('Controller: SearchtopicsCtrl', function () {

  // load the controller's module
  beforeEach(module('tekApp'));

  var SearchtopicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchtopicsCtrl = $controller('SearchtopicsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
