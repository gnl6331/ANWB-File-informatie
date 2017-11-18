$(document).on('click', '.file-panel-heading', function () {
      $(this).siblings(".file-panel-content-container").slideDown();
      $(this).addClass("panel-visible");
});

$(document).on('click', '.panel-visible', function () {
      $(this).siblings(".file-panel-content-container").slideUp();
      $(this).removeClass("panel-visible");
});
