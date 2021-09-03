"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  "use strict";
  /**
   * Easy selector helper function
   */

  var select = function select(el) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    el = el.trim();

    if (all) {
      return _toConsumableArray(document.querySelectorAll(el));
    } else {
      return document.querySelector(el);
    }
  };
  /**
   * Easy event listener function
   */


  var on = function on(type, el, listener) {
    var all = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(function (e) {
          return e.addEventListener(type, listener);
        });
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  /**
   * Easy on scroll event listener 
   */


  var onscroll = function onscroll(el, listener) {
    el.addEventListener('scroll', listener);
  };
  /**
   * Back to top button
   */


  var backtotop = select('.back-to-top');

  if (backtotop) {
    var toggleBacktotop = function toggleBacktotop() {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };

    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  var phoneMask = IMask(document.getElementById('phone-mask'), {
    mask: '+{7}(000)000-00-00',
    lazy: false,
    placeholderChar: '_'
  });
  var swiperTariffs = new Swiper(".swiper-tariffs", {
    navigation: {
      nextEl: ".next3",
      prevEl: ".prev3"
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      991: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  });
  var swiperBrand = new Swiper(".swiper-brand", {
    spaceBetween: 30,
    centeredSlides: true,
    speed: 6000,
    autoplay: {
      delay: 1
    },
    loop: true,
    slidesPerView: 'auto',
    allowTouchMove: false,
    disableOnInteraction: true
  });
  var swiperReviews = new Swiper(".swiper-reviews", {
    spaceBetween: 30,
    slidesPerView: 1,
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".next2",
      prevEl: ".prev2"
    }
  });
  window.addEventListener('load', function () {
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });
  /**
   * Preloader
   */

  var preloader = select('#preloader');

  if (preloader) {
    window.addEventListener('load', function () {
      preloader.remove();
    });
  }

  Splitting();
  ScrollOut({
    threshold: .2,
    once: true
  });
  $(document).ready(function () {
    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
      var headroom = new Headroom(document.querySelector("#header"), {
        offset: 0,
        tolerance: {
          up: 0,
          down: 0
        }
      });
      headroom.init();
    }
  });
  (function () {
    jQuery(document).ready(function ($) {
      var i, vivusEle, vivusItems;
      vivusItems = [];
      vivusEle = $('.portfolio__card--logo object');
      i = 0;

      while (i < vivusEle.length) {
        vivusItems.push(new Vivus(vivusEle[i], {
          duration: 200,
          type: 'sync',
          start: 'manual',
          animTimingFunction: Vivus.EASE_OUT
        }));
        i++;
      }

      $('.portfolio__card--logo').hover(function () {
        var $this, thisBtnIndex;
        $this = $(this);
        thisBtnIndex = $this.attr('data-btnstroke-index');
        vivusItems[thisBtnIndex].stop().play();
      }, function () {
        var $this, thisBtnIndex;
        $this = $(this);
        thisBtnIndex = $this.attr('data-btnstroke-index');
        vivusItems[thisBtnIndex].stop().play(-1);
      });
    });
  }).call(this);
  init3D();

  function init3D() {
    var $workItem = $(".work__item");
    $workItem.each(function () {
      $(this).data("xPos", $(this).offset().left);
      $(this).data("yPos", $(this).offset().top);
      $(this).data("itemWidth", $(this).width());
      $(this).data("itemHeight", $(this).height());
      $(this).data("imgOuter", $(this).find(".work__item-img-outer"));
    });
    $workItem.mousemove(function (e) {
      var xPos = $(this).data("xPos");
      var yPos = $(this).data("yPos");
      var mouseX = e.pageX;
      var mouseY = e.pageY;
      var left = mouseX - xPos;
      var top = mouseY - yPos;
      var origin = "center center -300";
      var xPerc = (left - $(this).data("itemWidth") / 2) / $(this).data("itemWidth") * 200;
      var yPerc = (top - $(this).data("itemHeight") / 2) / $(this).data("itemHeight") * 200;
      TweenMax.to($(this).data("imgOuter"), 2, {
        rotationX: 0.1 * yPerc,
        rotationY: -0.1 * xPerc,
        transformOrigin: origin,
        ease: Expo.easeOut
      });
    });
    $workItem.on("mouseleave", function () {
      TweenMax.to($(this).data("imgOuter"), 2, {
        rotationX: 0,
        rotationY: 0,
        transformOrigin: origin,
        ease: Expo.easeOut
      });
    });
  }

  (function ($) {
    $(function () {
      $('.before-wrapper').on("mousemove", function (e) {
        var offsets = $(this).offset();
        var fullWidth = $(this).width();
        var mouseX = e.pageX - offsets.left;

        if (mouseX < 0) {
          mouseX = 0;
        } else if (mouseX > fullWidth) {
          mouseX = fullWidth;
        }

        $(this).parent().find('.comparison-slider').css({
          left: mouseX,
          transition: 'none'
        });
        $(this).find('.after-wrapper').css({
          transform: 'translateX(' + mouseX + 'px)',
          transition: 'none'
        });
        $(this).find('.after-image').css({
          transform: 'translateX(' + -1 * mouseX + 'px)',
          transition: 'none'
        });
      });
      $('.slider-wrapper').on("mouseleave", function () {
        $(this).parent().find('.comparison-slider').css({
          left: '50%',
          transition: 'all .5s'
        });
        $(this).find('.after-wrapper').css({
          transform: 'translateX(50%)',
          transition: 'all .5s'
        });
        $(this).find('.after-image').css({
          transform: 'translateX(-50%)',
          transition: 'all .5s'
        });
      });
    });
  })(jQuery);
})();
//# sourceMappingURL=main.js.map
