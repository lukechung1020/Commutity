// Modal-related 
// Reset all select field values when clicking close or X button
const selectCommuteType = document.querySelector(".select-commute");

const selectTransitType = document.querySelector(".select-transit");
const busRoute = document.querySelector("#busRouteSearch");
const busStop = document.querySelector("#busStopSearch");
const skytrainOption = document.querySelector(".skytrainOption");
const selectExpoLine = document.querySelector(".expoLineStations");
const selectMilleniumLine = document.querySelector(".milleniumLineStations");
const selectCanadaLine = document.querySelector(".canadaLineStations");

// Event for when commute type select state is changed
selectCommuteType.addEventListener("change", (event) => {
    let selectedElement = event.target.value;
    console.log(selectedElement);

    // When Transit is selected, show Transit options, hide other options
    // When Car or Walk is selected, show those options, hide other options
    // When default is selected, hide all other options
    if (selectedElement == "Transit") {
        resetTransit();
        selectTransitType.removeAttribute("hidden");
    } else if (selectedElement == "Car" || selectedElement == "Walk") {
        resetTransit();
        selectTransitType.setAttribute("hidden", "hidden");
    } else {
        selectTransitType.setAttribute("hidden", "hidden");
        resetTransitType();
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
    console.log(selectedElement);
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
function resetFilters() {
    selectCommuteType.selectedIndex = 0;
    resetTransit();
}

function resetTransit() {
    selectTransitType.selectedIndex = 0;
    selectTransitType.setAttribute("hidden", "hidden");
    resetTransitType();
}

function resetTransitType() {
    busStopSearch.value = "";
    busStopSearch.setAttribute("hidden", "hidden");
    busRouteSearch.value = "";
    busRouteSearch.setAttribute("hidden", "hidden");
    skytrainOption.selectedIndex = 0;
    skytrainOption.setAttribute("hidden", "hidden");
    resetSkytrainOptions();
}

function resetSkytrainOptions() {
    selectExpoLine.setAttribute("hidden", "hidden");
    selectExpoLine.value = "";
    selectMilleniumLine.setAttribute("hidden", "hidden");
    selectMilleniumLine.value = "";
    selectCanadaLine.setAttribute("hidden", "hidden");
    selectCanadaLine.value = "";
}

// populate bus stop options
let listBusStop = document.getElementById("busStopOptions");

bus_stops.forEach(function (item) {
    let optionStop = document.createElement("option");
    optionStop.value = item;
    listBusStop.appendChild(optionStop);
});

// populate bus route options
let listBusRoute = document.getElementById("busRouteOptions");

bus_routes.forEach(function (item) {
    let optionRoute = document.createElement("option");
    optionRoute.value = item;
    listBusRoute.appendChild(optionRoute);
});

// populate expo line stations
let listExpoLine = document.getElementById("expoStationsOptions");

expo_line_stations.forEach(function (item) {
    let optionExpo = document.createElement("option");
    optionExpo.value = item;
    listExpoLine.appendChild(optionExpo);
});

// populate millenium line stations
let listMilleniumLine = document.getElementById("milleniumStationsOptions");

millenium_line_stations.forEach(function (item) {
    let optionMillenium = document.createElement("option");
    optionMillenium.value = item;
    listMilleniumLine.appendChild(optionMillenium);
})

// populate canada line stations
let listCanadaLine = document.getElementById("canadaStationsOptions");

canada_line_stations.forEach(function (item) {
    let optionCanada = document.createElement("option");
    optionCanada.value = item;
    listCanadaLine.appendChild(optionCanada);
})
