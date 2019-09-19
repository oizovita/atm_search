$("#btn").click(
    function(){
        sendAjaxForm( 'ajax_form', 'index.php');
        return false;
    }
);


function sendAjaxForm( ajax_form, url) {
    $.ajax({
        url: url, //url страницы (action_ajax_form.php)
        type: "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#" + ajax_form).serialize(),  // Сеарилизуем объект
        success: function (response) {
            $("#map").empty();
            response = JSON.parse(response)
            console.log(response)
            var baseMapLayer = new ol.layer.Tile({
                source: new ol.source.OSM()
            });
            var map = new ol.Map({
                target: 'map',
                layers: [baseMapLayer],
                view: new ol.View({
                    center: ol.proj.fromLonLat([Number(response[0]['longitude']),Number( response[1]['latitude'])]),
                    zoom:16 //Initial Zoom Level
                })
            });
            response.forEach(function(element) {

                console.log(element['longitude'], element['latitude'])
                var marker = new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat([Number(element['longitude']),Number( element['latitude'])])
                    ),
                });
                marker.setStyle(new ol.style.Style({
                    image: new ol.style.Icon(({
                        color: '#ffcd46',
                        crossOrigin: 'anonymous',
                        src: 'atm.png',

                    }))
                }));

                var vectorSource = new ol.source.Vector({
                    features: [marker]
                });
                var markerVectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                });
                map.addLayer(markerVectorLayer);
            });
        }

    });
};