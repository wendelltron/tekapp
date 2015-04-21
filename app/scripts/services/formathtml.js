'use strict';

/**
 * @ngdoc service
 * @name tekForumApp.FormatHTML
 * @description
 * # FormatHTML
 * Factory in the tekForumApp.
 */
angular.module('tekForumApp')
    .factory('FormatHTML', function ($timeout) {

        // Public API here
        return {
            format: function () {
                return $timeout(function () {
                    // find all images in the posts
                    $('.formatHTML').find('img, iframe').each(function () {
                        // add bootstrap classes to the images
                        $(this).addClass('img img-responsive');

                        // if image path is not fixed, correct image path to a fixed path
                        if (!$(this).attr('src').match('^http')) {
                            if ($(this).attr('src').match('^/user_avatar') || $(this).attr('src').match('^/images') || $(this).attr('src').match('^images')) {
                                $(this).attr('src', 'https://forum.teksyndicate.com' + $(this).attr('src'));
                            } else {
                                $(this).attr('src', 'http://' + $(this).attr('src'));
                            }
                        }

                    });
                    $('.formatHTML').find('a').each(function () {
                        if ($(this).attr('href')) {
                            if ($(this).attr('href').match('^/users/')) {
                                $(this).addClass('local mention');
                                $(this).attr('href', '#' + $(this).attr('href'));
                            }
                        }
                    });
                    // lazyload youtube
                    $('.lazyYT').lazyYT();
                    $('.lazyYT').addClass('img img-responsive');
                }, 450);
            }
        };
    });