var didShowDialogAnimation = false;

var ANIMAT_DURATION_EACH_SECTION = 800;

var ANIMATED_DURATION = 700;
var delays = [
  ANIMATED_DURATION,
  0,
  ANIMATED_DURATION*3,
  ANIMATED_DURATION*2,
]

var shouldNavbarTransparent = true;

function updateOnScroll() {

  var firstSection = $("#current-situation").offset().top;

  var bottomOfIntroHeader = $(".intro-header").offset();

  var windowScrollTop = $(window).scrollTop();

  // Trigger dialog animation
  var topDivHeight = $(".dialog-container").offset().top;
  var viewPortSize = $(window).height();

  var triggerHeight = (topDivHeight - viewPortSize);

  if (!didShowDialogAnimation && windowScrollTop >= triggerHeight) {

    didShowDialogAnimation = true

    var allClasses = [
      '.dialog-1 .dialog',
      '.dialog-1 .character',
      '.dialog-2 .dialog',
      '.dialog-2 .character',
    ];

    allClasses.forEach(function(item, i) {
      $(item).css('opacity','0').delay(delays[i]).animate({ 'opacity': '1' });
    });
  }

  if (windowScrollTop > (viewPortSize - 80)) {
    if (isNavBarShowing) {

      shouldNavbarTransparent = false

      $('#my-navbar').css({ 'background-color': '#2b2b2b' });
      $('#my-navbar').show()

      $('#nav-brand').show()
      if($('#my-navbar .navbar-collapse ul').hasClass('navbar-ul-margin-auto')) {
        $('#my-navbar .navbar-collapse ul').removeClass('navbar-ul-margin-auto')
      }
    } else {
      $('#my-navbar').hide()
    }
  } else {
    shouldNavbarTransparent = true
    // $('#my-navbar').css({ 'background-color': 'transparent' });
    $('#my-navbar').hide()
    $('#nav-brand').hide()
    if(!$('#my-navbar .navbar-collapse ul').hasClass('navbar-ul-margin-auto')) {
      $('#my-navbar .navbar-collapse ul').addClass('navbar-ul-margin-auto')
    }
  }
  // Hide scroll-top-button if firstSection is shown
  if (windowScrollTop > 20) {
    $('#scroll-top-button').css({ opacity: "1.0 "});
  } else {
    $('#scroll-top-button').css({ opacity: "0.0 "});
  }

  let $sections = $(".section")
  $.each($sections, function(indx, _el) {
    var el = $(_el)
    var topDivHeight = el.offset().top;
    var viewPortSize = $(window).height();

    var windowScrollTop = $(window).scrollTop();
    if (windowScrollTop > topDivHeight - viewPortSize + 44 && !el.hasClass('section-faded-in')) {
      el.animate({ opacity: "1.0" }, ANIMAT_DURATION_EACH_SECTION)
      el.addClass('section-faded-in')
    }
  })
}

$(window).scroll(updateOnScroll);


var isNavBarShowing = false;
var CHARACTER_ANIMATION_DURATION = 500;




// On web load
$(function() {

  setupModal()

  grid_img_columns = $('.grid-img-column');

  // Wrap every letter in a span
$('.ml12').each(function(){
  $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

$('.ml12').css({ 'opacity': '1' })
anime.timeline({loop: false})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: function(el, i) {
      return 500 + 30 * i;
    },
    complete: function() {
      $('.opening').fadeOut()
      animateIntro()
    }
  });

  $.each($('.section'), function(index, el) {
    $(el).css({ opacity: "0.0" })
  })

  isNavBarShowing = $(window).width() >= 800;

  $(window).resize(updateOnResize);

  updateOnResize()
  updateOnScroll()

  $('#navbarNavAltMarkup').on('show.bs.collapse', function() {

    $('#my-navbar').css({ 'background-color': 'rgba(0,0,0,1)' });
  });

  $('#navbarNavAltMarkup').on('hidden.bs.collapse', function() {
    if (shouldNavbarTransparent) {
      $('#my-navbar').css({ 'background-color': 'transparent' });
    }
  })

  $('#scroll-down-section-1 a').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: ($($(this).attr('href')).offset().top - (isNavBarShowing ? 100 : 120)) }, 500, 'linear');
  });

  $("#scroll-top-button").on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  });

  $("#my-navbar .navbar-nav a").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - (isNavBarShowing ? 100 : 70)}, 600, 'linear');
  });


});

