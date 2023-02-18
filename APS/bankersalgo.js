//* * * * * * * * * * H T M L    J S     I M P L E M E N T A T I O N  * * * * * * * * * *

//Showing alerts function
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 1700);
}



//Variable for adding total processes in array
let first = false;

//total processes
const total_arr = [];
var totalProcesses;

let counter = 0


//Arrayfor allocated resources to each process 
const allocation_arr_A = [];
const allocation_arr_B = [];
const allocation_arr_C = [];

//Array for resources required for execution
const remaining_arr_A = [];
const remaining_arr_B = [];
const remaining_arr_C = []

//Array for maximum resources needed for execution of a process
const maxNeed_A = [];
const maxNeed_B = [];
const maxNeed_C = []


//Making total resources of each resource at the beginning
let totalall_A = 0;
let totalall_B = 0;
let totalall_C = 0

//Array for sequence of safe execution of processes
const sequence = []

//Array for avaliable resources
const availaible = []

//to check number of processes which have not been executed
let checked = 0;

//to check for deadlock
let deadlock = false

//Array for checking whether all the processes are completed or not
const completed = [];


//Sum for making charts
let RsumA = 0, RsumB = 0, RsumC = 0;
let AsumA = 0, AsumB = 0, AsumC = 0;
let MsumA = 0, MsumB = 0, MsumC = 0;



//Function for Clearing all the field values after each new Entry
function clearFields() {

    document.querySelector("#allocA").value = "";
    document.querySelector("#allocB").value = "";
    document.querySelector("#allocC").value = "";

    document.querySelector("#needA").value = "";
    document.querySelector("#needB").value = "";
    document.querySelector("#needC").value = "";
}


//Declaring various variables for various buttons used in HTML
let btnAdd = document.querySelector('#add_row');
let delInput = document.querySelector('#delete');
let exeInput = document.querySelector('#exe');
let pno = "P";
let ddl = "Deadlock Encountered";
let ddln = "Deadlock Avoided Successfully";

//Declaring variable "Count" for adding rows
var count = 1;

//Function for adding Rows to to table
btnAdd.addEventListener('click', function addRow(e) {
    e.preventDefault();

    //Grabbing the value passed by user in various fields
    const Total_A = document.querySelector("#apinput").value;
    const Total_B = document.querySelector("#bpinput").value;
    const Total_C = document.querySelector("#cpinput").value;
    const name = document.querySelector("#user").value;

    //Pushing values to "Total Available Resources Array"
    if (first == false) {
        total_arr.push(parseFloat(Total_A));
        total_arr.push(parseFloat(Total_B));
        total_arr.push(parseFloat(Total_C));
        first = true;
    }

    //Concatination for Process as "P1"
    let num = count.toString();
    let pno_2 = pno.concat(num);

    //Grabbing the value for Allocated resource array
    const Alloc_A = document.querySelector("#allocA").value;
    const Alloc_B = document.querySelector("#allocB").value;
    const Alloc_C = document.querySelector("#allocC").value;

    //Grabbing the value for Maxneed resource array
    const Max_A = document.querySelector("#needA").value;
    const Max_B = document.querySelector("#needB").value;
    const Max_C = document.querySelector("#needC").value;

    //validating the value
    if (Alloc_A == "" || Alloc_B == "" || Alloc_C == "" || name == "") {
        showAlert("Please Fill All the Details", "danger");
    }

    else if (Alloc_A < 0 || Alloc_B < 0 || Alloc_C < 0) {
        showAlert("Resources  cant't be negative", "danger");
    }
    else if (Total_A == 0 || Total_B == 0 || Total_C == 0) {
        showAlert("Total Resources cannot be 0. Please try again", "danger");
    }
    else if (Max_A == "" || Max_B == "" || Max_C == "") {
        showAlert("Please fill all details", "danger");
    }

    else if (Max_A < 0 || Max_B < 0 || Max_C < 0) {
        showAlert("Resources  cant't be negative", "danger");
    }
    else if (Total_A == "" || Total_B == "" || Total_C == "") {
        showAlert("Please fill all details", "danger");
    }


    else {
        //Adding the data to row after validation
        count++;

        //Declaring variable for table to store where data needed to be store
        var table = document.getElementById("bk_table");
        var row = table.insertRow(count);

        //Giving value to the Allocated Resouces column
        var cell0 = row.insertCell(0);
        cell0.innerHTML = pno_2;


        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);

        cell1.innerHTML = Alloc_A;
        cell2.innerHTML = Alloc_B;
        cell3.innerHTML = Alloc_C;

        //Pushing to the Allocated Resource array
        allocation_arr_A.push(parseFloat(Alloc_A));
        allocation_arr_B.push(parseFloat(Alloc_B));
        allocation_arr_C.push(parseFloat(Alloc_C));

        //For graph purpose
        AsumA += parseFloat(Alloc_A);
        AsumB += parseFloat(Alloc_B);
        AsumC += parseFloat(Alloc_C);


        //Adding the value to cell of MaxNeed Resources column
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);


        cell4.innerHTML = Max_A;
        cell5.innerHTML = Max_B;
        cell6.innerHTML = Max_C;

        //Pushing to the maxneed Array
        maxNeed_A.push(parseFloat(Max_A));
        maxNeed_B.push(parseFloat(Max_B));
        maxNeed_C.push(parseFloat(Max_C));

        //For graph purpose
        MsumA += parseFloat(Max_A);
        MsumB += parseFloat(Max_B);
        MsumC += parseFloat(Max_C);

        //Showing Alert after every execution
        showAlert("Entry Added", "success");
        clearFields();


    }
    //Passing the value to the total no.of processes var
    totalProcesses = count - 1;
});

