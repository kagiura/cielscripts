// cielscripts - reading list
// github @kamishirorui/cielscripts

function cs__readingList() {
  // utility function that just sets the classes for us
  function setClassesRead($item, state) {
    if (state) {
      $item.addClass("read");
      $item.removeClass("unread");
    } else {
      $item.addClass("unread");
      $item.removeClass("read");
    }
  }
  // get reading list from localStorage first
  let readingList = JSON.parse(localStorage.getItem("cs__readingList"));

  // if one doesnt exist (aka. user opened page for the first time) make an empty list
  if (!readingList) {
    localStorage.setItem("cs__readingList", JSON.stringify({}));
    readingList = {};
  }

  // for each checkbox on the page,
  // *can be changed to a different selector if just checkbox isnt specific enough
  $(`[type="checkbox"]`).each(function () {
    // get the important related elements
    const $thisCheckbox = $(this);
    const $thisCard = $thisCheckbox.closest(".item");
    const $thisHeading = $thisCard.find("h2");

    // get the story name from the h2
    const storyName = $thisHeading.text();

    // check if story is read yet from our reading list
    const isRead = readingList[storyName] || false;

    // save the story's name to the checkbox's data
    $thisCheckbox.data("story-name", storyName);

    // set the initial state of the checkbox
    $thisCheckbox.attr("checked", isRead ? "checked" : false);

    // set the classes on the item
    setClassesRead($thisCard, isRead);

    // detect when someone clicks the checkbox
    $thisCheckbox.on("change", function (e) {
      // the newly updated state of that checkbox (true/false.)
      const newState = e.target.checked;

      // if false, delete that story from the list
      if (newState === false) {
        delete readingList[$(e.target).data("story-name")];
      }
      // else, add that story by setting its value = true
      else {
        readingList[$(e.target).data("story-name")] = newState;
      }

      // set classes on the checkbox's card
      const $parentCard = $(e.target).closest(".item");
      setClassesRead($parentCard, newState);

      // update our new reading list to the localStorage
      localStorage.setItem("cs__readingList", JSON.stringify(readingList));

      // DEBUG: log the list so we can see
      // console.log(readingList);
    });
  });
}

cs__readingList();

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
