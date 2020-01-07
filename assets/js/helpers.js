function renderBirdFileRow(title, value = "--") {
  if (!title) {
    return "";
  }

  return `
      <tr>
          <td class="bold-text">${title}:</td>
          <td>${value}</td>
      </tr>
    `;
}

// Smothie scroll to Id
function smoothieScrollTo(id) {
  var target = $(`#${id}`);

  if (target.length) {
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: target.offset().top
        },
        1000
      );
  }
}

// checks if window is scrolled more than 500px, adds/removes solid class
function solidNavBar() {
  if ($(this).scrollTop() > 500) {
    $(".nav").addClass("solid");
  } else {
    $(".nav").removeClass("solid");
  }
}

// Parallax effect

function parallaxContent() {
  const parllax = document.querySelector(".parallax");

  window.addEventListener("scroll", function() {
    let offset = window.pageYOffset;
    parllax.style.backgroundPositionY = offset * 0.5 + "px";
  });
}
