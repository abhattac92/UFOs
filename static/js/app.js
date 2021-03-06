// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = {};

var filter_values = ['datetime', 'city', 'state','country', 'shape'];

// This function will replace your handleClick function
function updateFilters() {

  filter_values.forEach((val) => {
     // Save the element, value, and id of the filter that was changed
    let filter_value = d3.select("#"+val).property("value");
    let filter_id = d3.select("#"+val).property("id");
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
    if (filter_value) {
      filters[filter_id] = filter_value;
    } else {
      delete filters[filter_id];
    }
  });
  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;
  // Loop through all of the filters and keep any data that
  // matches the filter values 
  Object.keys(filters).forEach((val) => {
    filteredData = filteredData.filter(row => row[val] === filters[val]);
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#filter-btn").on("click", updateFilters);

// Build the table when the page loads
buildTable(tableData);
