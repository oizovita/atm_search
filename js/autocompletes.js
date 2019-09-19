



    $('#autocomplete').typeahead({
        source: function (query, result) {

            $.ajax({
                url: "index.php",
                data: {
                    query: query
                },
                dataType: "json",
                type: "POST",
                success: function (data) {

                    result($.map(data, function (item) {
                        return item;
                    }))
                }
            });
        }
    })
    $('#autocomplete2').typeahead({
        source: function (city, result) {

            var region = $('#autocomplete')[0].value

            $.ajax({
                url: "index.php",
                data: {
                    city:  city,
                    region: region
                },
                dataType: "json",
                type: "POST",
                success: function (data) {

                    result($.map(data, function (item) {
                        return item;
                    }))
                }
            });
        }
    })
    $('#autocomplete3').typeahead({
        source: function (street, result) {
            var city = $('#autocomplete2')[0].value
            $.ajax({

                url: "index.php",
                data: {
                    city:  city,
                    street: street
                },
                dataType: "json",
                type: "POST",
                success: function (data) {

                    result($.map(data, function (item) {
                        return item;
                    }))
                }
            });
        }
    })
