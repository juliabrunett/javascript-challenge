// LEVEL 1
// Import data from data.js
var tableData = data;

// Select the form 
var form = d3.select("#form");

// Select the date button
var date_button = d3.select("#filter-button");

var reset_button = d3.select("#reset-button");


// Create event handlers for clicking the button & submitting the form
date_button.on("click", runEnter);
form.on("submit", runEnter);
reset_button.on("click", runReset);

function runReset() {
    // Select the tbody in the html table
    var tbody = d3.select("tbody");
    tbody.html("");
};

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
    // tbody.html("");

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

// Select each dropdown option
// var citySelect = d3.select("#cityDropdown");
// var stateSelect = d3.select("#stateDropdown");
// var countrySelect = d3.select("#countryDropdown");
// var shapeSelect = d3.select("#shapeDropdown");

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

// // SHOW which button was clicked in the console
// // On click -- run the function
// cityButton.on("click", function() {
//     var selCityButton = d3.select(this).text();
//     console.log(selCityButton);

//     d3.selectAll("option").on("click", function() {
//         var selCity = d3.select(this).text();
//         console.log(selCity);
    
//         // Run the select function
//         runSelect(selCity, "city");
//     });
    
// });

// // On click -- run the function
// stateButton.on("click", function() {
//     var selStateButton = d3.select(this).text();
//     console.log(selStateButton);

//     d3.selectAll("option").on("click", function() {
//         var selState = d3.select(this).text();
//         console.log(selState);

//         // Run the select function
//         runSelect(selState, "state");
//     });
// });

// // On click -- run the function
// countryButton.on("click", function() {
//     var selCountryButton = d3.select(this).text();
//     console.log(selCountryButton);

//     d3.selectAll("option").on("click", function() {
//         var selCountry = d3.select(this).text();
//         console.log(selCountry);

//         // Run the select function
//         runSelect(selCountry, "country");
//     });
// });

// // On click -- run the function
// shapeButton.on("click", function() {
//     var selShapeButton = d3.select(this).text();
//     console.log(selShapeButton);

//     d3.selectAll("option").on("click", function() {
//         var selShape = d3.select(this).text();
//         console.log(selShape);

//         if (tbody.html() === "") {
//         // Run the select function
//         runSelect(selShape, "shape", "new");
//         }
//         else {
//             runSelect(selShape, "shape", "filtered");
//         };
// });
// });

var continueFilter = [];

d3.selectAll("#dropdownMenuButton").on("click", function() {
    var selButton = d3.select(this).text();
    console.log(selButton);

    d3.selectAll("option").on("click", function() {
        var selOption = d3.select(this).text();
        console.log(selOption);

    // Print the option in the console
    console.log("Option: ", selOption);
    
    if (selButton === "City") {
        var selVariable = selOption;
        var type = "city";
        var status = "new";
        d3.select("#chosen-option-city").text(`${selButton}: ${selOption}`);

        // if (continueFilter.length != 0) {
        //     continueFilter.push(selButton);
        // }
        // else {
        //     status = "filtered"
        // }
    }
    else if (selButton === "State") {
        var selVariable = selOption;
        var type = "state";
        var status = "new";
        d3.select("#chosen-option-state").text(`${selButton}: ${selOption}`);
    }
    else if (selButton === "Country") {
        var selVariable = selOption;
        var type = "country";
        var status = "new";
        d3.select("#chosen-option-country").text(`${selButton}: ${selOption}`);
    }
    else if (selButton === "Shape") {
        var selVariable = selOption;
        var type = "shape";
        var status = "new";
        d3.select("#chosen-option-shape").text(`${selButton}: ${selOption}`);
    }

    console.log(selVariable);
    console.log(type);
    console.log(status);

    runSelect(selVariable, type, status);

}); 
});

// The select function (filters by each parameter)
function runSelect(selVariable, type, status) {

    runReset();

    if (status === "new") {
        // Filter the data to the selection
        var filteredData = tableData.filter(element => element[type] === selVariable);
    }
    else if (status === "filtered") {
        filteredData = filteredData.filter(element => element[type] === selVariable);
    };

    d3.event.preventDefault();

    // Print the sightings for the city in the console
    console.log("Sightings: ", filteredData);

    // Loop through the filtered data array of objects
    filteredData.forEach(sightings => {

       // Select the tbody in the html table
        var tbody = d3.select("tbody");

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