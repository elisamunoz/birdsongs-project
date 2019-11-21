$(document).ready(function(){
    $("#search").click(searchByName);

    $("#surpriseMe").click(searchRandomly);
});


function searchByName(){

    // lo que escribe para buscar
    var name = $("#input-by-name").val(); 
    var url = `https://cors-anywhere.herokuapp.com/https://www.xeno-canto.org/api/2/recordings?query=gen:${name}`;

    getData(url, printTable);
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


function printTable(data={}) {
    const recordings = data.recordings || []


    console.log(data);
    console.log(recordings);
}