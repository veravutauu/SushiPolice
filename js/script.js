var allClasses = [
  '.dialog-1 .dialog',
  '.dialog-1 .character',
  '.dialog-2 .dialog',
  '.dialog-2 .character',
];

var ANIMATED_DURATION = 700;
var delays = [
  ANIMATED_DURATION,
  0,
  ANIMATED_DURATION*3,
  ANIMATED_DURATION*2,
]

$(window).scroll(function () {

  var firstSection = $("#current-situation").offset().top;

  var windowScrollTop = $(window).scrollTop();

  // Trigger dialog animation
  var topDivHeight = $(".dialog-container").offset().top;
  var viewPortSize = $(window).height();

  var triggerHeight = (topDivHeight - viewPortSize);

  if (windowScrollTop >= triggerHeight) {

    allClasses.forEach(function(item, i) {
      $(item).css('opacity','0').delay(delays[i]).animate({ 'opacity': '1' })
    })
    $(this).off('scroll');
  }

  // Hide scroll-top-button if firstSection is shown
  if (windowScrollTop >= (firstSection - viewPortSize)) {
    $('#scroll-top-button').css({ opacity: "1.0 "});
  } else {
    $('#scroll-top-button').css({ opacity: "0.0 "});
  }
});


var CHARACTER_ANIMATION_DURATION = 500;
// On web load
$(function() {

  $('#scroll-down-section-1 a').on('click', function(e) {
    e.preventDefault();
    console.log('click!');
    console.log($(this).attr('href'));
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
  });

  $("#scroll-top-button").on('click', function() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
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

  var $intro_text = $('#intro-text h1');

  //get a list of letters from the welcome text
  var $wordList = $intro_text.text().split("");
  //clear the welcome text msg
  $intro_text.text("");
  //loop through the letters in the $wordList array
  $.each($wordList, function(idx, elem) {
    //create a span for the letter and set opacity to 0
    var newEL = $("<span/>").text(elem).css({
      opacity: 0
    });
    //append it to the welcome message
    newEL.appendTo($intro_text);
    //set the delay on the animation for this element
    newEL.delay(idx * 100);
    //animate the opacity back to full 1
    newEL.animate({
      opacity: 1
    }, 1000);
  });
});
