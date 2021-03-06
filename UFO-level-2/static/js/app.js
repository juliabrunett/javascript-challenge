// LEVEL 1
// Import data from data.js
var tableData = data;

// Select the form 
var form = d3.select("#form");

// Select the date button
var date_button = d3.select("#filter-button");

// Select the reset button
var reset_button = d3.select("#reset-button");

// Create event handlers for clicking the buttons & submitting the form
date_button.on("click", runEnter);
form.on("submit", runEnter);
reset_button.on("click", runReset);

// Define selection array & type array for multi-filtering
var selVariable = [];
var type = [];

// Initialize the page with all of the data
function init() {

    // DATA TABLE INITIALIZER
    tableData.forEach(sightings => {

        // Select the tbody in the html table
        var tbody = d3.select("tbody");

         // Append a row to the tbody
        var row = tbody.append("tr");
        
        Object.entries(sightings).forEach(([key, value]) => {
             // console.log(key, value);
            var data_cell = row.append("td").text(value);
        });
    });

    // RESULTS COUNTER
    // Print number of results on page
    var num_results = tableData.length;
    d3.select("#num-results").text(`Showing ${num_results} Result(s)`);
};

// Define the reset button function
function runReset() {
    
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    // Reset the table
    tbody.html("");

    // Reset the filter text
    d3.select("label>span").text("");
    d3.selectAll("#chosen-option-city").text("");
    d3.selectAll("#chosen-option-state").text("");
    d3.selectAll("#chosen-option-country").text("");
    d3.selectAll("#chosen-option-shape").text("");
    d3.selectAll("#num-results").text("");
    d3.selectAll("#chosen-option-date").text("");

    // Reset the multi-filtering arrays
    selVariable = [];
    type = [];
    multiCity = [];
    multiState = [];
    multiCountry = [];
    multiShape = [];
    
    // Initialize the page again
    init();
};

// Define the reset button (only resets HTML - when needed)
function runHTMLReset() {
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    // Reset the html table
    tbody.html("");
}

// Function for running when entered (for dates)
function runEnter() {

    // Reset the html
    runHTMLReset();

    // Keep the page from refreshing
    d3.event.preventDefault();

    // Select the input datetime
    var inputDatetime = d3.select("#datetime").property("value");

    // Print the input date in the console
    console.log("Date: ", inputDatetime);
    // Add chosen input date (on page)
    d3.select("#chosen-option-date").text(`Date:  ${inputDatetime}`);

    // Push variables to arrays
    selVariable.push(inputDatetime);
    type.push("datetime");

    // Run the select function - filters
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

// Define arrays for multi-filtering
multiCity = [];
multiState = [];
multiCountry = [];
multiShape = [];

// BUTTON ACTIONS
// Show which button was clicked in the console
d3.selectAll("#dropdownMenuButton").on("click", function() {
    var selButton = d3.select(this).text();
    console.log("Button: ", selButton);

    // Show which option was clicked in the console
    d3.selectAll("option").on("click", function() {
        var selOption = d3.select(this).text();
        console.log("Option: ", selOption);

    // If the city button is selected --> push these values to the 2 arrays
    if (selButton === "City") {
        selVariable.push(selOption);
        type.push("city");
        
        // Push variables to its own array
        multiCity.push(selOption);

        // Reset the whole text area for this category
        d3.select("#chosen-option-city").html("");

        // Update the chosen filter value on the page
        for (var i = 0; i < multiCity.length; i++) {
            
             // Append text for this category
            d3.select("#chosen-option-city").append("p").attr("id", `chosen-option-city${i+1}`).text(`${selButton}: ${multiCity[i]}`); 
            
        };

    }
    // If the state button is selected --> push these values to the 2 arrays
    else if (selButton === "State") {
        selVariable.push(selOption);
        type.push("state");
        
        // Push variables to its own array
        multiState.push(selOption);

        // Reset the whole text area for this category
        d3.select("#chosen-option-state").html("");

        // Update the chosen filter value on the page
        for (var i = 0; i < multiState.length; i++) {    

            // Append text for this category
            d3.select("#chosen-option-state").append("p").attr("id", `chosen-option-state${i+1}`).text(`${selButton}: ${multiState[i]}`); 
        };

    }
    // If the country button is selected --> push these values to the 2 arrays
    else if (selButton === "Country") {
        selVariable.push(selOption);
        type.push("country");
        
        // Push variables to its own array
        multiCountry.push(selOption);

        // Reset the whole text area for this category
        d3.select("#chosen-option-country").html("");

        // Update the chosen filter value on the page
        for (var i = 0; i < multiCountry.length; i++) {

            // Append text for this category
            d3.select("#chosen-option-country").append("p").attr("id", `chosen-option-country${i+1}`).text(`${selButton}: ${multiCountry[i]}`); 
        };

    }
    // If the shape button is selected --> push these values to the 2 arrays
    else if (selButton === "Shape") {
        selVariable.push(selOption);
        type.push("shape");
    
        // Push variables to its own array
        multiShape.push(selOption);

        // Reset the whole text area for this category
        d3.select(`#chosen-option-shape`).html("");

        // Update the chosen filter value on the page
        for (var i = 0; i < multiShape.length; i++) {
                
            // Append text for this category
            d3.select("#chosen-option-shape").append("p").attr("id", `chosen-option-shape${i+1}`).text(`${selButton}: ${multiShape[i]}`); 
            
        };

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

        // Filter the data to the selection (5 different filter variables to ensure each filter is used)
        var firstFilter = tableData.filter(element => element[type[i-4]] === selVariable[i-4]);
        var secondFilter = firstFilter.filter(element => element[type[i-3]] === selVariable[i-3]);
        var thirdFilter = secondFilter.filter(element => element[type[i-2]] === selVariable[i-2]);
        var fourthFilter = thirdFilter.filter(element => element[type[i-1]] === selVariable[i-1]);
        var filteredData = fourthFilter.filter(element => element[type[i]] === selVariable[i]);

    d3.event.preventDefault();

    // Print the sightings for the filtered data in the console
    //console.log("Sightings: ", filteredData);

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
            // runReset();
            d3.select("#num-results").text(`No Results Found. Reset the table to try new filters.`);
        }
        else {
            d3.select("#num-results").text(`Showing ${num_results} Result(s)`);
        }

};

// Run the page initializing function
init();
