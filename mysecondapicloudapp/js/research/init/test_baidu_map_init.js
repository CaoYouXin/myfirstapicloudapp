;(function () {
    'use strict';

    //yangaiche(sys.load_module)();
    //yangaiche(sys.load_default_module)();

    yangaiche(sys.init)(function (t) {
        // 定义变量

        // 功能代码
        var map = new BMap.Map('map', {minZoom:16,maxZoom:16});            // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 16);
        map.disableAutoResize();
        var myKeys = ['地标', '小区', '停车场'];
        var bounds = map.getBounds();
        var radius = map.getDistance(
            new BMap.Point(bounds.Ee, bounds.De),
            new BMap.Point(bounds.Ee, bounds.Ie)
        );
        console.log(radius);
        var page_gapacity = 30;
        var local = new BMap.LocalSearch(map, {
            renderOptions: {map: map, autoViewport: false, selectFirstResult: false},
            pageCapacity: page_gapacity,
            onSearchComplete: function (data) {
                var precessed_data = [];
                for (var i = 0; i < page_gapacity; i++) {
                    t.each(data, function (j, ah) {
                        if (ah.wr.length > i) {
                            var datum = ah.wr[i];
                            precessed_data.push(datum);
                        }
                    });
                }

                var tpl_fn = Handlebars.compile(t('#location_selector_tpl').text());
                t('#result').html(tpl_fn(precessed_data));
            },
            onMarkersSet: function (array) {
                for (var i = 0; i < array.length; i++) {
                    var obj = array[i];
                    obj.marker.hide();
                }
            }
        });
        local.searchNearby(myKeys, map.getCenter(), radius);

        function research() {
            local.searchNearby(myKeys, map.getCenter(), radius);
        }

        map.addEventListener('dragend', research);
        map.addEventListener('touchend', research);

        t('#result').on('click', 'li.line', function () {
            var $this = t(this);

            var point = new BMap.Point($this.attr('data-longitude'), $this.attr('data-latitude'));

            local.searchNearby(myKeys, point, radius);
            map.setCenter(point);
        });
    });
}());
