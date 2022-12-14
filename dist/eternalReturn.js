function cs__popups() {
  if (window.cs__popupsLoaded === true) return;
  window.cs__popupsLoaded = true;

  const $popupGrayout = $("<div class='cs__popup-grayout'></div>");
  $("body").append($popupGrayout);

  $("[popup]").each(function () {
    const $thisPopupButton = $(this);
    const popupID = $thisPopupButton.attr("popup");
    const $thisPopup = $(
      `[popup-id=${popupID.replace("[", '"').replace("]", '"')}]`
    );

    $thisPopup.prepend(
      `<div class="cs__popup-titlebar"><span class="cs__popup-title">${
        $thisPopup.attr("popup-title") || "Popup"
      }</span><span class="cs__popup-close">X</span></div>`
    );
    $thisPopup.find(".cs__popup-close").click(function () {
      $popupGrayout.fadeOut("fast");
      $thisPopup.fadeOut("fast");
    });

    $thisPopupButton.click(function () {
      $popupGrayout.fadeIn("fast");
      console.log(popupID, "clicked", $popupGrayout);
      $thisPopup.fadeIn("fast");
      $($popupGrayout).click(function () {
        $popupGrayout.fadeOut("fast");
        $thisPopup.fadeOut("fast");
      });
    });
  });
}

$(function () {
  cs__popups();
});
