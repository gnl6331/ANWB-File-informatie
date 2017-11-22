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

$(document).on("click", "#traffic-flash-information", function () {
      $(".information-active").removeClass("information-active").slideUp("slow");
      getSpeedControllInformation();
      $("#flash-results-output").slideDown("slow");
      $("#flash-results-output").addClass("information-active");
});

$(document).on("click", "#traffic-jam-information", function () {
      $(".information-active").removeClass("information-active").slideUp("slow");
      getTrafficJamInformation();
      $("#jam-results-output").slideDown("slow");
      $("#jam-results-output").addClass("information-active");
});

// jam-results-output
// traffic-jam-information
// traffic-flash-information
// flash-results-output
