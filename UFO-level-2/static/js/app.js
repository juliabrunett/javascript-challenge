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

    // Select the input datetime
    var inputDatetime = d3.select("#datetime").property("value");

    // Print the input date in the console
    console.log("Date: ", inputDatetime);
    // Add chosen input date into span tag (on page)
    d3.select("label>span").text(inputDatetime);

    // Filter the table for the selected date
    var filteredData = tableData.filter(element => element.datetime === inputDatetime);

    // Print the sightings for the date in the console
    console.log("Sightings: ", filteredData);

    // Select the tbody in the html table
    var tbody = d3.select("tbody");

    // Remove previous filtered data from the table
    tbody.html("");

    // Loop through the filtered data array of objects
    filteredData.forEach(sightings => {

        // Print each object in the console
        console.log(sightings);
        // Append a row to the tbody
        var row = tbody.append("tr");
    

        Object.entries(sightings).forEach(([key, value]) => {
            console.log(key, value);
    
            var data_cell = row.append("td").text(value);
        });
    });
};

var cityDropdown = d3.select("#city-dropdown");
var stateDropdown = d3.select("#stateDropdown");
var countryDropdown = d3.select("#countryDropdown");
var shapeDropdown = d3.select("#shapeDropdown");

var cityName = tableData.map(sighting => sighting.city)
console.log(cityName);

cityName.forEach(city => {
    //console.log(city);
    var item = cityDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(city);
});

var stateName = tableData.map(sighting => sighting.state)
console.log(stateName);

stateName.forEach(state => {
    //console.log(state);
    var item = stateDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(state);
});

var countryName = tableData.map(sighting => sighting.country)
console.log(countryName);

cityName.forEach(country => {
    //console.log(country);
    var item = countryDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(country);
});

var shapeName = tableData.map(sighting => sighting.shape)
console.log(shapeName);

shapeName.forEach(shape => {
    //console.log(city);
    var item = shapeDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(shape);
});
