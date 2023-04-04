// Modal-related 
// Final array that will be used to set filter values for the post
var filterValuesArr = [];

// Select form pointer for commute type
const selectCommuteType = document.querySelector(".select-commute");
// Select form pointer for transit type
const selectTransitType = document.querySelector(".select-transit");

// Pointer to datalist search for location
const searchLocations = document.querySelector("#locationSearch");

// Pointer to datalist search for bus routes and stops
const busRoute = document.querySelector("#busRouteSearch");
const busStop = document.querySelector("#busStopSearch");

// Select form pointer for Skytrain Line
const skytrainOption = document.querySelector(".skytrainOption");

// Pointer to datalist search for stations in different skytrain lines
const selectExpoLine = document.querySelector(".expoLineStations");
const selectMilleniumLine = document.querySelector(".milleniumLineStations");
const selectCanadaLine = document.querySelector(".canadaLineStations");

// Event for when commute type select state is changed
selectCommuteType.addEventListener("change", (event) => {
    let selectedElement = event.target.value;

    // When Transit is selected, show Transit options, hide other options
    // When Car or Walk is selected, show those options, hide other options
    // When default is selected, hide all other options
    if (selectedElement == "Transit") {
        resetTransit();
        resetLocation();
        selectTransitType.removeAttribute("hidden");
    } else if (selectedElement == "Car" || selectedElement == "Walk") {
        resetTransit();
        resetLocation();
        selectTransitType.setAttribute("hidden", "hidden");
        searchLocations.removeAttribute("hidden");
    } else {
        selectTransitType.setAttribute("hidden", "hidden");
        resetTransitType();
        resetLocation();
    }
});

// Event for when transit type select state is changed
selectTransitType.addEventListener("change", (event) => {
    let selectedElement = event.target.value;

    // When Bus is selected show bus stops, and bus routes search bars
    // When Skytrain is selected, show skytrain lines and skytrain stations
    if (selectedElement == "Bus") {
        resetTransitType();
        busStopSearch.removeAttribute("hidden");
        busRouteSearch.removeAttribute("hidden");
    } else if (selectedElement == "Skytrain") {
        resetTransitType();
        skytrainOption.removeAttribute("hidden");

    } else {
        resetTransitType();
    }
})

// Skytrain option selected
// Event for when skytrain line select state is changed
skytrainOption.addEventListener("change", (event) => {
    let selectedElement = event.target.value;

    // Display correct search form
    // Hide and reset others
    if (selectedElement == "Expo Line") {
        resetSkytrainOptions();
        selectExpoLine.removeAttribute("hidden");
    } else if (selectedElement == "Millenium Line") {
        resetSkytrainOptions();
        selectMilleniumLine.removeAttribute("hidden");
    } else if (selectedElement == "Canada Line") {
        resetSkytrainOptions();
        selectCanadaLine.removeAttribute("hidden");
    }
})

// Hide and reset 
// Reset ALL to default
function resetFilters() {
    selectCommuteType.selectedIndex = 0;
    resetTransit();
    resetLocation();
    if (filterValuesArr.length > 0) {
        clearSelectedFilters();
    }
}

// Reset transit type and all other nested fields
function resetTransit() {
    selectTransitType.selectedIndex = 0;
    selectTransitType.setAttribute("hidden", "hidden");
    resetTransitType();
}

// Reset location datalist
function resetLocation() {
    locationSearch.value = "";
    locationSearch.setAttribute("hidden", "hidden");
}

// Reset all search datalists and skytain line 
function resetTransitType() {
    busStopSearch.value = "";
    busStopSearch.setAttribute("hidden", "hidden");
    busStopSearch.disabled = false;
    busRouteSearch.value = "";
    busRouteSearch.setAttribute("hidden", "hidden");
    busRouteSearch.disabled = false;
    skytrainOption.selectedIndex = 0;
    skytrainOption.setAttribute("hidden", "hidden");
    resetSkytrainOptions();
}

