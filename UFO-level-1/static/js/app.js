// Import data from data.js
var tableData = data;

// Select the form 
var form = d3.select("#form");

// Select the button
var button = d3.select("#filter-button");

// Create event handlers for clicking the button & submitting the form
button.on("click", runEnter);
form.on("submit", runEnter);

// Function for running when entered
function runEnter() {

    // Keep the page from refreshing
    d3.event.preventDefault();

    // Input datetime
    var inputDatetime = d3.select("#datetime").property("value");

    if (inputDatetime)
    // Print the input date in the console
    console.log("Date: ", inputDatetime);


    // Filter the table for the selected date
    var filteredData = tableData.filter(element => element.datetime === inputDatetime);

    // Print the sightings for the date in the console
    console.log("Sightings: ", filteredData);

    // Select the tbody
    var tbody = d3.select("tbody");

    // Remove previous filtered data from the table
    tbody.html("");

    // Loop through the tbody
    filteredData.forEach(function(sightings) {
        console.log(sightings);
        var row = tbody.append("tr");
    
        Object.entries(sightings).forEach(function([key, value]) {
            console.log(key, value);
    
            var cell = row.append("td");
            cell.text(value);
        });
    });


}

