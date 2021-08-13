document.addEventListener('DOMContentLoaded', function() {

    (function($, window) {
        "use strict";

        const atainsh = {
            navToggle: {
                test() {
                    return true;
                },
                run() {
                    // global vars
                    const nav = $(".nav-main__list"),
                          navLinks = $(".nav-main__list--item"),
                          body = $("body"),
                          contentWrapper = $(".content-wrapper"),
                          contentRow = $(".content-wrapper>.wrapper"),
                          mainCarousel = $("#mainCarousel"),
                          workVimeoContainer = $(".hero-slide__work--head-vimeo"),
                          workVimeo = $(".hero-slide__work--head-vimeo iframe"),
                          modalBG = $(".modal-background"),
                          modalClose = $(".modal-close__button"),
                          photosCarousel = $("#photos-grid"),
                          photosModalContainer = $(".hero-slide__photos--modal"),
                          photosModalClose = $(".hero-slide__photos--modal-close"),
                          modalOfMe = $("#modalCarouselOfMe"),
                          photosOfMe = $(".photos-OF-me").find(".hero-slide__photos--grid-photo"),
                          modalByMe = $("#modalCarouselByMe"),
                          photosByMe = $(".photos-BY-me").find(".hero-slide__photos--grid-photo");

                    function setVimeo() {
                        if ($(workVimeo)[0].hasAttribute("src") && $(workVimeo).attr("src").includes("vimeo")) {
                            const workVimeoPlayer = new Vimeo.Player(workVimeo);

                            workVimeoPlayer.on("playing", function openVimeoModal() {
                                body.addClass("modal-open");
                                // contentWrapper.addClass("modal-open");
                                workVimeoContainer.addClass("modal-open");
                                // modalBG.addClass("modal-open");
                              });

                            modalClose.on("click", function closeVimeoModal() {
                                workVimeoPlayer.pause();
                                body.removeClass("modal-open");
                                // contentWrapper.removeClass("modal-open");
                                workVimeoContainer.removeClass("modal-open");
                                // modalBG.removeClass("modal-open");
                            });
                        }
                    }

                    function setupNav() {
                        $(navLinks[0]).addClass("nav-pane--active");

                        navLinks.on("click", function toggleContentView() {
                            let thisSection = $(this).data("nav-to"),
                                thisSlide = $(mainCarousel.children(".carousel-inner").children(".carousel-item")[thisSection]),
                                activeSlide = mainCarousel.children(".carousel-inner").children(".carousel-item.active");

                            $(".nav-pane--active").removeClass("nav-pane--active");
                            $(this).addClass("nav-pane--active");

                            mainCarousel.animate({opacity: 0}, 200).delay(400).animate({opacity: 1}, 200);
                            setTimeout(function() {
                                activeSlide.removeClass("active");
                                thisSlide.addClass("active");
                                $(document).scrollTop(0);
                            }, 400);
                        });
                    }

                    function handlePhotos() {
                        photosCarousel.on("slide.bs.carousel", function fadeCarousel(event) {
                            let currentGrid = $(event.relatedTarget),
                                nextGrid = $(currentGrid.siblings()[0]);

                            currentGrid.removeClass("in-transition");
                            nextGrid.addClass("in-transition");
                        });
                    }

                    function handlePhotoModals() {
                        photosOfMe.on("click", function() {
                            let thisSlideToggle = $(this).data("slide-toggle");

                            body.addClass("modal-open");
                            photosModalContainer.addClass("modal-open");
                            modalOfMe.carousel(parseInt(thisSlideToggle));
                            modalOfMe.addClass("modal-open");
                        });

                        photosByMe.on("click", function() {
                            let thisSlideToggle = $(this).data("slide-toggle");

                            body.addClass("modal-open");
                            photosModalContainer.addClass("modal-open");
                            modalByMe.carousel(parseInt(thisSlideToggle));
                            modalByMe.addClass("modal-open");
                        });

                        photosModalClose.on("click", function() {
                            body.removeClass("modal-open");
                            photosModalContainer.removeClass("modal-open");
                            modalOfMe.hasClass("modal-open") ? modalOfMe.removeClass("modal-open") : modalByMe.removeClass("modal-open");
                        });
                    }

                    setVimeo();
                    setupNav();
                    handlePhotos();
                    handlePhotoModals();
                }
            }
        };

        for (let key in atainsh) {
            if (atainsh[key].test()) {
                atainsh[key].run();
            }
        }

    }(jQuery, window));

});