var isShowingTwoColumns = true

function updateOnResize() {
  isNavBarShowing = $(window).width() >= 800;
    if (!isNavBarShowing || shouldNavbarTransparent) {
      $('#my-navbar').hide();
    } else {
      $('#my-navbar').show();
    }

    if (isNavBarShowing) {
      grid_img_four_columns();
    } else {
      grid_img_two_columns();
    }
}

function animateIntro() {
  // Animate Intro
  $(".clip-1 .clip-image-wrapper").animate({
    left: "+=32px",
    opacity: "1.0",
  }, CHARACTER_ANIMATION_DURATION);

  $(".clip-2 .clip-image-wrapper").delay(CHARACTER_ANIMATION_DURATION).animate({
    left: "+=32px",
    opacity: "1.0",
  }, CHARACTER_ANIMATION_DURATION);;

  $(".clip-3 .clip-image-wrapper").delay(CHARACTER_ANIMATION_DURATION*2).animate({
    bottom: "+=32px",
    opacity: "1.0",
  }, CHARACTER_ANIMATION_DURATION);

  $("#logo").delay(CHARACTER_ANIMATION_DURATION*3).animate({
    opacity: "1.0",
  }, CHARACTER_ANIMATION_DURATION);




  // Fade in Letter-by-letter

  var DELAY_BEFORE_SHOWING = 50;
  var ANIMATE_TIME_OF_EACH_CHARACTER = 1000;
  var DELAY_BETWEEN_EACH_CHARACTER = 100;

  var $intro_text = $('#intro-text h1');

  //get a list of letters from the welcome text
  var $wordList = $intro_text.text().split("");
  //clear the welcome text msg
  $intro_text.text("");
  $('#intro-text').empty();
  //loop through the letters in the $wordList array
  $.each($wordList, function(idx, elem) {
    //create a span for the letter and set opacity to 0
    var newEL = $("<span/>").text(elem).css({
      opacity: 0
    });
    //append it to the welcome message
    newEL.appendTo($('#intro-text'));
    //set the delay on the animation for this element
    newEL.delay(DELAY_BEFORE_SHOWING + idx * DELAY_BETWEEN_EACH_CHARACTER);
    //animate the opacity back to full 1
    newEL.animate({
      opacity: 1
    }, ANIMATE_TIME_OF_EACH_CHARACTER);
  });
}

var grid_img_columns = null

// Two images side by side
function grid_img_two_columns() {
  var elements = grid_img_columns
  for (i = 0; i < elements.length; i++) {
      elements[i].style.msFlex = "50%";  // IE10
      elements[i].style.flex = "50%";
  }
}

// Four images side by side
function grid_img_four_columns() {
  var elements = grid_img_columns
  for (i = 0; i < elements.length; i++) {
      elements[i].style.msFlex = "25%";  // IE10
      elements[i].style.flex = "25%";
  }
}

function setupModal() {
    // Get the modal
  var modal = document.getElementById('myModal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var imgs = $('.my-img')
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  $.each(imgs, function(idx, img) {
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }
  })

  // Get the <span> element that closes the modal
  var span = $('.my-modal .close')[0]

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
}

window.addEventListener('scroll', () => {
  let targets = Array.from(document.getElementsByClassName('before'))
  targets.forEach(el => {
    const elPos = el.offsetTop
    const scroll = window.scrollY
    const height = window.innerHeight * 0.1
    scroll > elPos + height ? el.classList.remove('before') : null
  })
})
