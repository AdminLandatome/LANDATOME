(function ($) {
    if ($('.push-bdmjob').html() !== undefined) {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Box', 'EventAction': 'Load', 'EventLibelle': 'Push HW - DA-Classique - Affichage' });
    }

    $(".content-native a").click(function () {
        var slug = $(this).data('param');
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Lien', 'EventAction': 'Lecture', 'EventLibelle': 'Article - Clic ' + slug + ' sidebar' });
    });

    $(".sticky a").click(function () {
        var slug = $(this).data('param');
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Lien', 'EventAction': 'Lecture', 'EventLibelle': 'Article - Clic ' + slug + ' home' });
    });

    /**
    * Tracking BDM/job
    */
    if ($(".card-bdmjob:visible").length > 0) {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BDM/job - Encart Sidebar - https://www.bdmjob.com/emplois/recherche.html' });
    }

    $(".card-bdmjob a").click(function () {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BDM/job - Encart Sidebar - https://www.bdmjob.com/emplois/recherche.html' });
    });

    if ($("#footer-sticky-bdm-job:visible").length > 0) {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BDM/job - Footer Sticky Mobile - https://www.bdmjob.com/emplois/recherche.html' });
    }

    $("#footer-sticky-bdm-job a").click(function () {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BDM/job - Footer Sticky Mobile - https://www.bdmjob.com/emplois/recherche.html' });
    });

    /**
     * Tracking BDM/skills
     */
    if ($(".card-bdmskills:visible").length > 0) {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BDM/skills - Encart Sidebar - https://www.bdmskills.com' });
    }

    $(".card-bdmskills a").click(function () {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BDM/skills - Encart Sidebar - https://www.bdmskills.com' });
    });

    if ($("#footer-sticky-bdm-skills:visible").length > 0) {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BDM/skills - Footer Sticky Mobile - https://www.bdmskills.com' });
    }

    $("#footer-sticky-bdm-skills a").click(function () {
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BDM/skills - Footer Sticky Mobile - https://www.bdmskills.com' });
    });

    /**
    * Tracking BattleDev
    */
    if ($(".card.battledev:visible").length > 0) {
        var url = $(".card.battledev").data("url");
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BattleDev - Home - ' + url });
    }

    $(".card.battledev a").click(function () {
        var url = $(".card.battledev").data("url");
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BattleDev - Home - ' + url });
    });

    if ($("#footer-sticky-battledev:visible").length > 0) {
        var url = $("#footer-sticky-battledev").data("url");
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Load', 'EventLibelle': 'BattleDev - Footer Sticky Mobile - ' + url });
    }

    $("#footer-sticky-battledev a").click(function () {
        var url = $("#footer-sticky-battledev").data("url");
        dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Encart', 'EventAction': 'Redirection', 'EventLibelle': 'BattleDev - Footer Sticky Mobile - ' + url });
    });


    /*----------------------------------------------
              OUVERTURE DE LA MODALE
    -----------------------------------------------*/
    function nl_form_submited_open_modal(data_param) {
        setTimeout(function () {
            var popID = $('.modal'); //Trouver la pop-up correspondante
            $(popID).fadeIn();
            //TODO getTypePage
            dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Modale', 'EventAction': 'Load', 'EventLibelle': 'Push HW - ' + data_param + ' - Affichage  ' });
            //Effet fade-in du fond opaque
            $('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
            //Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
            $('#fade').css({ 'filter': 'alpha(opacity=20)' }).fadeIn();
        }, 400);
        return false;
    };

    // Lorsque je soumets le formulaire
    $(document).on('submit', '.form_newsletter, .form_newsletter-sticky', function (e) {
        e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

        var data_param = $(this).data('param');
        $(this).addClass('active').removeClass('finished-valid finished-unvalid');
        $('.form_newsletter[data-param="' + data_param + '"] .submit-valid, .form_newsletter[data-param="' + data_param + '"] .check-valid, .form_newsletter[data-param="' + data_param + '"] .check-unvalid').hide();
        $('.form_newsletter[data-param="' + data_param + '"] .loading-valid').css('display', 'inline-block');

        // Envoi de la requête HTTP en mode asynchrone
        jQuery.ajax({
            url: ajaxurl, // Le nom du fichier indiqué dans le formulaire
            type: $(this).attr('method'), // La méthode indiquée dans le formulaire (get ou post)
            data: $(this).serialize(), // Je sérialise les données (j'envoie toutes les valeurs présentes dans le formulaire)
            success: function (html) { // Je récupère la réponse du fichier PHP
                html = html.replace(/\n/ig, '');
                if (html == "0" || html == 0) {
                    $('.form_newsletter[data-param="' + data_param + '"] .loading-valid').hide();
                    $('.form_newsletter[data-param="' + data_param + '"] button.submit').prop('disabled', true);
                    $('.form_newsletter[data-param="' + data_param + '"] .check-valid').css('display', 'inline-block');
                    $('.form_newsletter[data-param="' + data_param + '"]').addClass('finished-valid');
                    $('.form_newsletter[data-param="' + data_param + '"] .cgu_newsletter').hide();
                    $('.notice-newsletter-' + data_param).html("Merci ! Vous êtes maintenant inscrit à notre newsletter.");
                    $('.notice-newsletter-' + data_param).addClass('success');
                    $('.notice-newsletter-' + data_param).removeClass('error');
                    if (data_param === 'home') {
                        data_param = 'Middle Home';
                    } else if (data_param === 'footer') {
                        data_param = 'Footer Site';
                    } else if (data_param === 'article') {
                        data_param = 'Footer Article';
                    } else if (data_param === 'article-amp') {
                        data_param = 'Footer Article AMP';
                    } else if (data_param === 'sidebar') {
                        data_param = 'Sidebar';
                    } else if (data_param === 'footer-sticky') {
                        data_param = 'Footer Sticky Mobile';
                    } else {
                        data_param = 'Default Newsletter';
                    }
                    dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Formulaire', 'EventAction': 'Inscription', 'EventLibelle': 'NL - OK - ' + data_param });
                    nl_form_submited_open_modal(data_param);
                } else {
                    $('.form_newsletter[data-param="' + data_param + '"] .loading-valid').hide();
                    $('.form_newsletter[data-param="' + data_param + '"] .check-unvalid').css('display', 'inline-block');
                    $('.form_newsletter[data-param="' + data_param + '"]').addClass('finished-unvalid');
                    $('.form_newsletter[data-param="' + data_param + '"] .cgu_newsletter').hide();
                    $('.notice-newsletter-' + data_param).html("Erreur : " + html).removeClass('success').addClass('error');
                }
            },
            fail: function (html) {
                $('.form_newsletter[data-param="' + data_param + '"] .loading-valid').hide();
                $('.form_newsletter[data-param="' + data_param + '"] .check-unvalid').css('display', 'inline-block');
                $('.form_newsletter[data-param="' + data_param + '"]').addClass('finished-unvalid');
                $('.form_newsletter[data-param="' + data_param + '"] .cgu_newsletter').hide();
                $('.notice-newsletter-' + data_param).html("Il semblerait qu’une erreur interne soit survenue.<br>Notre équipe travaille actuellement sur la résolution de ce problème.<br>Merci de votre compréhension.");
                $('.notice-newsletter-' + data_param).removeClass('success').addClass('error');
                if (data_param === 'home') {
                    data_param = 'Middle Home';
                } else if (data_param === 'footer') {
                    data_param = 'Footer Site';
                } else if (data_param === 'article') {
                    data_param = 'Footer Article';
                } else if (data_param === 'article-amp') {
                    data_param = 'Footer Article AMP';
                } else if (data_param === 'sidebar') {
                    data_param = 'Sidebar';
                } else if (data_param === 'footer-sticky') {
                    data_param = 'Footer Sticky Mobile';
                } else {
                    data_param = 'Default Newsletter';
                }
                dataLayer.push({ 'event': 'EventGeneric', 'EventCat': 'Formulaire', 'EventAction': 'Inscription', 'EventLibelle': 'NL - KO - ' + data_param + ' ' + html });
            }
        });
    });

})(jQuery);