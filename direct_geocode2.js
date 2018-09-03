ymaps.ready(init);


function init () {
    myMap = new ymaps.Map('map', {
        center: [55.674, 37.601],
        zoom: 9
    });
//функция отмены дефолтной работы браузера
    function stopDefAction(evt) {
        evt.preventDefault();
    }

var metki = [];

//действия при нажатии на кнопку
$('#search_route').submit(function (event) {
  event.preventDefault();
     var start = $("#start").val();
     var myGeocoder = ymaps.geocode(start);
      document.getElementById("search_route").reset();
    myGeocoder.then(
        function (res) {
          var firstGeoObject = res.geoObjects.get(0),
              // Координаты геообъекта.
              coords = firstGeoObject.geometry.getCoordinates(),
              // Область видимости геообъекта.
              bounds = firstGeoObject.properties.get('boundedBy');

          firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
          // Получаем строку с адресом и выводим в иконке геообъекта.
          firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

metki.push(coords);
ymaps.route(metki).then(
    function (route) {
        myMap.geoObjects.add(route);
    },
    function (error) {

    }
);

          // Добавляем первый найденный геообъект на карту.
          myMap.geoObjects.add(firstGeoObject);
          // Масштабируем карту на область видимости геообъекта.
          myMap.setBounds(bounds, {
              // Проверяем наличие тайлов на данном масштабе.
              checkZoomRange: true
          });
        },
        function (err) {
            alert('Ошибка');
        }
      )

  });


      document.getElementById('addplace').addEventListener('click', function() {
          addplace();
        });

      function addplace() {
        var metka = document.getElementById("start");
        var node = document.createElement("div"); // Create a <div> node



        node.appendChild(document.createTextNode(start.value));
        node.className = "alert"
        document.getElementById("waypoints").appendChild(node);


      }






}
