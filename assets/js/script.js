$(document).ready(function(){
    $("#search").click(searchByName);

    $("#surpriseMe").click(searchRandomly);

    $('#result-table').DataTable(); //Search table

    $('#file-result-table').DataTable(); // 

});


function searchByName(){
    console.log("TODO: add Search functionality")
}

function searchRandomly(){
    console.log("TODO: add Surprise me functionality")
}

