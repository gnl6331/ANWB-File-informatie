$(document).on('click', '.file-panel-heading', function () {
      $(this).siblings(".file-panel-content-container").slideDown();
      $(this).addClass("panel-visible");
});

$(document).on('click', '.panel-visible', function () {
      $(this).siblings(".file-panel-content-container").slideUp();
      $(this).removeClass("panel-visible");
});

$(document).on("click", ".nav-item", function (event) {
      event.preventDefault();
      $(this).siblings("a").removeClass("active");
      $(this).addClass("active");

});

$(document).on("click", "#toggle-nav", function (event) {
      event.preventDefault();
      $(".nav-resp-mobile").slideToggle();
      /*
      $(".nav-item").click(function () {
        $(".nav-resp-mobile").slideToggle();
      });
      */
});

$(document).on("click", "#traffic-flash-information", function () {
      $(".information-active").removeClass("information-active").fadeOut(1);
      getSpeedControllInformation();
      $("#flash-results-output").fadeIn(705);
      $("#flash-results-output").addClass("information-active");
});

$(document).on("click", "#traffic-jam-information", function () {
      $(".information-active").removeClass("information-active").fadeOut(1);
      getTrafficJamInformation();
      $("#jam-results-output").fadeIn(705);
      $("#jam-results-output").addClass("information-active");
});

$(document).on("click", "#traffic-roadworks-information", function () {
      $(".information-active").removeClass("information-active").fadeOut(1);
      getRoadWorkInformation();
      $("#roadworks-results-output").fadeIn(705);
      $("#roadworks-results-output").addClass("information-active");
});

// jam-results-output
// traffic-jam-information
// traffic-flash-information
// flash-results-output
