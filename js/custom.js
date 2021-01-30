$(document).ready(function() {


  $(".owl-carousel").owlCarousel({
      items: 7,
      loop: true,
      // margin: 10,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
          0: {
              items: 2,
          },
          480: {
              items: 3,
          },
          768: {
              items: 4,
          },
          992: {
              items: 5
          },
          1366: {
              items: 7,
          }
      }
  });


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

  $apartmentItem = $(".apartment-item-small");
  $positionImage = $(".positon__img")

  $close = $(".popup__close");
  $overlay = $(".popup-overlay");
  $apartmentItem.on('click', function() {
      $('body').addClass('my-body-noscroll-class');
      $('.apartment-popup').fadeIn();
      $overlay.toggleClass("overlay");
  })


  $positionImage.on('click', function() {
      $('body').addClass('my-body-noscroll-class');
      $('.position-popup').fadeIn();
      $overlay.toggleClass("overlay");
  })

  $close.on('click', function() {
      $('.popup').fadeOut();
      $overlay.removeClass("overlay");
      $('body').removeClass('my-body-noscroll-class');
  })
});