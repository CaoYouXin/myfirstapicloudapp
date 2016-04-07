/**
 * Created by caoyouxin on 4/1/16.
 */
require(['jquery'], function ($) {
    $(function () {
        require(['toonly/javascripts/only-pageslide', 'toonly/javascripts/only-router'], function (pageSlide, router) {
            var urlSnapshot = pageSlide.init();
            var _href = window.location.href;
            router.setLocationPrefix(_href.substr(0, _href.indexOf('index.html')));
            router.go(urlSnapshot ? urlSnapshot : 'blogcontent/index_.html');
        });
    });
});
