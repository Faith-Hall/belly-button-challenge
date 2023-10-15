const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Use D3 library to read in samples.json from the URL


// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

// Display demographic info of subject

function demoBox(subjectID, allMetadata) {
    console.log("demoBox");
}
// Display bar chart 

function barChart(subjectSample) {
    console.log("barChart");
}
// Display bubble chart

function bubbleCart(subjectSample) {
    console.log("bubbleCart");
}

function getSubjectSample(subjectID, allSamples) {
    console.log(subjectID)
    console.log(allSamples)
    filter
}


function optionChanged(subjectID) {
    console.log(subjectID);

    d3.json(url).then(function(data) {
        demoBox(subjectID, data.metadata);
        let subjectSample = getSubjectSample(subjectID, data.samples)


    });
}