// Reset skytrain line station search datalists
function resetSkytrainOptions() {
    selectExpoLine.setAttribute("hidden", "hidden");
    selectExpoLine.value = "";
    selectExpoLine.disabled = false;
    selectMilleniumLine.setAttribute("hidden", "hidden");
    selectMilleniumLine.value = "";
    selectMilleniumLine.disabled = false;
    selectCanadaLine.setAttribute("hidden", "hidden");
    selectCanadaLine.value = "";
    selectCanadaLine.disabled = false;
    clearSearch.setAttribute("hidden", "hidden");
}

// Populate location options
let listLocations = document.getElementById("locationOptions");

location_data.forEach(function (item) {
    let optionLocation = document.createElement("option");
    optionLocation.value = item;
    listLocations.appendChild(optionLocation)
})

// Populate bus stop options
let listBusStop = document.getElementById("busStopOptions");

bus_stops.forEach(function (item) {
    let optionStop = document.createElement("option");
    optionStop.value = item;
    listBusStop.appendChild(optionStop);
});

// Populate bus route options
let listBusRoute = document.getElementById("busRouteOptions");

bus_routes.forEach(function (item) {
    let optionRoute = document.createElement("option");
    optionRoute.value = item;
    listBusRoute.appendChild(optionRoute);
});

// Populate Expo Line Stations datalist with options from transit_data.js
let listExpoLine = document.getElementById("expoStationsOptions");

expo_line_stations.forEach(function (item) {
    let optionExpo = document.createElement("option");
    optionExpo.value = item;
    listExpoLine.appendChild(optionExpo);
});

// Populate Millenium Line Stations datalist with options from transit_data.js
let listMilleniumLine = document.getElementById("milleniumStationsOptions");

millenium_line_stations.forEach(function (item) {
    let optionMillenium = document.createElement("option");
    optionMillenium.value = item;
    listMilleniumLine.appendChild(optionMillenium);
});

// Populate Canada Line Stations datalist with options from transit_data.js
let listCanadaLine = document.getElementById("canadaStationsOptions");

canada_line_stations.forEach(function (item) {
    let optionCanada = document.createElement("option");
    optionCanada.value = item;
    listCanadaLine.appendChild(optionCanada);
});

// Function that disables putting in input after datalist option is selected
function disableInputOnDatalistChoice(e) {
    if (!e.keyCode) {
        e.target.disabled = true;
        document.getElementById("clearSearch").removeAttribute("hidden");
    }
}

// Function that clears then enables all searches
function clearSearches() {
    searchLocations.disabled = false;
    searchLocations.value = "";
    busRoute.disabled = false;
    busRoute.value = "";
    busStop.disabled = false;
    busStop.value = "";
    selectExpoLine.disabled = false;
    selectExpoLine.value = "";
    selectMilleniumLine.disabled = false;
    selectMilleniumLine.value = "";
    selectCanadaLine.disabled = false;
    selectCanadaLine.value = "";
    document.getElementById("clearSearch").setAttribute("hidden", "hidden");
}

