function cs__hashMasterlist() {
  $(`.item`).each(function () {
    const $thisCard = $(this);
    const $thisHeader = $thisCard.find("h2");
    const thisTitle = $thisHeader
      .text()
      .replace(/[^A-z0-9]/g, "")
      .toLocaleLowerCase();
    $thisCard.attr("data-story-name", thisTitle);
  });

  const hash = window.location.hash.replace("#", "").toLocaleLowerCase();
  if (hash) {
    const $thisCard = $(".item[data-story-name='" + hash + "']")
      .first()
      .clone()
      .attr("style", null);
    console.log($thisCard);
    $("body").prepend(`<div class="cs__hash">
    <p>Scroll down to see more stories!</p>
    </div>`);
    $(".cs__hash").append($thisCard);
    $(".cs__hash").append(`<a href="#">Hide this section</a>`);
    $(".cs__hash a").click(function () {
      $(".cs__hash").slideToggle("slow");
    });
  }
}

cs__hashMasterlist();
