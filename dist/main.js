// cielscripts - reading list
// written by @findermao

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

// cs__readingList();

function cs__appendTable() {
  $("table#info tbody").prepend(
    "<tr><th>chapters</th><th>release</th><th>read</th></tr>"
  );
}

// cs__appendTable();

function cs__convertCharactersToIcons() {
  $(".characters").each(function () {
    try {
      const $charactersDiv = $(this);
      const characters = $charactersDiv
        .html()
        .toLowerCase()
        .replace(/ /g, "")
        .replace(/"/g, "")
        .replace(/<divclass=/g, ",")
        .replace(/><\/div>/g, "")
        .split(",")
        .filter((v) => v);
      console.log(characters);
      characters.forEach((c) => {
        $charactersDiv.closest("div.item").addClass(c);
      });
      $charactersDiv.html(
        characters.map((c) => '<div class="' + c + '"></div>').join("")
      );
    } catch {}
  });
}

// cs__convertCharactersToIcons();

function cs__translatedStatus() {
  // utility function that just sets the classes for us
  function setClassesTranslated($item, state) {
    if (state) {
      $item.addClass("tl");
    } else {
      $item.removeClass("tl");
    }
  }

  // for each card on the page,
  // *can be changed to a different selector if just checkbox isnt specific enough
  $(`.item`).each(function () {
    const $thisCard = $(this);
    const hasTranslation = !!$thisCard.has("a[href]").length;
    console.log(hasTranslation);
    setClassesTranslated($thisCard, hasTranslation);
  });
}

// cs__translatedStatus();

function cs__hashMasterlist() {
  // for each card on the page,
  // *can be changed to a different selector if just checkbox isnt specific enough
  $(`.item`).each(function () {
    const $thisCard = $(this);
    const $thisHeader = $thisCard.find("h2");
    const thisTitle = $thisHeader
      .text()
      .replace(/[^A-z]/g, "")
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

// cs__hashMasterlist();

// function qESEventChoose(e) {
//   $(".q-esevent-sidelist *").removeClass("active");

//   window.location.hash = e;

//   $(".q-esevent-main > *").hide(0, "swing", function () {
//     $("[onclick*='" + e + "']").addClass("active");
//     $("#" + e).show();
//     $(".q-esevent-main__wrapper").scrollTop(0);
//   });
// }
// $(document).ready(function () {
//   $(".q-esevent-sidelist h3").click(function () {
//     $(this).next("div").slideToggle("fast");
//   });

//   const hash = window.location.hash?.replace("#", "");
//   if (hash) {
//     qESEventChoose(hash);
//     $("[onclick*='" + hash + "']")
//       .closest("div")
//       .show();
//   }
// });
