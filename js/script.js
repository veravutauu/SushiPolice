var allClasses = [
  '.dialog-1 .dialog',
  '.dialog-1 .character',
  '.dialog-2 .dialog',
  '.dialog-2 .character',
];

var didShowDialogAnimation = false;

var ANIMATED_DURATION = 700;
var delays = [
  ANIMATED_DURATION,
  0,
  ANIMATED_DURATION*3,
  ANIMATED_DURATION*2,
]

var shouldNavbarTransparent = true;

$(window).scroll(function () {

  var firstSection = $("#current-situation").offset().top;

  var windowScrollTop = $(window).scrollTop();

  // Trigger dialog animation
  var topDivHeight = $(".dialog-container").offset().top;
  var viewPortSize = $(window).height();

  var triggerHeight = (topDivHeight - viewPortSize);

  if (!didShowDialogAnimation && windowScrollTop >= triggerHeight) {

    didShowDialogAnimation = true

    allClasses.forEach(function(item, i) {
      $(item).css('opacity','0').delay(delays[i]).animate({ 'opacity': '1' })
    })
  }

  if (windowScrollTop > (firstSection - viewPortSize)) {
    shouldNavbarTransparent = false
    $('#my-navbar').css({ 'background-color': 'rgba(0,0,0,0.5)' });
    $('#nav-brand').show()
  } else {
    shouldNavbarTransparent = true
    $('#my-navbar').css({ 'background-color': 'transparent' });
    $('#nav-brand').hide()
  }
  // Hide scroll-top-button if firstSection is shown
  if (windowScrollTop > 20) {
    $('#scroll-top-button').css({ opacity: "1.0 "});
  } else {
    $('#scroll-top-button').css({ opacity: "0.0 "});
  }
});


var isNavBarShowing = false;
var CHARACTER_ANIMATION_DURATION = 500;
// On web load
$(function() {

  $(window).resize(function() {
    isNavBarShowing = $(window).width() >= 768;
  });

  $('#nav-brand').hide()

  $('#navbarNavAltMarkup').on('show.bs.collapse', function() {    
    $('#my-navbar').css({ 'background-color': 'rgba(0,0,0,0.5)' });
  });

  $('#navbarNavAltMarkup').on('hidden.bs.collapse', function() {
    if (shouldNavbarTransparent) {
      $('#my-navbar').css({ 'background-color': 'transparent' });
    }
  })

  $('#scroll-down-section-1 a').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: ($($(this).attr('href')).offset().top - (isNavBarShowing ? 100 : 40)) }, 500, 'linear');
  });

  $("#scroll-top-button").on('click', function(e) {
    e.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 'slow');
  });

  $("#my-navbar .navbar-nav a").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - (isNavBarShowing ? 100 : 70)}, 600, 'linear');
  });

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
});
