'use strict';
(function ($) {

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    $('.email').click(function (e) {
        $.post(
            ajaxurl,
            {
                'action': 'launch_rj_api',
                "param": "wake_up"
            },
            function (response) {
            }
        );
    });

    /*----------------------------------------------
              OUVERTURE DE LA MODALE
    -----------------------------------------------*/
    // Voir dans header.js

    /*----------------------------------------------
                    MODALE CLASSIQUE
    -----------------------------------------------*/
    $('#job_search').autocomplete({
        appendTo: $("#job_search").parent(),
        source: function (request, response) {
            minLength: 2,
                $.ajax({
                    dataType: "json",
                    url: ajaxurl,
                    data: 'action=launch_rj_api&param=job_search&job=' + encodeURI(request.term),

                    success: function (data) {
                        var dataLabel = [];
                        $.map(data, function (item) {
                            dataLabel.push({ label: item.Label });
                        });
                        response(dataLabel);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(jqXHR);
                    }
                });
        },
        html: true
    });

    $('#city_search').autocomplete({

        appendTo: $("#city_search").parent(),
        source: function (request, response) {
            minLength: 2,
                $.ajax({
                    dataType: "json",
                    url: ajaxurl,
                    data: 'action=launch_rj_api&param=city_search&city=' + encodeURI(request.term),
                    success: function (data) {
                        var dataLabel = [];
                        $.map(data, function (item) {
                            dataLabel.push({ label: item.Label });
                        });

                        response(dataLabel);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(jqXHR);
                    }
                });
        },
        html: true
    });

    $('.subscribe_hellowork').click(function (e) {
        var job = document.getElementById("job_search").value;
        var location = document.getElementById("city_search").value;
        var email = document.getElementById("email").value;
        var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        var data_param = $('.form_newsletter').data('param');
        jQuery.post(
            ajaxurl,
            {
                'action': 'launch_rj_api',
                'param': "create_account",
                'job': job,
                'city': encodeURI(location),
                'email': encodeURI(email),
                'mobile': encodeURI(ismobile)
            },
            function (response) {
                response = JSON.parse(response);
                var message = response.message;
                var status = response.status;
                document.getElementById("notice-bdmjob").innerHTML = message;
                if (status == 200) {
                    dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Modale', 'EventAction': 'Création', 'EventLibelle': 'Push HW - ' + data_param + ' - OK  ' });
                }

            }
        );
    });

    /*----------------------------------------------
                PUSH IN ARTICLE
    -----------------------------------------------*/
    $('.push-bdmjob #metier').autocomplete({
        appendTo: $(this).parent(),
        source: function (request, response) {
            minLength: 2,
                $.ajax({
                    dataType: "json",
                    url: ajaxurl,
                    data: 'action=launch_rj_api&param=job_search&job=' + encodeURI(request.term),

                    success: function (data) {
                        var dataLabel = [];
                        jQuery.map(data, function (item) {
                            dataLabel.push({ label: item.Label });
                        });
                        response(dataLabel);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(jqXHR);
                    }
                });
        },
        html: true
    });

    $('.push-bdmjob #localite').autocomplete({

        appendTo: $(this).parent(),
        source: function (request, response) {
            minLength: 2,
                $.ajax({
                    dataType: "json",
                    url: ajaxurl,
                    data: 'action=launch_rj_api&param=city_search&city=' + encodeURI(request.term),
                    success: function (data) {
                        var dataLabel = [];
                        $.map(data, function (item) {
                            dataLabel.push({ label: item.Label });
                        });

                        response(dataLabel);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(jqXHR);
                    }
                });
        },
        html: true
    });

    $('.push-bdmjob .submit').click(function (e) {
        e.preventDefault();
        var job = $(".push-bdmjob #metier").val();
        var location = $(".push-bdmjob #localite").val();
        var email = $(".push-bdmjob #email").val();
        var ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
        $.post(
            ajaxurl,
            {
                'action': 'launch_rj_api',
                'param': "create_account",
                'job': job,
                'city': encodeURI(location),
                'email': encodeURI(email),
                'mobile': encodeURI(ismobile)
            },
            function (response) {
                response = JSON.parse(response);
                var message = response.message;
                var status = response.status;
                $(".push-bdmjob .notice-bdmjob").html(message);
                if (status == 200) {
                    dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Box', 'EventAction': 'Load', 'EventLibelle': 'Push HW - DA-Classique - OK' });
                }
            }
        );
    });
})(jQuery);