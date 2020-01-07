// Call  functions
$(document).ready(function() {
  $("#search-bird").click(searchBird);
  $("#surpriseMe").click(searchRandomly);
  initMap();
  parallaxContent();

  $(window).scroll(solidNavBar);
});

/* ----------------------------- */
/* --- Get Info from API-------- */
/* ----------------------------- */
const apiUrl = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=`;

function searchBird() {
  const country = $("#search-by-country").val();
  const genus = $("#input-by-name").val();

  const params = {
    country: country,
    genus: genus
  };

  searchBirdCall(params);
}

function searchBirdCall(params = {}) {
  const country = params.country;
  const genus = params.genus;

  var text = "";
  var textCountry = `Birds from ${country}`;
  var textGenus = `Birds with genus ${genus}`;
  var textComplete = `Birds from ${country} with genus ${genus}`;
  var queryCountry = "";
  var queryGenus = "";

  if (country && genus) {
    text = textComplete;
    queryCountry = `cnt:${country}`;
    queryGenus = `+gen:${genus}`;
  } else if (country) {
    queryCountry = `cnt:${country}`;
    text = textCountry;

    // text will be overwritten, genus has priority over country
  } else if (genus) {
    queryGenus = `gen:${genus}`;
    text = textGenus;
  } else {
    alert("Error, to do a search, you need to complete any of the fields.");
  }

  const url = `${apiUrl}${queryCountry}${queryGenus}`;

  getApiData(url, renderTable);
  renderTitle(text);
}

function searchRandomly() {
  var birdList = [415790, 60001, 102382, 323716, 495866];
  // hidde content

  // get random birdId from array
  var birdId = birdList[Math.floor(Math.random() * birdList.length)];

  // render info
  renderFileInfo(birdId);
}

/* --------------------- */
/* --- Render Table ---- */
/* --------------------- */
function renderTitle(text) {
  const birdTitle = document.getElementById("title-search-result"); // renders search result title

  birdTitle.innerHTML = text;
}

function renderTable(birdInfo = {}) {
  const birdsList = birdInfo.recordings;

  var table = $("#search-result-table");
  var tableBody = document.getElementById("tableBody");
  var totalRows = [];

  birdsList.forEach(function(birdData) {
    totalRows.push(renderTableRow(birdData));
  });

  // Data Table call
  table.DataTable().destroy(); // destroy previous search to print table again
  tableBody.innerHTML = totalRows.join("");
  table.DataTable().draw();

  //adds smoothie scroll to search result section
  $(".search-result").fadeIn(1000);
  smoothieScrollTo("search-result");
}

function renderTableRow(birdInfo = {}) {
  return `
    <tr>
    <td onClick="renderFileInfo(${birdInfo.id});" class="bold-text bird-id">More</td>
    <td><i>${birdInfo.gen} ${birdInfo.sp}</i></td>
    <td>${birdInfo.en}</td>
    <td>${birdInfo.length} min</td>
    <td>${birdInfo.cnt}</td>
    <td>${birdInfo.type}</td>
  </tr>
    `;
}

//
function renderFileInfo(birdId) {
  const url = `${apiUrl}nr:${birdId}`;
  var urlIFrame = `https://www.xeno-canto.org/${birdId}/embed?simple=1`;
  var reproductor = $("#reproductor");

  reproductor.attr("src", urlIFrame);

  getApiData(url, birdFileSection);

  // add smothie scroll to Bird File section
  $(".bird-file").fadeIn(1000);
  smoothieScrollTo("bird-file");
}

function birdFileSection(response) {
  const birdData = response.recordings[0];
  var fileBody = document.getElementById("fileBody");
  var fileTitle = document.getElementById("fileTitle");
  var fileSubTitle = document.getElementById("fileSubTitle");

  fileBody.innerHTML = renderBirdFile(birdData); // renders
  fileTitle.innerText = birdData.en; // renders title
  fileSubTitle.innerText = birdData.gen + " " + birdData.sp; // renders sub title

  // renders map and no location image
  if (!birdData.lat || !birdData.lng) {
    $(".location-map").hide();
    $(".no-location-image").fadeIn(1000);
  } else {
    $(".no-location-image").hide();
    $(".location-map").fadeIn(1000);

    setMapMarker({
      lat: parseInt(birdData.lat),
      lng: parseInt(birdData.lng)
    });
  }
}

function renderBirdFile(birdInfo) {
  return `
    ${renderBirdFileRow("Register", birdInfo.id)}
    ${renderBirdFileRow("Recorder", birdInfo.rec)}
    ${renderBirdFileRow("Length", birdInfo.length)}
    ${renderBirdFileRow("Localization", birdInfo.loc)}
    ${renderBirdFileRow("Country", birdInfo.cnt)}
    ${renderBirdFileRow("Uploaded", birdInfo.date)}
    ${renderBirdFileRow("Time", birdInfo.hrs)}
    ${renderBirdFileRow("Latitude", birdInfo.lat)}
    ${renderBirdFileRow("Longitude", birdInfo.lng)}
    ${renderBirdFileRow("Altitude", birdInfo.alt)}
    ${renderBirdFileRow("Type", birdInfo.type)}
    `;
}

/* -------------------- */
/* --- Helper Funcs --- */
/* -------------------- */
function getApiData(url, cb) {
  //url = string
  //cb = function
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));

      xhr.onerror = function(e) {
        alert("Error Status: " + e.target.status);
      };
    }
  };

  xhr.open("GET", url);
  xhr.send();
}

/* -------------------- */
/* --- Render Map  ---- */
/* -------------------- */
function initMap() {
  setMapMarker({ lat: -38.6417, lng: -71.7017 });
}

function setMapMarker(position = {}) {
  // The map, centered at position
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: position
  });
  // The marker, positioned at Uluru
  new google.maps.Marker({
    position: position,
    map: map
  });
}
