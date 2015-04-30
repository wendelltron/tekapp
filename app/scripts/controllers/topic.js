'use strict';

/**
 * @ngdoc function
 * @name tekForumApp.controller:TopicCtrl
 * @description
 * # TopicCtrl
 * Controller of the tekForumApp
 */
angular.module('tekForumApp')
    .controller('TopicCtrl', function ($scope, $rootScope, $routeParams, FactoryUserStorage, FactoryTopic, FormatHTML) {
        // set loading flag
        $scope.busyLoadingData = false;
        $scope.userPrefs = FactoryUserStorage.user.prefs;
    
        /**
         * Initializes the controller, and formats the html content on load
         * @method init
         * @private
         **/
        var init = function () {
            FactoryTopic.get($routeParams.id).success(function (data) {
                $.each(data.post_stream.posts, function (key, value) {
                    data.post_stream.posts[key].cooked = FormatHTML.format(value.cooked);
                });
                $scope.topic = data;
//                console.log(data);
                $scope.postCount = data.post_stream.posts.length;
                $scope.MAXPOSTCOUNT = data.posts_count;
                $rootScope.customNav.scope.maxpostcount = data.posts_count;
                $rootScope.customNav.scope.scrolledPost = '';
                $rootScope.customNav.scope.scrollFormInvalid = false;
                $rootScope.customNav.url = 'views/nav-topic.html';
            });
        };
        
        $scope.scrollPost = function(postNumber, form) {
            if (form && !isNaN(postNumber) && postNumber > 0) {
//                console.log('post-' + postNumber);
                $rootScope.customNav.scope.scrollFormInvalid = false;
                angular.element(document.getElementsByClassName('infinite')).scrollToElementAnimated(angular.element(document.getElementById('post-' + postNumber)), 0, 750);
                $rootScope.HideMenu();
            }
            else if (form) {
                $rootScope.customNav.scope.scrollFormInvalid = true;
            }
            else if (!form) {
                angular.element(document.getElementsByClassName('infinite')).scrollToElementAnimated(angular.element(document.getElementById('post-' + postNumber)), 0, 750);
            }
        };
        $rootScope.customNav.scope.scrollPost = $scope.scrollPost;
        
        /**
         * Called when nearing bottom of the page, looks for more posts, if available
         * @method FetchPosts
         **/
        $scope.FetchPosts = function () {
            if ($scope.postCount < $scope.MAXPOSTCOUNT) {
                $scope.busyLoadingData = true;
                var request = '',
                    requestAttach = '';
                // build array of post ids to fetch
                for (var i = 0; i < 20; i++) {
                    // if target id exists push into fetch array, otherwise exit loop
                    if ($scope.topic.post_stream.stream[i + $scope.postCount]) {
                        if (i === 1) {
                            requestAttach = '&';
                        }
                        request = request +
                            requestAttach + 'post_ids%5B%5D=' +
                            $scope.topic.post_stream.stream[i + $scope.postCount];
                    } else {
                        break;
                    }
                }
                // iterate postCount
                $scope.postCount += 20;

                // fetch posts and add to posts array
                FactoryTopic.getPosts($scope.topic.id, request).success(function (data) {
                    $scope.busyLoadingData = false;
//                    console.log(data.post_stream.posts);
                    $.each(data.post_stream.posts, function (key, value) {
                        data.post_stream.posts[key].cooked = FormatHTML.format(value.cooked);
                    });
                    $scope.topic.post_stream.posts.push.apply($scope.topic.post_stream.posts, data.post_stream.posts);
                });
            }
        };
        init();
    });