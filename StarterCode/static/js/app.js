// Put url in const variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch JSON and console.log
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize dashboard
function init() {

    // Drop down menu
    let dropdownMenu = d3.select("#selDataset");

    // Sample names and drop down selector
    d3.json(url).then((data) => {
        
        // Variable for the sample names
        let names = data.names;

        // Add samples to the dropdown menu
        names.forEach((id) => {
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Assign first sample from the list
        let sample_one = names[0];
        console.log(sample_one);

        // Plots
        Metadata(sample_one);
        BarChart(sample_one);
        BubbleChart(sample_one);
        // GaugeChart(sample_one);

    });
};

// Metadata 

function Metadata(sample) {
    d3.json(url).then((data) => {

        // Get metadata
        let metadata = data.metadata;

        // Filter to get sample
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        // Assign first value
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use object to add each key and value pair
        Object.entries(valueData).forEach(([key,value]) => {
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

// Bar chart

function BarChart(selectedSample) {
    d3.json(url).then((data) => {

        // Get sample data
        let samplesData = data.samples;
        
        // Filter based on value of sample
        let value = samplesData.filter(result => result.id == selectedSample);

        // Get the first index 
        let obj = value[0];

        // Get the otu_ids, lables, and sample values 
        let otu_ids = obj.otu_ids;
        let otu_labels = obj.otu_labels;
        let sample_values = obj.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        // Select top 10
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let hovertext = otu_labels.slice(0,10).reverse();

                // Set up the trace for bar chart
                let trace = {
                    x: xticks,
                    y: yticks,
                    text: hovertext,
                    type: "bar",
                    orientation: "h"
                };
        
                // Setup the layout
                let layout = {
                    title: "Top 10 OTUs"
                };
        
                // Call Plotly to plot the bar chart
                Plotly.newPlot("bar", [trace], layout)
            });
        };

// BubbleChart
function BubbleChart(selectedSample) {

    d3.json(url).then((data) => {
        
        // Get sample data 
        let sampleInfo = data.samples;

        // Filter based on value of sample
        let value = sampleInfo.filter(result => result.id == selectedSample);

        // Get first index
        let obj = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = obj.otu_ids;
        let otu_labels = obj.otu_labels;
        let sample_values = obj.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Update dashboard
function optionChanged(value) { 

    // Log new value
    console.log(value); 

    // Call functions 
    Metadata(value);
    BarChart(value);
    BubbleChart(value);
};

// Inititialize 
init();