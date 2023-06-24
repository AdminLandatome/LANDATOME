(function ($) {

	//Paramètres de la pop-up
	width = 700;
	height = 500;
	//Calcul de la position de la fenetre
	if (window.innerWidth) {
		var left = (window.innerWidth - width) / 2;
		var top = (window.innerHeight - height) / 2;
	}
	else {
		var left = (document.body.clientWidth - width) / 2;
		var top = (document.body.clientHeight - height) / 2;
	}

	// Global tracking funtction
	function datalayerPush(elem, network) {
		dataLayer.push({
			'event': 'socialInteraction',
			'socialNetwork': network,
			'socialAction': elem.closest('.trck-social').data('action'),
			'socialTarget': elem.closest('.trck-social').data('slug'),
		});
	}

	//Partage facebook
	$(document).on('click', '.fb-link', function (event) {
		event.preventDefault();	//On bloque l'évènement
		var current_url = $(this).closest('.trck-social').data('url');
		var current_title = $(this).closest('.trck-social').data('title');
		//Url de partage facebook
		var url_fb = "http://www.facebook.com/sharer.php?u=" + current_url + "&t=" + current_title;
		window.open(url_fb, 'Partager sur facebook', 'menubar=no,scrollbars=no,top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
		datalayerPush($(this), 'Facebook');
	});

	//Partage twitter
	$(document).on('click', '.tw-link', function (event) {
		event.preventDefault();
		//Url de partage twitter
		var current_url = $(this).closest('.trck-social').data('url');
		var current_title = $(this).closest('.trck-social').data('title');
		var related = $(this).closest('.trck-social').attr('data-related');
		var username = "BlogModerateur";
		current_title = current_title.replace(" - BDM", "");
		//Calcul de la longueur du tweet
		var longueur = current_title.length;
		longueur = longueur + 24 + 3 + 4; // le lien de partage prend automatiquement 23 caractères + espaces + via @
		longueur = longueur + username.length;
		// On remplace les caractères spéciaux pour qu'ils passent dans l'URL
		current_title = current_title.replace("%", "%2525");
		current_title = current_title.replace("#", "%2523");
		//Si la longueur dépasse on raccourcit l'url
		if (longueur >= 280) {
			//Recalcul de la longueur du texte pour savoir si on doit réduire le titre de l'article
			var end_points = false;
			//Boucle pour enlever un mot tant que la longueur n'est pas acceptable
			do {
				//Calcul de la longueur
				longueur = current_title.length;	//Titre
				longueur = longueur + + 24 + 3 + 4;
				longueur = longueur + username.length;
				//Si la longueur n'est pas acceptable on enleve un mot
				if (longueur > 277) {
					//On récupère le dernier mot
					dernier_mot = current_title.substring(current_title.lastIndexOf(" ") + 1, current_title.length);
					//On l'enlève
					current_title = current_title.substring(0, current_title.length - dernier_mot.length);
					//On enlève le dernier espace en trop (sinon -> boucle infini)
					current_title = current_title.substring(0, current_title.length - 1);
					//On doit afficher les "..." à la fin du titre
					end_points = true;
				}
			} while (longueur > 277);
			//Affichage des "..."
			if (end_points) {
				current_title += "...";
			}
		}
		//On crée l'URL twitter
		var url_tw = "https://twitter.com/share?url=" + encodeURI(current_url) + "&related=" + related + "&via=" + username + "&text=" + encodeURI(current_title);
		window.open(unescape(decodeURIComponent(url_tw)), 'Partager sur Twitter', 'menubar=no,scrollbars=no,top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
		datalayerPush($(this), 'Twitter');
	});

	//Partage linkedin
	$(document).on('click', '.ld-link', function (event) {
		event.preventDefault();
		//Url de partage linkedin
		var current_url = $(this).closest('.trck-social').data('url');
		var url_ld = "https://www.linkedin.com/shareArticle?source=" + document.location.origin + "&mini=true&url=" + current_url;
		window.open(url_ld, 'Partager sur Linkedin', 'menubar=no,scrollbars=no,top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
		datalayerPush($(this), 'TwitLinkedinter');
	});

	$(document).on('click', '.pt-link', function (event) {
		event.preventDefault();
		var current_url = $(this).closest('.trck-social').data('url');
		var current_title = $(this).closest('.trck-social').data('title');
		var url_pt = "https://pinterest.com/pin/create/button/?url=" + current_url + "&media=" + $(this).data('media') + "&description=" + current_title;
		window.open(url_pt, 'Partager sur Pinterest', 'menubar=no,scrollbars=no,top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
		datalayerPush($(this), 'Pinterest');
	})

	$(document).on('click', '.reddit-link', function (event) {
		event.preventDefault();
		var current_url = $(this).closest('.trck-social').data('url');
		var current_title = $(this).closest('.trck-social').data('title');
		var url_reddit = "https://reddit.com/submit/?url=" + current_url + "&resubmit=true&title=" + current_title;
		window.open(url_reddit, 'Partager sur Reddit', 'menubar=no,scrollbars=no,top=' + top + ',left=' + left + ',width=' + width + ',height=' + height);
		datalayerPush($(this), 'Reddit');
	})

	$(document).on('click', '.flipboard-link', function (event) {
		event.preventDefault();
		datalayerPush($(this), 'Flipboard');
	})

	$(document).on('click', '.messenger-link', function (event) {
		event.preventDefault();
		datalayerPush($(this), 'Messenger');
	})

	$(document).on('click', '.rs-email', function (event) {
		datalayerPush($(this), 'Email');
	})

	$(document).on('click', '.whatsapp-link', function (event) {
		event.preventDefault();
		datalayerPush($(this), 'Whatsapp');
	})

	$(document).on('click', '.sms-link', function (event) {
		event.preventDefault();
		datalayerPush($(this), 'SMS');
	})

	$(document).on('click', '.cc-link', function (event) {
		event.preventDefault();
		var dummy = document.createElement('input');
		var text = $(this).closest('.trck-social').data('url');
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		datalayerPush($(this), 'CopyPast');
	})
})(jQuery);
