! function (a) {
    "use strict";

    function b() {
        a(".preloader").length && a(".preloader").delay(200).fadeOut(500)
    }

    function c() {
        if (a(".main-header").length) {
            var b = a(".main-header").height(),
                c = a(window).scrollTop();
            c >= b ? (a(".bounce-in-header").addClass("now-visible"), a(".scroll-to-top").fadeIn(300)) : (a(".bounce-in-header").removeClass("now-visible"), a(".scroll-to-top").fadeOut(300))
        }
    }

    function e() {
        a(".fact-counter").length && a(".fact-counter .column.animated").each(function () {
            var b = a(this),
                c = b.find(".count-text").attr("data-stop"),
                d = parseInt(b.find(".count-text").attr("data-speed"), 10);
            b.hasClass("counted") || (b.addClass("counted"), a({
                countNum: b.find(".count-text").text()
            }).animate({
                countNum: c
            }, {
                duration: d,
                easing: "linear",
                step: function () {
                    b.find(".count-text").text(Math.floor(this.countNum))
                },
                complete: function () {
                    b.find(".count-text").text(this.countNum)
                }
            }))
        })
    }

    function g() {
        var b = a(".fancybox");
        b.length && b.fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            helpers: {
                media: {}
            }
        })
    }
    if (c(), a(".main-header li.dropdown ul").length && (a(".main-header li.dropdown").append('<div class="dropdown-btn"></div>'), a(".main-header li.dropdown .dropdown-btn").on("click", function () {
            a(this).prev("ul").slideToggle(500)
        })), a(".revolution-slider .tp-banner").length && jQuery(".revolution-slider .tp-banner").show().revolution({
            dottedOverlay: "yes",
            delay: 1e4,
            startwidth: 1200,
            startheight: 700,
            hideThumbs: 600,
            thumbWidth: 80,
            thumbHeight: 50,
            thumbAmount: 5,
            navigationType: "bullet",
            navigationArrows: "0",
            navigationStyle: "preview4",
            touchenabled: "on",
            onHoverStop: "off",
            swipe_velocity: .7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: !1,
            parallax: "mouse",
            parallaxBgFreeze: "on",
            parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],
            keyboardNavigation: "off",
            navigationHAlign: "center",
            navigationVAlign: "bottom",
            navigationHOffset: 0,
            navigationVOffset: 20,
            soloArrowLeftHalign: "left",
            soloArrowLeftValign: "center",
            soloArrowLeftHOffset: 20,
            soloArrowLeftVOffset: 0,
            soloArrowRightHalign: "right",
            soloArrowRightValign: "center",
            soloArrowRightHOffset: 20,
            soloArrowRightVOffset: 0,
            shadow: 0,
            fullWidth: "on",
            fullScreen: "off",
            spinner: "spinner4",
            stopLoop: "off",
            stopAfterLoops: -1,
            stopAtSlide: -1,
            shuffle: "off",
            autoHeight: "off",
            forceFullWidth: "on",
            hideThumbsOnMobile: "on",
            hideNavDelayOnMobile: 1500,
            hideBulletsOnMobile: "on",
            hideArrowsOnMobile: "on",
            hideThumbsUnderResolution: 0,
            hideSliderAtLimit: 0,
            hideCaptionAtLimit: 0,
            hideAllCaptionAtLilmit: 0,
            startWithSlide: 0,
            videoJsPath: "",
            fullScreenOffsetContainer: ""
        }), a(".main-bxslider").length && a(".main-bxslider").bxSlider({
            adaptiveHeight: !0,
            auto: !0,
            mode: "fade",
            controls: !0,
            pause: 5e3,
            speed: 700,
            pager: !0
        }), a(".team-slider").length && a(".team-slider").bxSlider({
            adaptiveHeight: !0,
            auto: !0,
            controls: !1,
            pause: 5e3,
            speed: 1e3,
            pagerCustom: "#team-pager"
        }), a("#testimonials-one").length) {
        var d = new MasterSlider;
        d.control("bullets"), d.control("bullets", {
            autohide: !1
        }), d.setup("testimonials-one", {
            autoplay: !0,
            loop: !0,
            width: 120,
            height: 120,
            speed: 20,
            view: "wave",
            preload: 0,
            space: 100,
            autoHeight: !0,
            wheel: !0,
            filters: {
                grayscale: 1
            },
            viewOptions: {
                centerSpace: 1.6
            }
        }), d.control("slideinfo", {
            insertTo: "#staff-info"
        })
    }
    if (a(".image-slider").length && a(".image-slider").owlCarousel({
            loop: !0,
            nav: !0,
            smartSpeed: 1e3,
            autoplay: 7e3,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1400: {
                    items: 1
                }
            }
        }), a(".progress-levels .progress-box .bar-fill").length && a(".progress-box .bar-fill").each(function () {
            var b = a(this).attr("data-percent");
            a(this).css("width", b + "%"), a(this).children(".percent").html(b + "%")
        }), a(".accordion-box").length && a(".accordion-box .acc-btn").on("click", function () {
            a(this).hasClass("active") !== !0 && a(".accordion-box .acc-btn").removeClass("active"), a(this).next(".acc-content").is(":visible") ? (a(this).removeClass("active"), a(this).next(".acc-content").slideUp(500)) : (a(this).addClass("active"), a(".accordion-box .acc-content").slideUp(500), a(this).next(".acc-content").slideDown(500))
        }), a(".lightbox-image").length && a(".lightbox-image").fancybox({
            openEffect: "elastic",
            closeEffect: "elastic",
            helpers: {
                media: {}
            }
        }), a("#contact-form").length && a("#contact-form").validate({
            rules: {
                username: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                subject: {
                    required: !0
                },
                message: {
                    required: !0
                }
            }
        }), a("#locations-box").length) {
        var f = [{
            title: "Envato",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit consectetur adipisicing elit.",
            image: "",
            link: "http://www.themeforest.net/user/template_path/portfolio",
            iconMarker: "images/icons/icon-map-marker.png",
            lat: -37.817085,
            lng: 144.955631
        }, {
            title: "Dhaka",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit consectetur adipisicing elit.",
            image: "",
            link: "http://www.themeforest.net/user/template_path/portfolio",
            iconMarker: "images/icons/icon-map-marker.png",
            lat: 24.1254521,
            lng: 89.1733936
        }, {
            title: "Bejing",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit consectetur adipisicing elit.",
            image: "",
            link: "http://www.themeforest.net/user/template_path/portfolio",
            iconMarker: "images/icons/icon-map-marker.png",
            lat: 39.9390731,
            lng: 116.1172792
        }, {
            title: "New York",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit consectetur adipisicing elit.",
            image: "",
            link: "http://www.themeforest.net/user/template_path/portfolio",
            iconMarker: "images/icons/icon-map-marker.png",
            lat: 40.6976637,
            lng: -74.1197637
        }];
        a("#locations-box").easyLocator({
            myLocations: f,
            maxZoom: 10
        })
    }
    if (a("#contact-form-one").length && a("#contact-form-one").validate({
            rules: {
                username: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                phone: {
                    required: !0
                },
                subject: {
                    required: !0
                },
                message: {
                    required: !0
                }
            }
        }), a("#mixitup_list").length && a("#mixitup_list").mixItUp(), g(), a("#map-location").length) {
        var h;
        h = new GMaps({
            el: "#map-location",
            zoom: 14,
            scrollwheel: !1,
            lat: -37.817085,
            lng: 144.955631
        }), h.addMarker({
            lat: -37.817085,
            lng: 144.955631,
            infoWindow: {
                content: '<p class="info-outer" style="text-align:center;"><strong>Envato</strong><br>Melbourne VIC 3000, Australia</p>'
            }
        })
    }
    if (a(".scroll-to-target").length && a(".scroll-to-target").on("click", function () {
            var b = a(this).attr("data-target");
            a("html, body").animate({
                scrollTop: a(b).offset().top
            }, 1e3)
        }), a(".wow").length) {
        var i = new WOW({
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0
        });
        i.init()
    }
    a(window).on("scroll", function () {
        c(), e()
    }), a(window).on("load", function () {
        b()
    })
}(window.jQuery);