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






let first = false;
//total processes
const total_arr = [];
var totalProcesses;
let counter = 0
//total resources alloted for each resource

//allocated resources to each process at the beginning
const allocation_arr_A = [];
const allocation_arr_B = [];
const allocation_arr_C = [];

//resources required for execution
const remaining_arr_A = [];
const remaining_arr_B = [];
const remaining_arr_C = []
//maximum resources needed for execution of a process
const maxNeed_A = [];
const maxNeed_B = [];
const maxNeed_C = []
//total resources of each resource at the beginning
let totalall_A = 0;
let totalall_B = 0;
let totalall_C = 0
//sequence of safe execution of processes
const sequence = []
//avaliable resources
const availaible = []
//to check number of processes which have not been executed

//to check for deadlock
let checked = 0;
let deadlock = false
const completed = [];

let RsumA = 0, RsumB = 0, RsumC = 0;
let AsumA = 0, AsumB = 0, AsumC = 0;
let MsumA = 0, MsumB = 0, MsumC = 0;



//Clearing all the field values after each new Entry
function clearFields() {
    document.querySelector("#allocA").value = "";
    document.querySelector("#allocB").value = "";
    document.querySelector("#allocC").value = "";

    // document.querySelector("#remA").value = "";
    // document.querySelector("#remB").value = "";
    // document.querySelector("#remC").value = "";

    document.querySelector("#needA").value = "";
    document.querySelector("#needB").value = "";
    document.querySelector("#needC").value = "";

}



var selectedRow = null;
let btnAdd = document.querySelector('#add_row');
// let table = document.querySelector('table');
let delInput = document.querySelector('#delete');
let exeInput = document.querySelector('#exe');
let pno = "P";
let ddl = "Deadlock Encountered";
let ddln = "Deadlock Avoided Successfully";


var count = 1;
btnAdd.addEventListener('click', function addRow(e) {
    e.preventDefault();

    const Total_A = parseInt(document.querySelector("#apinput").value);
    const Total_B = parseInt(document.querySelector("#bpinput").value);
    const Total_C = parseInt(document.querySelector("#cpinput").value);

    if (first == false) {
        total_arr.push(Total_A);
        total_arr.push(Total_B);
        total_arr.push(Total_C);
        first = true;
    }

    let num = count.toString();
    let pno_2 = pno.concat(num);

    // const total_process = document.querySelector("#tpinput").value;

    const Alloc_A = parseInt(document.querySelector("#allocA").value);
    const Alloc_B = parseInt(document.querySelector("#allocB").value);
    const Alloc_C = parseInt(document.querySelector("#allocC").value);

    // const Rem_A = document.querySelector("#remA").value;
    // const Rem_B = document.querySelector("#remB").value;
    // const Rem_C = document.querySelector("#remC").value;

    const Max_A = parseInt(document.querySelector("#needA").value);
    const Max_B = parseInt(document.querySelector("#needB").value);
    const Max_C = parseInt(document.querySelector("#needC").value);




    count++;
    var table = document.getElementById("bk_table");
    var row = table.insertRow(count);

    var cell0 = row.insertCell(0);
    cell0.innerHTML = pno_2;


    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);

    cell1.innerHTML = Alloc_A;
    cell2.innerHTML = Alloc_B;
    cell3.innerHTML = Alloc_C;

    //Pushing to the array
    allocation_arr_A.push(parseInt(Alloc_A));
    allocation_arr_B.push(parseInt(Alloc_B));
    allocation_arr_C.push(parseInt(Alloc_C));
    AsumA += parseFloat(Alloc_A);
    AsumB += parseFloat(Alloc_B);
    AsumC += parseFloat(Alloc_C);




    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);


    cell4.innerHTML = Max_A;
    cell5.innerHTML = Max_B;
    cell6.innerHTML = Max_C;

    //Pushing to the array
    maxNeed_A.push(parseInt(Max_A));
    maxNeed_B.push(parseInt(Max_B));
    maxNeed_C.push(parseInt(Max_C));
    MsumA += parseFloat(Max_A);
    MsumB += parseFloat(Max_B);
    MsumC += parseFloat(Max_C);

    // alert("Entry Added Successfully");


    clearFields();




    totalProcesses = count - 1;



});


let count2 = 1;
//* * * * * * * * * * * *  C O R E    I M P L E M E N T A T I O N  * * * * * * * * * * * * 
exeInput.addEventListener('click', function exeAlgo(e) {
    e.preventDefault();

    // alert("total processes are:" + totalProcesses)

    let remaining = totalProcesses;

    for (let i = 0; i < totalProcesses; i++) {
        completed[i] = 0;
    }

    //calculating total resources allocated to each resource and calculating remaining resource for each process
    for (let i = 0; i < totalProcesses; i++) {
        count2++;
        totalall_A += allocation_arr_A[i];
        totalall_B += allocation_arr_B[i];
        totalall_C += allocation_arr_C[i];

        remaining_arr_A.push(Math.abs(maxNeed_A[i] - allocation_arr_A[i]));
        remaining_arr_B.push(Math.abs(maxNeed_B[i] - allocation_arr_B[i]));
        remaining_arr_C.push(Math.abs(maxNeed_C[i] - allocation_arr_C[i]));

        var table2 = document.getElementById("bk_table");
        var row2 = table2.getElementsByTagName("tr")[count2];


        var cell7 = row2.insertCell(7);
        var cell8 = row2.insertCell(8);
        var cell9 = row2.insertCell(9);

        cell7.innerHTML = `${remaining_arr_A[i]}`;
        cell8.innerHTML = `${remaining_arr_B[i]}`;
        cell9.innerHTML = `${remaining_arr_C[i]}`;

        RsumA += remaining_arr_A[i];
        RsumB += remaining_arr_B[i];
        RsumC += remaining_arr_C[i];



    }

    // resources allocated to processes cant be more than available resources
    if (totalall_A > total_arr[0] || totalall_B > total_arr[1] || totalall_C > total_arr[2]) {
        document.getElementById("res_ver").value = "Invalid Allocation";
        deadlock = true;
    }
    else {
        document.getElementById("res_ver").value = "Valid Allocation";
        console.log(remaining_arr_C);
        //calculating initial remaining resources
        availaible.push(total_arr[0] - totalall_A);
        availaible.push(total_arr[1] - totalall_B);
        availaible.push(total_arr[2] - totalall_C);
        while (remaining != 0) {
            if (checked == remaining) {
                deadlock = true;
                // console.log("Entered deadlock block");
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
                remaining--;
                checked = 0;
            } else if (completed[counter] == 1) {
                counter = (counter + 1) % totalProcesses;
            } else {
                if (counter == totalProcesses - 1) {
                    checked = 0;
                } else {
                    checked++;
                }
                counter = (counter + 1) % totalProcesses;
            }
        }
    }

    if (deadlock == true) {
        document.getElementById("dd_state").value = "Deadlock Encountered!";
        document.getElementById("safe").value = "No safe Sequence Possible"
    } else {
        document.getElementById("dd_state").value = "Deadlock Avoided Successfully..";
        var safe_Seq = document.getElementById("safe");
        safe_Seq.value = `Processes : [${sequence}]`;


    }


});

//Exporting data to excel sheet
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('bk_table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (document.querySelector("#user").value + '.' + (type || 'csv')));
}


//Chart
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