//Count for adding the row values to remaining resource table
let count2 = 1;


//* * * * * * * * * * E N D   O F    H T M L <--> J S    I M P L E M E N T A T I O N  * * * * * * * * * *



//* * * * * * * * * * * *  C O R E    A L G O R I T H M    I M P L E M E N T A T I O N  * * * * * * * * * * * *


//Function for executing the implementation when execute button is pressed
exeInput.addEventListener('click', function exeAlgo(e) {
    e.preventDefault();
    //Validation Condition
    if (totalProcesses == 1) {
        alert("Please Enter more than One Processes...");
    }

    else {
        //Initilizing the no. of remaining processes with value of totalprocesses as initially both will be same
        let remaining = totalProcesses;

        //Initializing the completed array with the value "0"
        for (let i = 0; i < totalProcesses; i++) {
            completed[i] = 0;
        }

        //calculating total resources allocated to each resource and calculating remaining resource for each process
        for (let i = 0; i < totalProcesses; i++) {
            count2++;
            totalall_A += allocation_arr_A[i];
            totalall_B += allocation_arr_B[i];
            totalall_C += allocation_arr_C[i];

            //Pushing the value of remaining_resources to the "Remaining Resources Array " declared above
            remaining_arr_A.push(Math.abs(maxNeed_A[i] - allocation_arr_A[i]));
            remaining_arr_B.push(Math.abs(maxNeed_B[i] - allocation_arr_B[i]));
            remaining_arr_C.push(Math.abs(maxNeed_C[i] - allocation_arr_C[i]));

            //Initializing the value for table to add this entry 
            var table2 = document.getElementById("bk_table");
            var row2 = table2.getElementsByTagName("tr")[count2];

            //Giving values to the "Remaining Resources" column present in the table
            var cell7 = row2.insertCell(7);
            var cell8 = row2.insertCell(8);
            var cell9 = row2.insertCell(9);

            cell7.innerHTML = `${remaining_arr_A[i]}`;
            cell8.innerHTML = `${remaining_arr_B[i]}`;
            cell9.innerHTML = `${remaining_arr_C[i]}`;

            //For Graph purpose
            RsumA += remaining_arr_A[i];
            RsumB += remaining_arr_B[i];
            RsumC += remaining_arr_C[i];

        }//End of For Loop for Adding/calculating data



        // resources allocated to processes cant be more than available resources
        //validation condition as Available resources should not be greated than Allocated resources
        if (totalall_A > total_arr[0] || totalall_B > total_arr[1] || totalall_C > total_arr[2]) {
            document.getElementById("res_ver").value = "Invalid Allocation Available Resources < Allocated Resources";
            deadlock = true;
        }

        else {
            document.getElementById("res_ver").value = "Valid Allocation";
            console.log(remaining_arr_C);

            //calculating initial remaining resources
            availaible.push(total_arr[0] - totalall_A);
            availaible.push(total_arr[1] - totalall_B);
            availaible.push(total_arr[2] - totalall_C);

            //Checking all the resources upto which they satisfy the condition mentioned below
            while (remaining != 0) {
                if (checked == remaining) {
                    deadlock = true;
                    break;
                }
                //if avalaible resources are greater than or equal to remaining/required resources
                if (availaible[0] >= remaining_arr_A[counter] && availaible[1] >= remaining_arr_B[counter] && availaible[2] >= remaining_arr_C[counter] && completed[counter] == 0) {
                    sequence.push("P" + counter);

                    //adding the freed resources of the executed process to the availaible resources
                    availaible[0] += allocation_arr_A[counter];
                    availaible[1] += allocation_arr_B[counter];
                    availaible[2] += allocation_arr_C[counter];

                    //changing completed bit to 1 to indicate process has been executed
                    completed[counter] = 1;

                    //iterating between 0 to totalprocess-1
                    counter = (counter + 1) % totalProcesses;

                    //Decrementing the remaining value as 1 process is being checked
                    remaining--;

                    //Updating the particular process's  checked value 
                    checked = 0;

                }//End of else loop if Allocation is valid


                //Applying a round robin for loop till there exists a process after one complete execution who hava a
                //ability to get resource
                else if (completed[counter] == 1) {
                    counter = (counter + 1) % totalProcesses;
                }

                //ending condition
                else {
                    if (counter == totalProcesses - 1) {
                        checked = 0;
                    } else {
                        checked++;
                    }

                    //Making a circular loop
                    counter = (counter + 1) % totalProcesses;
                }
            }
        }//End of Else conditon

        //Passing the condition to be executed whenever a deadlock occurs
        if (deadlock == true) {
            //Passing value to the textfield "Deadlock State" 
            document.getElementById("dd_state").value = "Deadlock Encountered!";
            document.getElementById("safe").value = "No safe Sequence Possible"
        } else {
            //Passing value to the textfield "Deadlock State"  on Html Page
            document.getElementById("dd_state").value = "Deadlock Avoided Successfully..";

            //Passing value of Safe Sequence array Obtained after execution the algorithm to 
            //the textfield "Safe Sequence" on html Page
            document.getElementById("safe").value = `Processes : [${sequence}]`;


        }

    }//End the of the first else "when totalProcesses != 1"'

});

