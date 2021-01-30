$("#carousel-thumbs-slider-1,#carousel-thumbs-slider-2,#carousel-thumbs-slider-3,#carousel-thumbs-slider-4,#carousel-full-slider-1,#carousel-full-slider-2,#carousel-full-slider-3,#carousel-full-slider-4,#carousel-testinomials-1,#carousel-testinomials-2,#carousel-testinomials-3,#carousel-testinomials-4,#carousel-portfolio-1,#carousel-portfolio-2,#carousel-portfolio-3,#productslider-1,#productslider-2,#productslider-3,#productslider-4,#carousel-testinomials-5,#carousel-testinomials-6,#carousel-testinomials-7,#creative-slider-1").swipe({
  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');
  },
  allowPageScroll:"vertical"
});
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 7,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true
    });

});

$(document).ready(function () {
    $(".testimonial-carousel").addClass('owl-carousel').owlCarousel({
        items: 1,
        // nav: true,
        stagePadding: 0,
        loop: true,
        // margin: 10,
        autoplay: true,
        // autoplayTimeout: 3000,
        // autoplayHoverPause: true
    });

});

$apartmentItem = $(".apartment-item-small");
$positionImage = $(".positon__img")

$close = $(".popup__close");
$overlay = $(".popup-overlay");
$apartmentItem.on('click', function () {
    $('body').addClass('my-body-noscroll-class');
    $('.apartment-popup').fadeIn();
    $overlay.toggleClass("overlay");
})


$positionImage.on('click', function () {
    $('body').addClass('my-body-noscroll-class');
    $('.position-popup').fadeIn();
    $overlay.toggleClass("overlay");
})

$close.on('click', function () {
    $('.popup').fadeOut();
    $overlay.removeClass("overlay");
    $('body').removeClass('my-body-noscroll-class');
})