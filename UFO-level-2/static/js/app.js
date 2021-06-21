// Import data from data.js
var tableData = data;

// Select the form 
var form = d3.select("#form");

// Select the button
var date_button = d3.select("#filter-button");

// Create event handlers for clicking the button & submitting the form
date_button.on("click", runEnter);
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

// Select each dropdown section
var cityDropdown = d3.select("#cityDropdown");
var stateDropdown = d3.select("#stateDropdown");
var countryDropdown = d3.select("#countryDropdown");
var shapeDropdown = d3.select("#shapeDropdown");

// Reference each button
var cityButton = d3.select(".btn-city");
var stateButton = d3.select(".btn-state");
var countryButton = d3.select(".btn-country");
var shapeButton = d3.select(".btn-shape");

// Select each dropdown attribute
var citySelect = d3.select("#cityDropdown");
var stateSelect = d3.select("#stateDropdown>a");
var countrySelect = d3.select("#countryDropdown>a");
var shapeSelect = d3.select("#shapeDropdown>a");

d3.selectAll("option").on("click", function() {
    var selCity = d3.select(this);
    console.log(selCity);
    var cityText = selCity.text();
    console.log(cityText);
})
// On click -- run the function
// cityButton.on("click", function() {
//     console.log(this);
//     var selCityButton = d3.select(this);
// });

stateButton.on("click", function() {
    console.log(this)
});
countryButton.on("click", function() {
    console.log(this)
});
shapeButton.on("click", function() {
    console.log(this)
});

// DROPDOWN MENUS
// Create a city name array
var cityName = tableData.map(sighting => sighting.city)
//console.log(cityName);

// For each city, append the name to a dropdown attribute
cityName.forEach(city => {
    //console.log(city);
    var item = cityDropdown.append("option");
    item.attr("id", city);
    item.attr("class", "dropdown-item");
    item.text(city);
});

// Create a state name array
var stateName = tableData.map(sighting => sighting.state)
//console.log(stateName);

// For each state, append the name to a dropdown attribute
stateName.forEach(state => {
    //console.log(state);
    var item = stateDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(state);
});

// Create a country name array
var countryName = tableData.map(sighting => sighting.country)
//console.log(countryName);

// For each country, append the name to a dropdown attribute
countryName.forEach(country => {
    //console.log(country);
    var item = countryDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(country);
});

// Create a shape name array
var shapeName = tableData.map(sighting => sighting.shape)
//console.log(shapeName);

// For each shape, append the name to a dropdown attribute
shapeName.forEach(shape => {
    //console.log(city);
    var item = shapeDropdown.append("a")
    item.attr("class", "dropdown-item")
    item.text(shape);
});

function runFilter() {
    if (citySelect === city) {
        var newFilter = tableData.filter(city => city.name === city)
    }

}

// Function for running when option selected
function runSelect() {

    // Keep the page from refreshing
    d3.event.preventDefault();

    console.log(this);
    // Select the selected city
    //var selCity = d3.select("#cityDropdown").this;
    //console.log(selCity);
    // Print the input date in the console
    //console.log("Date: ", inputDatetime);
    // Add chosen input date into span tag (on page)
    //d3.select("label>span").text(inputDatetime);
    // if ( == city) {
    //     // Filter the table for the selected city
    var filteredData = tableData.filter(element => element.city === selCity);
    // }
    // else if ( == State) {
    //     // Filter the table for the selected state
    // var filteredData = tableData.filter(element => element.state === inputDatetime);
    // }
    // else if ( == Country) {
    //     // Filter the table for the selected country
    // var filteredData = tableData.filter(element => element.country === inputDatetime);
    // }
    // else if ( == Shape) {
    //     // Filter the table for the selected shape
    // var filteredData = tableData.filter(element => element.shape === inputDatetime);
    // }
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