//Function for Exporting data to excel sheet using inbuilt library
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('bk_table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (document.querySelector("#user").value + '.' + (type || 'csv')));
}


//Function for implementing chart using inbuilt library
function makechart() {


    // Chart.defaults.font.family = "Lato";
    // Chart.defaults.font.size = 18;
    // Chart.defaults.color = "blue";


    // let labels = ['Total_Remaining_A', 'Total_Remaining_B', 'Total_Remaining_C',
    //     'Total_Allocated_A', 'Total_Allocated_B', 'Total_Allocates_C',
    //     'Total_Maxneed_A', 'Total_Maxneed_B', 'Total_maxneed_C'
    // ];
    // const itemdata = [`${RsumA}`, `${RsumB}`, `${RsumC}`,
    // `${AsumA}`, `${AsumB}`, `${AsumC}`,
    // `${MsumA}`, `${MsumB}`, `${MsumC}`,
    // ];

    // const data = {
    //     labels: labels,
    //     datasets: [{
    //         data: itemdata,
    //         backgroundColor: ['rgb(255, 0, 0)', 'rgb(255,255,0)', 'rgb(96,186,45)',
    //             'rgb(255, 0, 0)', 'rgb(255,255,0)', 'rgb(96,186,45)',
    //             'rgb(255, 0, 0)', 'rgb(255,255,0)', 'rgb(96,186,45)'
    //         ]
    //     }]
    // };

    // const config = {
    //     type: 'bar',
    //     data: data,
    //     options: {
    //         plugins: {
    //             legend: {
    //                 display: false,
    //                 labels: {
    //                     color: 'rgb(255, 99, 132)'
    //                 }

    //             },
    //             title: {
    //                 display: true,
    //                 text: 'CHART FOR TOTAL RESOURCE ALLOCATION',
    //                 color: 'rgb(0,0,0)',
    //                 font: {
    //                     size: 20
    //                 }
    //             }
    //         }
    //     }
    // };

    // const chart = new Chart(
    //     document.getElementById("mychart"),
    //     config
    // );


    var popCanvas = document.getElementById("popChart");

    Chart.defaults.font.family = "Lato";
    Chart.defaults.font.size = 20;
    Chart.defaults.color = "black";

    var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
            labels: ['Total_Remaining_A', 'Total_Remaining_B', 'Total_Remaining_C',
                'Total_Allocated_A', 'Total_Allocated_B', 'Total_Allocates_C',
                'Total_Maxneed_A', 'Total_Maxneed_B', 'Total_maxneed_C'
            ],
            datasets: [{
                label: 'TOTAL RESOURCES ALLOCATIONS',
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
