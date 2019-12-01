// Call  functions
$(document).ready(function() {
  $("#search-bird").click(searchBird);
  $("#surpriseMe").click(searchRandomly);
  initMap();
});

/* --------------------- */
/* --- Get Info -------- */
/* --------------------- */
function searchBird() {
  var country = $("#search-by-country").val();
  var genus = $("#input-by-name").val();
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

  var url = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=${queryCountry}${queryGenus}`;

  getApiData(url, renderTable);
  renderTitle(text);
}

function searchRandomly() {
  console.log("TODO: add Surprise me functionality");
}

/* --------------------- */
/* --- Render Table ---- */
/* --------------------- */
function renderTitle(text) {
  const birdTitle = document.getElementById("title-search-result");

  birdTitle.innerHTML = text;
}

function renderTable(birdInfo = {}) {
  const birdsList = birdInfo.recordings;

  var tableBody = document.getElementById("tableBody");
  var totalRows = [];

  birdsList.forEach(function(birdData) {
    totalRows.push(renderTableRow(birdData));
  });

  tableBody.innerHTML = totalRows.join("");

  //adds smoothie scroll to search result section
  $(".search-result").fadeIn(1000);
  smoothieScrollTo("search-result");
}

function renderTableRow(birdInfo = {}) {
  return `
    <tr>
    <td onClick="renderFileInfo(${birdInfo.id});" class="bold-text bird-id">More Information</td>
    <td><i>${birdInfo.gen} ${birdInfo.sp}</i></td>
    <td>${birdInfo.en}</td>
    <td>${birdInfo.length} min</td>
    <td>${birdInfo.cnt}</td>
    <td>${birdInfo.type}</td>
  </tr>
    `;
}

function renderFileInfo(birdId) {
  var url = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=nr:${birdId}`;
  var urlIFrame = `https://www.xeno-canto.org/${birdId}/embed?simple=1`;
  var fileBody = document.getElementById("fileBody");
  var fileTitle = document.getElementById("fileTitle");
  var fileSubTitle = document.getElementById("fileSubTitle");
  var reproductor = $("#reproductor");

  reproductor.attr("src", urlIFrame);

  getApiData(url, birdFileSection);

  // add smothie scroll to Bird File section
  $(".bird-file").fadeIn(1000);
  smoothieScrollTo("bird-file");
}

function birdFileSection(response) {
  const birdData = response.recordings[0];
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
    <tr>
        <td class="bold-text">Register:</td>
        <td>${birdInfo.id}</td>
    </tr>
                       
    <tr>
        <td class="bold-text">Recorder:</td>
        <td>${birdInfo.rec}</td>
    </tr>
        
    <tr>
        <td class="bold-text">Length:</td>
        <td>${birdInfo.length} min</td>
    </tr>

    <tr>
        <td class="bold-text">Localization:</td>
        <td>${birdInfo.loc}</td>
    </tr>

    <tr>
        <td class="bold-text">Country:</td>
        <td>${birdInfo.cnt}</td>
    </tr>
          
    <tr>
        <td class="bold-text">Uploaded:</td>
        <td>${birdInfo.date}</td>
    </tr>
          
    <tr>
        <td class="bold-text">Time:</td>
        <td>${birdInfo.time} hrs</td>
    </tr>
          
    <tr>
        <td class="bold-text">Latitude:</td>
        <td>${birdInfo.lat}</td>
    </tr>
          
    <tr>
        <td class="bold-text">Longitude:</td>
        <td>${birdInfo.lng}</td>
    </tr>
          
    <tr>
        <td class="bold-text">Altitude:</td>
        <td>${birdInfo.alt} m</td>
    </tr>
          
    <tr>
        <td class="bold-text">Type:</td>
        <td>${birdInfo.type}</td>
    </tr>
    `;
}

/* -------------------- */
/* --- Helper Funcs --- */
/* -------------------- */
function getApiData(
  url, // String
  cb // function
) {
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
/* --- Render Map  --- */
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

function mapNotFound(img) {
  var errorImg = document.getElementById("map");
}

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
