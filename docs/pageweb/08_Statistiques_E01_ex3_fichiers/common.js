(function ($) {
  // ---------------------------------------------------- //
  // VISIBILITY CHECKING
  // ---------------------------------------------------- //
  function isVisible(wmin, wmax) {
    ww = $(window).width();
    if (wmin && wmax) {
      if (ww > wmin && ww < wmax) {
        return true;
      } else {
        return false;
      }
    }
    if (wmin && !wmax) {
      if (ww > wmin) {
        return true;
      } else {
        return false;
      }
    }
    if (!wmin && wmax) {
      if (ww < wmax) {
        return true;
      } else {
        return false;
      }
    }
    return false
  };

  var isMobile = false;
  /*var isTablet = false;
  var isDesktop = false;*/
  $(window).on('load resize', function () {
    isMobile = isVisible(false, "767");
    /*isTablet = isVisible("768", "1279");
    isDesktop = isVisible("1280", false);*/
  });

  // ---------------------------------------------------- //
  // SLIDER GALLERY
  // ---------------------------------------------------- //
  var sliderGallery = function () {

    /*** Vars ***/
    var gallery = '.mygallery',
      slider = false;

    /*** Init ***/
    var init = function () {

      manage(); // On load (1*)
      resize();

      $(window).on('load resize', function () { // On resize (2*)
        waitForFinalEvent(function () {
          manage();
          resize();
        }, 200, "sliderGallery");
      });

    };

    /*** Manage slider ***/
    var manage = function () {

      if (isMobile && !slider) { // If mobile and slider not built yet = build
        build();
      }
      else if (!isMobile && slider) { // Not mobile but slider built = destroy
        destroy();
      }

    };

    /*** Build slider ***/
    var build = function () {
      slider = $(gallery).addClass('owl-carousel owl-theme'); // Add owl slider class (3*)
      slider.owlCarousel({ // Initialize slider
        loop: true,
        items: 1,
        dots: true,
      });
    };

    /*** Destroy slider ***/
    var destroy = function () {
      slider.trigger("destroy.owl.carousel"); // Trigger destroy event (4*)
      slider = false; // Reinit slider variable
      jQuery(gallery).removeClass('owl-carousel owl-theme'); // Remove owl slider class (3*)
    };

    var resize = function () {
      var heightEl = $('.card'),
        newHeight = 0;

      heightEl.css('min-height', 0);

      heightEl.each(function () {
        newHeight = ($(this).height() > newHeight) ? $(this).height() : newHeight;
      });

      heightEl.css('min-height', newHeight);
    };

    /*** Public methods***/
    return {
      init: init
    };

  }();

  // ---------------------------------------------------- //
  // CAROUSSEL Article Connexe
  // ----------------------------------------------------   
  function loadConnexeCarousel() {
    $('.connexe.owl-carousel').owlCarousel({
      loop: true,
      dots: false,
      responsive: {
        0: {
          items: 1,
          nav: false,
          dots: true
        },
        500: {
          items: 3,
          nav: false,
          dots: true
        },
        800: {
          items: 4,
          nav: false,
          dots: true
        },
        1024: {
          items: 6,
          nav: false
        }
      }
    });
  }

  // ---------------------------------------------------- //
  // CAROUSSEL mois agenda
  // ----------------------------------------------------   
  $('.date-chrono.owl-carousel').owlCarousel({
    loop: false,
    dots: false,
    nav: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      250: {
        items: 2,
        nav: true,
        dots: false
      },
      400: {
        items: 3,
        nav: true,
        dots: false
      },

    }
  })

  // ---------------------------------------------------- //
  // PREVENT MULTIPLE CALLS
  // ---------------------------------------------------- //
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  // ---------------------------------------------------- //
  // DOCUMENT READY
  // ---------------------------------------------------- //      
  $(document).ready(function () {
    // Init slider gallery
    sliderGallery.init();
    loadConnexeCarousel();
  });

  // ---------------------------------------------------- //
  // MENU BURGER
  // ---------------------------------------------------- //
  const mainNav = document.querySelector('.main-navigation'),
    navToggle = document.querySelector('.button-burger'),
    mobile = document.querySelector('.header-mobile'),
    menuScreen = document.querySelector('.menu-screen');

  // Toggle classes.
  var addOpenClass = function () {
    mobile.classList.toggle('is-open');
  };

  // Remove class.
  var removeOpenClass = function () {
    mobile.classList.remove('is-open');
  };

  // Fire events.
  if (navToggle) navToggle.addEventListener('click', addOpenClass);
  if (menuScreen) menuScreen.addEventListener('click', removeOpenClass);

  // ---------------------------------------------------- //
  // menu Scroll
  // ---------------------------------------------------- // 
  function showScrolledHeader() {
    $('.header').css('opacity', '0');
    $('.header-scroll').addClass('header-scroll-show');
    $('.header-scroll-article').addClass('header-scroll-show');
    $('body').addClass('with-fixed-header');
  }
  function hideScrolledHeader() {
    $('.header').css('opacity', '1');
    $('.header-scroll').removeClass('header-scroll-show');
    $('.header-scroll-article').removeClass('header-scroll-show');
    $('body').removeClass('with-fixed-header');
  }

  if ($(document).scrollTop() > 85) {
    showScrolledHeader();
  }
  else {
    hideScrolledHeader();
  }

  $(document).scroll(function () {
    if ($(document).scrollTop() > 85) {
      showScrolledHeader();
    }
    else {
      hideScrolledHeader();
    }
  });

  // ---------------------------------------------------- //
  // READING PROGRESS BAR
  // ---------------------------------------------------- // 
  function ProgressBar(elem, offset) {
    if (elem.length > 0) {
      var articleLength = elem.find('.content-article').height() + offset;
      var scroll = $(window).scrollTop() - elem.offset().top + offset;
      var progress = (scroll / articleLength) * 100;
      if (progress >= 0) {
        $('.progress').addClass('fixed-progressbar');
        $('.progress').show();
      } else {
        if ($(window).scrollTop() < 100) {
          $('.progress').removeClass('fixed-progressbar');
          $('.progress').hide();
        }
      }
      $('.progress').css('width', (progress) + '%');
    }
  }

  // ---------------------------------------------------- //
  //   Lire/Replier la description
  // ---------------------------------------------------- //   
  $('#read-description').click(function () {
    $('#second-part-content').show();//On affiche le reste de la description
    $('#first-part-content').hide();//On cache la 1ere partie de la description
    $('#hide-description').show();  //On affiche le bouton pour replier la description
    $('#read-description').hide();  //On cache le bouton
  });
  $('#hide-description').click(function () {
    $('#second-part-content').hide();//On cache le reste de la description
    $('#first-part-content').show();//On affiche la description reduite
    $('#read-description').show();  //On affiche le bouton pour déplier la description
    $('#hide-description').hide();  //On cache le bouton
  });

  // ---------------------------------------------------- //
  //Commentaires
  // ---------------------------------------------------- //
  $(function () {
    $('.publi-comments').click(function () {
      $('.comments-area2').toggle(); // AFFICHE ET CACHE A CHAQUE CLIQUE SUR LE BOUTTON
      document.getElementById('show-comments').style.display = 'none';
    });
  });
  $(function () {
    $('.comments').click(function () {
      $('.list-comments').toggle(); // AFFICHE ET CACHE A CHAQUE CLIQUE SUR LE BOUTTON
    });
  });

  // ---------------------------------------------------- //
  //  SERP  - Permet de mettre un lien sur les tags
  //          et un lien sur toute la div
  // ---------------------------------------------------- //  
  var handleDataLink = function (dataLink) {
    var href = dataLink.getAttribute("data-link");
    if (href) {
      dataLink.addEventListener("click", function () {
        window.location = href;
      });
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll("[data-link]");
    for (var i = 0; i < links.length; i++) {
      handleDataLink(links[i]);
    }
  }
  )

  // ---------------------------------------------------- //
  //    MODALE - Alerte Bdmjob
  // ---------------------------------------------------- // 
  var modal = $('.modal');
  $('.close-modal').click(function (e) {
    e.preventDefault();
    modal.fadeOut();
  });

  /*
  // ---------------------------------------------------- //
  //    TWITTER Auteur
  // ---------------------------------------------------- // 
  jQuery(function() {
    jQuery('.link-twitter').hide();
    jQuery(".author").mouseover(function(){
        jQuery(this).find('.twitter-author').hide();
        jQuery(this).find('.link-twitter').show();
    }).mouseleave(function(){
        jQuery(this).find('.twitter-author').show();
        jQuery(this).find('.link-twitter').hide();    
    });
  );
  */


  // ---------------------------------------------------- //
  // Scroll Footer Sticky
  // ---------------------------------------------------- // 
  // Show the sticky footer
  $(document).on('scroll', function () {
    if ($(document).scrollTop() > 400 && (!$('body').hasClass('no-sticky-footer'))) {
      $('.footer-sticky').addClass('footer-sticky-show');
    }
  });
  // Open the sticky footer
  $(document).on('click', '.inscription-newsletter', function () {
    $('.form_newsletter[data-param="footer-sticky"]').slideToggle({
      direction: "up"
    });
    $('.footer-sticky').toggleClass('shadow');
  });
  // Remove (hide) the sticky footer
  $(document).ready(function (c) {
    $(document).on('click', '.close-footer-sticky', function (c) {
      $('.footer-sticky').fadeOut('fast');
      $('body').addClass('no-sticky-footer');
    });
  });


  // ---------------------------------------------------- //
  // Infinite scroll on post
  // ---------------------------------------------------- //
  $(function () {

    var timerId;
    var firstElem;
    var lastElem;
    var scrollTop;
    var lastScrollTop = 0;
    var ajaxThrottle = true;
    var launcher = false;
    var oldMostVisible;
    var launchTracking = false;
    var waitTracking = false;
    var oldLaunch;


    //Check if element is in viewport
    $.fn.isInViewport = function () {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // Check which element is the most visible
    $.fn.percentWithinViewport = function (options) {

      var settings = $.extend({
        offsetTop: 0,
        offsetTopElement: false,
        offsetBottom: 0,
        offsetBottomElement: false,
      }, options);
      var offsetTop = settings.offsetTop + ((settings.offsetTopElement !== false && settings.offsetTopElement.length > 0) ? settings.offsetTopElement.outerHeight() : 0);
      var offsetBottom = settings.offsetBottom + ((settings.offsetBottomElement !== false && settings.offsetBottomElement > 0) ? settings.offsetBottomElement.outerHeight() : 0);
      var viewportTop = $(window).scrollTop() + offsetTop;
      var viewportHeight = ($(window).height() - offsetTop) - offsetBottom;
      var viewportBottom = (viewportTop + viewportHeight);
      var visibleArray = [];

      this.each(function () {
        var elementTop = $(this).offset().top;
        var elementHeight = $(this).outerHeight();
        var elementBottom = elementTop + elementHeight;
        var totalHeight = Math.max(elementBottom, viewportBottom) - Math.min(elementTop, viewportTop);
        var heightDiff = totalHeight - viewportHeight;
        var elementInside = elementHeight - heightDiff;
        var percent = parseInt(elementInside <= 0 ? 0 : elementInside / elementHeight * 100);
        $(this).attr('data-viewpt', percent);
        if (percent > 0) {
          visibleArray.push($(this));
        }
      });

      return visibleArray;

    };

    // Responsive sidebar
    $(window).on('load resize', function () {
      sidebar = $('body > .content').first().find('.side');
      if ($(window).width() > 768) {
        $('body > .content').first().append($('body > .side.moved').removeClass('moved'));
      } else {
        sidebar.addClass('moved').find('.sidebar');
        $('.tag-top').before(sidebar);
      }
    });

    // Ajax load
    function ajaxLoadNextPost() {

      var load = $('.infinite-load');
      if (load.length <= 0) {
        // Add the loader
        lastElem.after('<div class="infinite-load"><span></span></div>');
        load = $('.infinite-load');
      }

      $.ajax({
        url: ajaxurl,
        data: {
          'action': 'single_infinite_scroll',
          'infinite_post': lastElem.data('id'),
          'infinite_exclude': firstElem.data('id'),
          'infinite_tax': firstElem.data('tax'),
          'infinite_nonce': lastElem.data('nonce'),
        },
        success: function (response) {

          if (response.success) {
            load.after(response.data).remove();
            loadConnexeCarousel();
            var post = $('.content.loaded');
            post.show();
            post.removeClass('loaded');
            post.attr('data-elem', parseInt(lastElem.data('elem')) + 1);
            // Mobile only: Move scrollbar to the top of the last loaded post 
            if ($(window).width() <= 768 && post.offset().top < lastScrollTop) {
              window.scrollTo(0, post.offset().top - $('.header-mobile').height());
            }
            //Copy the
            if (firstElem.find('.temp-stiky-footer').length === 0) {
              firstElem.append('<div class="temp-stiky-footer"></div>');
              $('body > .footer-sticky').clone().appendTo(firstElem.find('.temp-stiky-footer'));
            }
            // Prevent multiple AJAX call in a too short period
            setTimeout(function () {
              ajaxThrottle = true;
            }, 200);
          } else {
            load.after(response.data);
            load.remove();
          }

        },
        error: function (response) {

          console.log('AJAX call error')
          load.remove();

        }

      });

    }

    // Update active post on scroll
    function updateFocusPost() {

      var withinViewportArray = $('body > .content').percentWithinViewport();
      var focusElem;
      var visibility = mostVisible = closest = closestElem = 0;
      $.each(withinViewportArray, function (key, value) {
        visibility = parseInt($(this).attr('data-viewpt'));
        if (visibility > mostVisible) {
          closest = mostVisible;
          if (typeof focusElem === 'object') {
            closestElem = focusElem.data('elem');
          }
          mostVisible = visibility;
          focusElem = $(this);
        } else if (visibility > closest) {
          closest = visibility;
          closestElem = $(this).data('elem');
        }
      });

      $.fn.updateProgress = function () {

        // Progress bar
        if (parseInt($(this).data('elem')) === 1) {
          ProgressBar($(this), 0);
        } else {
          ProgressBar($(this), $('.header-scroll-article').height());
        }

      }

      $.fn.updateFocusElem = function () {

        //Update sticky footer (mobile)
        if ($(this).find('.temp-stiky-footer').length) {
          $('body > .footer-sticky').remove();
          $(this).find('.temp-stiky-footer').find('.footer-sticky').clone().insertBefore('body > footer');
        }

        // Update url, canonical, title
        var Url = "/" + $(this).data('slug') + "/";
        if (window.location.pathname != Url) {
          var title = $(this).find('h1').text();
          // Update address without reloading
          window.history.pushState($(this).data('slug'), title, Url);
          setTimeout(function () {
            window.oldPost = window.location.pathname;
          }, 50);
          // Update canonical (juste in case)
          $('link[rel="canonical"]').attr('href', window.location);
          // Update header bar title
          $('.header-scroll-article .titre-article').text(title);
          // Update header bar social sharing data
          $('.header-social').attr('data-related', $(this).find('.trck-social').data('related'));
          $('.header-social').attr('data-url', $(this).find('.trck-social').data('url'));
          $('.header-social').attr('data-title', $(this).find('.trck-social').data('title'));
          $('.header-social').attr('data-slug', $(this).find('.trck-social').data('slug'));
          // Update document title
          document.title = title + " - BDM";
          // Push analytics state
          dataLayer.push({
            event: 'VirtualPageview',
            'VirtualPageUrl': window.location.pathname,
            'VirtualPageTitle': title,
            'typeSite': 'blog',
            'cateSite': 'blogdumoderateur',
            'site': 'blogdumoderateur',
            'categoryPage': 'Detail',
            'sujetPage': 'Article',
            'typePage': 'DA-Infinite',
            'Categorie': $(this).data('cat'),
            'Tag': $(this).data('tag'),
          });
        }

      };

      // Update progress bar call
      $('body > .content[data-viewpt="' + mostVisible + '"]').updateProgress();

      // Update focus post if previous value changed
      if (!waitTracking && typeof focusElem === 'object' && focusElem.data('slug') != oldLaunch) {
        if (!oldMostVisible || (mostVisible && mostVisible != oldMostVisible)) {
          launchTracking = true;
          oldMostVisible = mostVisible;
        } else {
          if (launchTracking) {
            waitTracking = true;
            if (mostVisible == oldMostVisible) {
              //If first load (page load), we do not update the URL and push the tracking data layer
              if (typeof oldLaunch !== 'undefined') {
                $('body > .content[data-viewpt="' + mostVisible + '"]').updateFocusElem();
              }
              oldLaunch = focusElem.data('slug');
            }
            waitTracking = false;
          }
          launchTracking = false;
        }
      }

    }

    // Auto scroll to previous post when pressing previous (browser history)
    function historyAutoScroll() {

      window.onpopstate2 = window.onpopstate;
      window.popthrottle = true;
      window.oldPost = window.location.pathname;

      window.onpopstate = function () {
        if (window.popthrottle) {
          window.popthrottle = false;
          window.onpopstate2();
          setTimeout(function () {
            window.popthrottle = true;
            if (window.oldPost == window.location.pathname) {
              window.history.back();
            } else {
              window.oldPost = window.location.pathname;
              slug = window.location.pathname.replace(/^\/|\/$/g, '');
              elem = $('body > .content[data-slug=' + slug + ']');
              offset = $('.header-scroll-article').height();
              if (elem.length) {
                // If it is the firt post, sccroll to top of page
                if (slug == $('body > .content').first().data('slug')) {
                  window.scrollTo(0, 0);
                } else {
                  window.scrollTo(0, elem.offset().top - offset);
                }
              }
            }
          }, 100);
        }
      };

    };

    // The main function
    function infiniteScrollInit() {

      firstElem = $('body > .content').first();
      lastElem = $('body > .content').last();
      scrollTop = $(this).scrollTop(); //Scroll direction

      // Trigger function depending of the screen size
      if (lastElem.find('.breadcrumb').isInViewport() && ajaxThrottle) {
        launcher = true;
      }

      if (launcher && ajaxThrottle && $('.no-more-post').length === 0 && scrollTop > lastScrollTop) {
        launcher = false;
        ajaxThrottle = false;
        ajaxLoadNextPost();
      }

      // Update active post on scroll
      updateFocusPost();

      // Auto scroll to previous post when pressing previous (browser history)
      historyAutoScroll();

      // Update previous scroll position to detect scroll direction
      lastScrollTop = scrollTop;

    }

    // Throttle function: 
    // Input as function which needs to be throttled 
    // Delay is the time interval in milliseconds
    var throttleFunction = function (func, delay) {
      if (timerId) {
        return
      }
      timerId = setTimeout(function () {
        func()
        timerId = undefined;
      }, delay)
    }

    // Where magic happens
    if ($('body').hasClass('single-post')) {

      $(window).on('load scroll', function () {
        throttleFunction(infiniteScrollInit, 200);
      });

    }

  });


})(jQuery);