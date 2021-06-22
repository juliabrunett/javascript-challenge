// LEVEL 1
// Import data from data.js
var tableData = data;

// Select the form 
var form = d3.select("#form");

// Select the date button
var date_button = d3.select("#filter-button");

// Select the reset button
var reset_button = d3.select("#reset-button");


// Create event handlers for clicking the button & submitting the form
date_button.on("click", runEnter);
form.on("submit", runEnter);
reset_button.on("click", runReset);

// Define selection array & type array for multi-filtering
var selVariable = [];
var type = [];

// Define the reset button function
function runReset() {
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    tbody.html("");

    d3.select("label>span").text("");
    d3.select("#chosen-option-city").text("");
    d3.select("#chosen-option-state").text("");
    d3.select("#chosen-option-country").text("");
    d3.select("#chosen-option-shape").text("");
    d3.select("#num-results").text("");

    // Reset arrays
    selVariable = [];
    type = [];
};

// Define the reset button (only resets HTML - when needed)
function runHTMLReset() {
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    tbody.html("");
}

// Function for running when entered
function runEnter() {

    runHTMLReset();

    // Keep the page from refreshing
    d3.event.preventDefault();

    // Select the input datetime
    var inputDatetime = d3.select("#datetime").property("value");

    // Print the input date in the console
    console.log("Date: ", inputDatetime);
    // Add chosen input date into span tag (on page)
    d3.select("label>span").text(inputDatetime);

    // Push variables to array
    selVariable.push(inputDatetime);
    type.push("datetime");

    // Run the select function
    runSelect(type, selVariable);
};

// LEVEL 2
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

// DROPDOWN MENUS
// Create a city name array
var cityName = tableData.map(sighting => sighting.city);
//console.log(cityName);

// GET RID OF DUPLICATES
// Convert the array to a set
var setCityNames = new Set(cityName);
// Convert the set back into an array
var uniqueCityNames = Array.from(setCityNames);

// For each city, append the name to a dropdown attribute
uniqueCityNames.forEach(city => {
    //console.log(city);
    var item = cityDropdown.append("option");
    item.attr("class", "dropdown-item");
    item.text(city);
});


// Create a state name array
var stateName = tableData.map(sighting => sighting.state);
//console.log(stateName);

// GET RID OF DUPLICATES
// Convert the array to a set
var setStateNames = new Set(stateName);
// Convert the set back into an array
var uniqueStateNames = Array.from(setStateNames);
//console.log(uniqueStateNames);

// For each state, append the name to a dropdown attribute
uniqueStateNames.forEach(state => {
    var item = stateDropdown.append("option");
    item.attr("class", "dropdown-item");
    item.text(state);
});


// Create a country name array
var countryName = tableData.map(sighting => sighting.country)
//console.log(countryName);

// GET RID OF DUPLICATES
// Convert the array to a set
var setCountryNames = new Set(countryName);
// Convert the set back into an array
var uniqueCountryNames = Array.from(setCountryNames);

// For each country, append the name to a dropdown attribute
uniqueCountryNames.forEach(country => {
    //console.log(country);
    var item = countryDropdown.append("option")
    item.attr("class", "dropdown-item")
    item.text(country);
});


// Create a shape name array
var shapeName = tableData.map(sighting => sighting.shape)
//console.log(shapeName);

// GET RID OF DUPLICATES
// Convert the array to a set
var setShapeNames = new Set(shapeName);
// Convert the set back into an array
var uniqueShapeNames = Array.from(setShapeNames);

// For each shape, append the name to a dropdown attribute
uniqueShapeNames.forEach(shape => {
    //console.log(city);
    var item = shapeDropdown.append("option")
    item.attr("class", "dropdown-item")
    item.text(shape);
});


// SHOW which button was clicked in the console
d3.selectAll("#dropdownMenuButton").on("click", function() {
    var selButton = d3.select(this).text();
    console.log(selButton);

    d3.selectAll("option").on("click", function() {
        var selOption = d3.select(this).text();
        console.log(selOption);

    // Print the option in the console
    console.log("Option: ", selOption);


    // If the city button is selected --> push these values to the 2 arrays
    if (selButton === "City") {
        selVariable.push(selOption);
        type.push("city");
        
        // Update the chosen filter value on the page
        d3.select("#chosen-option-city").text(`${selButton}: ${selOption}`);

    }
    // If the state button is selected --> push these values to the 2 arrays
    else if (selButton === "State") {
        selVariable.push(selOption);
        type.push("state");
        
        // Update the chosen filter value on the page
        d3.select("#chosen-option-state").text(`${selButton}: ${selOption}`);

    }
    // If the country button is selected --> push these values to the 2 arrays
    else if (selButton === "Country") {
        selVariable.push(selOption);
        type.push("country");
        
        // Update the chosen filter value on the page
        d3.select("#chosen-option-country").text(`${selButton}: ${selOption}`);

    }
    // If the shape button is selected --> push these values to the 2 arrays
    else if (selButton === "Shape") {
        selVariable.push(selOption);
        type.push("shape");
    
        // Update the chosen filter value on the page
        d3.select("#chosen-option-shape").text(`${selButton}: ${selOption}`);

    }

    // Run the select function
    runSelect(type, selVariable);
    // console.log(selVariable);
    // console.log(type);

}); 
});

// The select function (filters by each parameter)
function runSelect(type, selVariable) {

    // Loop to assemble table by filtering (using type & selVariable arrays)
    for (var i=0; i < selVariable.length; i++) {

        // Reset the HTML to blank
        runHTMLReset();

        // Filter the data to the selection
        var firstFilter = tableData.filter(element => element[type[i-4]] === selVariable[i-4]);
        var secondFilter = firstFilter.filter(element => element[type[i-3]] === selVariable[i-3]);
        var thirdFilter = secondFilter.filter(element => element[type[i-2]] === selVariable[i-2]);
        var fourthFilter = thirdFilter.filter(element => element[type[i-1]] === selVariable[i-1]);
        var filteredData = fourthFilter.filter(element => element[type[i]] === selVariable[i]);


        // console.log("Previous Filter", newFilteredData);
        // console.log("Filtered Data: ", filteredData);

    d3.event.preventDefault();

    // Print the sightings for the city in the console
    console.log("Sightings: ", filteredData);

    // Loop through the filtered data array of objects
    filteredData.forEach(sightings => {

       // Select the tbody in the html table
        var tbody = d3.select("tbody");

        // Print each object in the console
        // console.log(sightings);

        // Append a row to the tbody
        var row = tbody.append("tr");

        Object.entries(sightings).forEach(([key, value]) => {
            // console.log(key, value);

            var data_cell = row.append("td").text(value);
        });

        
    });
};

    // Print number of results on page
        var num_results = filteredData.length;
        
        // If results = 0, reset the table to avoid error
        if (num_results === 0) {
            console.log(`${num_results} Results, resetting table...`);
            runReset();
            d3.select("#num-results").text(`No Results Found.`);
        }
        else {
            d3.select("#num-results").text(`Showing ${num_results} Result(s)`);
        }

};
