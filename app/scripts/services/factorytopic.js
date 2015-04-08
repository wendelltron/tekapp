'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FactoryTopic
 * @description
 * # FactoryTopic
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FactoryTopic', function ($http, ServerAddress, flash) {
        var loadPage = function (page) {
            return '?no_definitions=true&page=' + page + '&slow_platform=true';
        };

        // Public API here
        return {
            get: function (id) {
                return $http.get(ServerAddress + 't/' + id + '.json');
            },
            getLatest: function (page) {
                var extend = '';
                if (page) {
                    extend = loadPage(page);
                }
                return $http.get(ServerAddress + 'latest.json' + extend);
            },
            getLatestCategory: function (id, page) {
                var extend = '';
                if (page) {
                    extend = loadPage(page);
                }
                return $http.get(ServerAddress + '/c/' + id + '/l/latest.json' + extend);
            },
            getPosts: function (id, request) {
                return $http.get(ServerAddress + "t/" + id + "/posts.json?" + request);
            },
            search: function (query) {
                return $http.get(ServerAddress + 'search.json?term=', {
                    params: {
                        term: query,
                        include_blurbs: true
                    },
                    responseType: "json"
                });
            }
        };
    });