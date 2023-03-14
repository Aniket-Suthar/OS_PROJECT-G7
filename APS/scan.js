let exeBtn = document.getElementById("executeButton");
let addTrack = document.getElementById("addTrackBtn");
let requestedArray = [];
let inputTable = document.getElementById("inputtable");
let tr = document.createElement('tr');
let size;
let startTrack;
let travelTime;

addTrack.addEventListener('click', () => {
    size = parseInt(document.getElementById("total_tracks").value);        //no. of tracks in the disk
    travelTime = parseInt(document.getElementById("timetakenPertrack").value);   //time taken by R/W head to travel through 1 track 
    startTrack = parseInt(document.getElementById("startingHead").value);       //starting position of the R/W head
    const trackField = document.getElementById("Requested Tracks");
    const trackInput = parseInt(trackField.value);
    //to check the validity of the entered values by the user
    if (validator(size, travelTime, startTrack, trackInput)) {
        requestedArray.push(trackInput);
        let td = document.createElement('td');
        let cellText = document.createTextNode(trackInput);
        td.appendChild(cellText);
        tr.appendChild(td);
        inputTable.appendChild(tr);
    }
    trackField.value = "";
});

let validator = (size, travelTime, startTrack, trackInput) => {

    if (Number.isNaN(size) || size < 0) {
        alert("Please enter a valid number!");
        return false
    } else {
        if (Number.isNaN(startTrack) || startTrack < 0) {
            alert(`Please enter a valid track number! It should be in between 0 and ${size - 1}`);
            return false;
        } else if (startTrack > (size - 1)) {
            alert(`Starting Track number for R/W head cant be greater than ${size - 1}! Please try again.`);
            return false;
        } else {
            if (Number.isNaN(travelTime) || travelTime < 0) {
                alert("Please enter a valid time");
                return false;
            } else {
                if (Number.isNaN(trackInput) || trackInput < 0) {
                    alert(`Please enter a valid track number! It should be in between 0 and ${size - 1}`);
                    return false;
                } else if (trackInput > (size - 1)) {
                    alert(`Track number cant be greater than ${size - 1}! Please try again.`);
                    return false;
                } else {
                    return true;
                }
            }
        }
    }

}

exeBtn.addEventListener('click', () => {

    const arraySize = requestedArray.length;
    let largerFirst = true;
    const travelDirecn = document.getElementById("Selector").value;
    const scan = document.getElementById("scanOrscanC").value;
    if (travelDirecn == '0') {
        largerFirst = true
    } else {
        largerFirst = false;
    }
    let processedTrackSequence = [];
    let totalTracksTravelled = 0;
    let totalTime = 0;
    //requestedArray in ascending order
    requestedArray = requestedArray.sort((a, b) => a - b);

    let position = 0;
    while (position < arraySize) {
        if (requestedArray[position] >= startTrack) {
            break;
        }
        position++;
    }
    if (scan == 'scan') {

        //There will be 6 cases
        //case 1, all requested tracks are larger than the starting position and larger have to be processed first
        if (position == 0 && largerFirst == true) {
            processedTrackSequence = requestedArray;
            totalTracksTravelled = (size - 1) - startTrack;
            //case 2, if all requested tracks are larger than the starting position and smaller have to be processed first
        } else if (position == 0 && largerFirst == false) {
            processedTrackSequence = requestedArray;
            totalTracksTravelled = startTrack + requestedArray[arraySize - 1];
            //case 3, if all requested tracks are smaller than the starting position and smaller have to be processed first
        } else if (position == arraySize && largerFirst == false) {
            processedTrackSequence = requestedArray.slice().reverse();
            totalTracksTravelled = startTrack;
            //case 4, if all requested tracks are smaller than starting position and larger have to be proccessed first
        } else if (position == arraySize && largerFirst == true) {
            processedTrackSequence = requestedArray.slice().reverse();
            totalTracksTravelled = ((size - 1) - startTrack) + ((size - 1) - requestedArray[0]);
            //case 5, if starting track is somewhere in between and larger tracks have to be processed first
        } else if (largerFirst == true) {
            processedTrackSequence = requestedArray.slice(position).concat(requestedArray.slice(0, position).reverse());
            totalTracksTravelled = ((size - 1) - startTrack) + ((size - 1) - requestedArray[0]);
            //case 6, if starting track is somewhere in between and smaller tracks have to be processed first
        } else {
            processedTrackSequence = requestedArray.slice(0, position).reverse().concat(requestedArray.slice(position));
            totalTracksTravelled = startTrack + requestedArray[arraySize - 1];
        }
    } else {
        if (position == 0 && largerFirst == true) {
            processedTrackSequence = requestedArray;
            totalTracksTravelled = (2 * (size - 1)) - startTrack;
        } else if (position == 0 && largerFirst == false) {
            processedTrackSequence = requestedArray;
            totalTracksTravelled = startTrack + (size - 1);
        } else if (position == arraySize && largerFirst == true) {
            processedTrackSequence = requestedArray;
            totalTracksTravelled = 2 * (size - 1) - startTrack + (requestedArray[arraySize - 1]);
        } else if (position == arraySize && largerFirst == false) {
            processedTrackSequence = requestedArray.reverse();
            totalTracksTravelled = startTrack + (size - 1);
        } else if (largerFirst == true) {
            processedTrackSequence = requestedArray.slice(position).concat(requestedArray.slice(0, position));
            totalTracksTravelled = 2 * (size - 1) - startTrack + requestedArray[position - 1];
        } else {
            processedTrackSequence = requestedArray.slice(0, position).reverse().concat(requestedArray.slice(position).reverse());
            totalTracksTravelled = startTrack + 2 * (size - 1) - requestedArray[position];
        }
    }
    totalTime = totalTracksTravelled * travelTime;
    document.getElementById("trackstravelled").value = totalTracksTravelled;
    document.getElementById("totaltime").value = totalTime;
    createOutputTable(processedTrackSequence);
});

const createOutputTable = (processedTrackSequence) => {
    let outputTable = document.getElementById("outputtable");
    let tr2 = document.createElement('tr');
    for (let i = 0; i < processedTrackSequence.length; i++) {
        let td2 = document.createElement('td');
        let text = document.createTextNode(processedTrackSequence[i]);
        td2.appendChild(text);
        tr2.appendChild(td2);
    }
    outputTable.appendChild(tr2);
}


//Adding the Data to Excel file using Inbuilt JS library
const name = document.querySelector("#user").value;

//Exporting data to excel sheet
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('outputtable');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (document.querySelector("#user").value + '.' + (type || 'csv')));
}

// Function for implementing chart using inbuilt library

function makechart() {


    var popCanvas = document.getElementById("popChart");
  
    Chart.defaults.font.size = 15;
    Chart.defaults.color = "black";

    var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
            labels: ['Total_Remaining_A', 'Total_Remaining_B', 'Total_Remaining_C',
                'Total_Allocated_A', 'Total_Allocated_B', 'Total_Allocates_C',
                'Total_Maxneed_A', 'Total_Maxneed_B', 'Total_maxneed_C'
            ],
            datasets: [{
                label: 'VARIOUS RESOURCES ALLOCATIONS',
                data: [`${RsumA}`, `${RsumB}`, `${RsumC}`,
                `${AsumA}`, `${AsumB}`, `${AsumC}`,
                `${MsumA}`, `${MsumB}`, `${MsumC}`,
                ],

                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)'
                ]
            }]
        }
    });
}
