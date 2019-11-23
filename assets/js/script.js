// Call  functions
$(document).ready(function(){
    $("#search-by-genus").click(searchByGenus);
    $("#surpriseMe").click(searchRandomly);
    initMap();
});

/* --------------------- */
/* --- Get Info -------- */
/* --------------------- */
function searchByGenus() {
   
    var genus = $("#input-by-name").val();
    var url = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=gen:${genus}`;

    getApiData(url, renderTable)
}

function searchRandomly(){
    console.log("TODO: add Surprise me functionality")
}

/* --------------------- */
/* --- Render Table ---- */
/* --------------------- */
function renderTable(birdInfo = {}) {
    const birdsList = birdInfo.recordings;

    var tableBody = document.getElementById("tableBody");
    var totalRows = [];

    birdsList.forEach(function(birdData){
        totalRows.push(renderTableRow(birdData));
    });

    tableBody.innerHTML = totalRows;
}

function renderTableRow(birdInfo = {}){
    var gen = birdInfo.gen;

    return `
    <tr>
    <td class="bold-text">${birdInfo.id}</td>
    <td class="d-none d-lg-block"><i>${birdInfo.gen} ${birdInfo.sp}</i></td>
    <td>${birdInfo.length}</td>
    <td>${birdInfo.cnt}</td>
    <td>${birdInfo.type}</td>
  </tr>
    `

}


/* -------------------- */
/* --- Helper Funcs --- */
/* -------------------- */
function getApiData(
    url, // String
    cb   // function
) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));       
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

/* -------------------- */
/* --- Render Map  --- */
/* -------------------- */
function initMap() {
    setMapMarker({lat: -38.6417, lng: -71.7017})
}

function setMapMarker(position = {}) {
    // The map, centered at position
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 4, center: position}
    );
    // The marker, positioned at Uluru
    new google.maps.Marker({
        position: position,
        map: map
    });
}