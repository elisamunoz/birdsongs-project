// On click functions

$(document).ready(function(){
    $("#search-country").click(searchByCountry);
    $("#search").click(searchByName);
    $("#surpriseMe").click(searchRandomly);
});

function searchByCountry(){
    console.log("TODO: add search by country")
}

function searchByName(){
    // what the user write to search
    var genus = $("#input-by-name").val(); 
    var url = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=gen:${genus}`;

    getData(url, renderTable);
}

function searchRandomly(){
    console.log("TODO: add Surprise me functionality")
}

function getData(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));       
        }
    };

    xhr.open("GET", url);
    xhr.send();
}

// Render functions


function renderTable(data={}) {
    const recordings = data.recordings || []

    var tableRows = [];
    var tableBody = document.getElementById("tableBody");

    recordings.forEach(function(birdData) {
        tableRows.push(renderTableRow(birdData));
    });

    tableBody.innerHTML = tableRows;
}

// Return functions

function renderTableRow(birdInfo={}) {
    const genus = birdInfo.gen;

    return `
    
    <tr>
        <td class="bold-text">${birdInfo.id}</td>
        <td><i>${birdInfo.gen} ${birdInfo.sp}</i></td>
        <td>${birdInfo.length}</td>
        <td class="d-none d-lg-block">${birdInfo.cnt}</td>
        <td>${birdInfo.type}</td>
    </tr>
  `;
}