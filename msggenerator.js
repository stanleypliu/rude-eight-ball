// Todo: Need to stop users from clicking too quickly and disabling animation
// before header has fully loaded in. DONE
// Need to make page responsive.

$(function () {
  // Initial state of page
  // $(".topLeftAnswer").hide();
  // $(".bottomLeftAnswer").hide();
  // $(".topRightAnswer").hide();
  // $(".bottomRightAnswer").hide();
  $(".centreBanner").hide();
  $(".resetButton").hide();

  const rudeEightBallMessages = ["Go fuck yourself!",
  "Take a shower", "Screw you", "Your friends secretly hate you",
  "Love is on the way - but not in your case", "You\'ll always fall short",
  "You have a face only a blind man could love",
  "I don\'t answer to idiots", "Stop mouth-breathing!"];

  // const banners = [$(".topLeftAnswer"), $(".bottomLeftAnswer"),
  // $(".topRightAnswer"), $(".bottomRightAnswer")];

  var randomMessage = rudeEightBallMessages[Math.floor(Math.random() *
    rudeEightBallMessages.length)];
  // var randomBanner = banners[Math.floor(Math.random() * banners.length)];

  // Effects section: header slowly fades into view, followed by 8-ball and finally footer
  $(".headline").fadeIn(2000, function(){
    $(".eightballer").trigger("loading");
  });
  $(".leftBolt").fadeIn(2000);
  $(".rightBolt").fadeIn(2000);

  // Shaking function may need to be global because of later functions requiring
  // access
  $(".eightballer").on("loading", function() {
    $(this).fadeIn(3000, function() {
      $(this).trigger("8ball:ready");
    });
  });

  // 8-ball shakes in place until clicked. Looped using setInterval function
  $(".eightballer").on("8ball:ready", function() {
    var looping = setInterval(function() {
      $(".eightballer").effect("shake");
    }, 2000);
    // Upon clicking, stop loop.
    $(this).one("click", function() {
      clearInterval(looping);
      $(".headline h1").text("Brace yourself...");
      $(".headline h2").fadeOut(2000);
      // $(".leftBolt").fadeOut(2000);
      // $(".rightBolt").fadeOut(2000);
      setTimeout(function() {
        $(".eightballer").trigger("8ball:generating"); // Triggers random number generator
      }, 3000);
    });
  });

  // Start custom shake animation. Random number generated between 1 and length of 8-ball message object/array.
  // Allow one click per generation.
  $(".eightballer").on("8ball:generating", function(){

    $(this).effect("shake", {direction: "up", distance: 20, times: 8}, "slow");


    randomMessage = rudeEightBallMessages[Math.floor(Math.random() *
      rudeEightBallMessages.length)];
    // randomBanner = banners[Math.floor(Math.random() * banners.length)];


    // randomBanner.append("<div class=\"message\"><span>" + randomMessage +
    // "</span></div>");
    $(".centreBanner").append("<div class=\"message\">" + randomMessage +
    "</div>");

    setTimeout(function() {
      // Slide out right if on right-hand side, else slide out left
      // if (randomBanner.children("img").hasClass("banner")) {
      //   randomBanner.show();
      // }
      // else if (randomBanner.children("img").hasClass("banner2")) {
      //   randomBanner.show();
      // }
      $(".centreBanner").show();

    }, 3000);

    setTimeout(function(){
      $(".resetButton").show();
      $(".headline h1").text("THE WONDROUS 8-BALL HAS SPOKEN!")
    }, 5000);

  });

  // Reset button sets event back to ready state.
  $(".resetButton").click(function(){
    // randomBanner.hide();
    // randomBanner.children("div").remove();
    $(".centreBanner").hide();
    $(".centreBanner").children("div").remove();
    $(this).hide();
    $(".headline h1").text("CLICK THE MAGIC 8-BALL!")
    $(".headline h2").show();
    // $(".leftBolt").fadeIn(2000);
    // $(".rightBolt").fadeIn(2000);
    $(".eightballer").trigger("8ball:ready");
  })

});