// Function that applies all selected filter(s) and saves them to filterValuesArr array
function applyFilters() {
    filterValuesArr = [];
    if (selectCommuteType.selectedIndex == 0) {
        // Commute type is not selected MANDATORY FIELD
        alert("Please select a Commute Type!");
        return;
    } else if (selectCommuteType.selectedIndex == 1) {
        filterValuesArr.push(selectCommuteType.value);
        if (selectTransitType.selectedIndex == 0) {
            // Transit selected
            // Transit type is not selected MANDATORY FIELD
            alert("Please select a Transit Type!");
            return;
        } else if (selectTransitType.selectedIndex == 1) {
            // Bus is selected
            filterValuesArr.push(selectTransitType.value);
            if (busStop.disabled && busRoute.disabled) {
                // Bus Stop AND Bus Route valid
                filterValuesArr.push("Stop " + busStop.value);
                filterValuesArr.push("Route " + busRoute.value);
            } else if (!busStop.disabled && busStop.value != "" && !busRoute.disabled && busRoute.value != "") {
                // Bus Stop AND Bus Route not valid
                alert("Please input a valid value for Bus Stop AND Bus Route OR leave them empty!");
                return;
            } else if (busStop.disabled && !busRoute.disabled && busRoute.value != "") {
                // Bus Stop valid and Bus Route not valid
                alert("Please input a valid value for Bus Route OR leave it empty!");
                return;
            } else if (busStop.disabled && busRoute.value == "") {
                // Bus Stop valid and Bus Route is empty
                filterValuesArr.push("Stop " + busStop.value);
            } else if (!busStop.disabled && busStop.value != "" & busRoute.disabled) {
                // Bus Stop not valid and Bus Route valid
                alert("Please input a valid value for Bus Stop OR leave it empty!");
                return;
            } else if (busStop.value == "" && busRoute.disabled) {
                // Bus Stop empty and Bus Route valid
                filterValuesArr.push("Route " + busRoute.value);
            } else if (!busStop.disabled && busStop.value != "" && busRoute.value == "") {
                // Bus Stop not valid and Bus Route empty
                alert("Please input a valid value for Bus Stop OR leave it empty!");
                return;
            } else if (busStop.value == "" && !busRoute.disabled && busRoute.value != "") {
                // Bus Stop is empty and Bus Route not valid
                alert("Please input a valid value for Bus Route OR leave it empty!");
                return;
            }
        } else if (selectTransitType.selectedIndex == 2) {
            // Skytrain is selected
            filterValuesArr.push(selectTransitType.value);
            if (skytrainOption.selectedIndex == 1) {
                // Expo Line is selected
                filterValuesArr.push(skytrainOption.value);
                if (!selectExpoLine.disabled && selectExpoLine.value != "") {
                    // Expo Line Station not valid
                    alert("Please input a valid value for Expo Line Station OR leave it empty!");
                    return;
                } else if (selectExpoLine.disabled) {
                    // Expo Line Station valid
                    filterValuesArr.push(selectExpoLine.value);
                }
            } else if (skytrainOption.selectedIndex == 2) {
                // Millenium Line is selected
                filterValuesArr.push(skytrainOption.value);
                if (!selectMilleniumLine.disabled && selectMilleniumLine.value != "") {
                    // Millenium Line Station not valid
                    alert("Please input a valid value for Millenium Line Station OR leave it empty!");
                    return;
                } else if (selectMilleniumLine.disabled) {
                    // Millenium Line Station valid
                    filterValuesArr.push(selectMilleniumLine.value);
                }
            } else if (skytrainOption.selectedIndex == 3) {
                // Millenium Line is selected
                filterValuesArr.push(skytrainOption.value);
                if (!selectCanadaLine.disabled && selectCanadaLine.value != "") {
                    // Canada Line Station not valid
                    alert("Please input a valid value for Canada Line Station OR leave it empty!");
                    return;
                } else if (selectCanadaLine.disabled) {
                    // Millenium Line Station valid
                    filterValuesArr.push(selectCanadaLine.value);
                }
            }
        }
    } else if (selectCommuteType.selectedIndex == 2 || selectCommuteType.selectedIndex == 3) {
        filterValuesArr.push(selectCommuteType.value);
        if (!searchLocations.disabled && searchLocations.value != "") {
            // Search Locations is not valid
            alert("Please input a valid value for Locations OR leave it empty!");
            return;
        } else if (searchLocations.disabled) {
            // Search Locations valid
            filterValuesArr.push(searchLocations.value);
        }
    }
    console.log(filterValuesArr);
    document.getElementById("clearFilters").setAttribute("hidden", "hidden");
    let selectedFilters = document.getElementById("selectedFilters");
    let numOfChildren = selectedFilters.childNodes.length;
    if (numOfChildren > 0) {
        while (numOfChildren > 0) {
            selectedFilters.removeChild(selectedFilters.lastChild);
            numOfChildren--;
        }
    }
    document.getElementById("closeBtn").click();
    updateSelectedFilters();

}

// Help messages 
function requiredHelp() {
    alert("These fields are required for posting. Please make sure they are filled or an option is seleced!");
}

function optionalHelp() {
    alert("These fields are optional. Please make sure they are either empty, or there is a valid input!");
}
