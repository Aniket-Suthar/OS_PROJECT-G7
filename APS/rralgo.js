var selectedRow = null;

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


//clearing all fields
function clearFields() {
    document.querySelector("#atimeinput").value = "";
    document.querySelector("#btimeinput").value = "";

}


//Grabbing the values/fields of html Buttons and Classes
let btnAdd = document.querySelector('#add_row');
let table = document.querySelector('table');
let qtInput = document.querySelector('#qtinput');
let atInput = document.querySelector('#atimeinput');
let btInput = document.querySelector('#btimeinput');
let delInput = document.querySelector('#delete');
let exeInput = document.querySelector('#exe');
let count = 0;
let pno = "P";
let qt_s;
let qt;


//Implementing Class for the Calculation of Various times
class ProcessStruct {
    constructor(pid, at, bt, ct, wt, start_time, tat, rt, bt_remaining) {
        this.pid = pid;
        this.at = at;
        this.bt = bt;
        this.ct = ct;
        this.wt = wt;
        this.tat = tat;
        this.rt = rt;
        this.start_time = start_time;
        this.bt_remaining = bt_remaining;
    }
}



let ganttCharPD = [];
let ganttCharAT = [];

//Making Array Of Objects
let ps = [];
for (let i = 0; i < 100000; i++) {
    ps.push(new ProcessStruct());
}


//Function for sorting the Arrival Time
function comparatorAT(a, b) {
    let x = a.at;
    let y = b.at;
    return x < y;
}


//Function for sorting the Process ID
function comparatorPID(a, b) {
    let x = a.pid;
    let y = b.pid;
    return x < y;
}


//Declaring the various Variables to be used in the execution purpouse
var n, index;
var cpu_utilization;
var q = [];


var is_first_process = true;
var current_time = 0, max_completion_time;
var completed = 0, tq, total_idle_time = 0, length_cycle = 0;

var sum_tat = 0, sum_wt = 0, sum_rt = 0, sum_ct = 0;



//Adding the event Listener function to add rows to input table
btnAdd.addEventListener('click', function addRow(e) {
    e.preventDefault();

    //Getting form values
    const qt_s = document.querySelector("#qtinput").value;
    const at_s = document.querySelector("#atimeinput").value;
    const bt_s = document.querySelector("#btimeinput").value;
    const name = document.querySelector("#user").value;


    //validating the values
    if (qt_s == "" || at_s == "" || bt_s == "" || name == " ") {
        showAlert("Please Fill All the Details", "danger");
    }

    else if (qt_s < 0) {
        showAlert("Quantum Time cant't be negative", "danger");
    }
    else if (bt_s == '0') {
        showAlert("Burst time cannot be 0. Please try again", "danger");
    }
    else if (bt_s < 0) {
        showAlert("Burst time cannot be negative Please try again", "danger");
    }
    else if (at_s < 0) {
        showAlert("Arrival time cannot be negative Please try again", "danger");
    }

    else {
        if (selectedRow == null) {
            count++;

            //Initializing the visited array value to false
            visited = new Array(100000).fill(false);
            document.getElementById("qtinput").readOnly = true;
            document.getElementById("user").readOnly = true;
            let num = count.toString();
            let pno_2 = pno.concat(num);

            var table = document.getElementById("rr_table");
            var row = table.insertRow(count);

            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);

            //Inserting the values got from user to the table rows
            cell0.innerHTML = pno_2;
            cell1.innerHTML = at_s;
            cell2.innerHTML = bt_s;


            showAlert("Entry Added", "success");

            atInput.value = '';
            btInput.value = '';

            atv = parseFloat(at_s);
            btv = parseFloat(bt_s);
            qtv = parseFloat(qt_s);

            //Passing the same values got from user to the array of objects for the calculation purpose 
            ps[count - 1].at = atv;
            ps[count - 1].pid = count - 1;
            ps[count - 1].bt = btv;
            ps[count - 1].bt_remaining = btv;

            tq = qtv;

            selectedRow = null;

            n = count;
        }


        //Saving the data for editing purpose
        else {

            selectedRow.children[1].textContent = at_s;
            selectedRow.children[2].textContent = bt_s;
            selectedRow = null;
            showAlert("Entry Updated", "info");
        }
        clearFields();
    }
});




//Adding the event the listener function for the execution part
exeInput.addEventListener('click', function exeAlgo(e) {
    e.preventDefault();

    //Grabbing the table to  put value after execution
    var table = document.getElementById("rr_table2");


    // * * * * * * * * * M A I N   I M P L E M E N T A T I O N   O F  A L G O R I T H M * * * * * * * * * *


    //Sorting all the processes according to their arrival time according to RR algo.
    ps.sort(function (a, b) { return a.at - b.at });

    //Putting the first process in the queue i.e using the index
    q.push(0);

    //Marking the first process visit to true
    visited[0] = true;

    //Running the loop till all the processes are not executed 
    while (completed != n) {

        //Making the index to point to the first process
        index = q[0];
        ganttCharPD.push(ps[index].pid);
        ganttCharAT.push(current_time);

        //Removing the first process from the ready queue to make next process to come in
        q.shift();

        //Checking whether the rem. burst and burst time are same as initially they should be equal always

        //This condition will run only once for every processes
        if (ps[index].bt_remaining == ps[index].bt) {


            //Start_time gives time at which the process first starts to excute
            ps[index].start_time = Math.max(current_time, ps[index].at);

            //Calculating the idle time for the processes
            total_idle_time += (is_first_process == true) ? 0 : ps[index].start_time - current_time;

            //Current time gives the current time at which the porcess is
            current_time = ps[index].start_time;

            //Marking the first process
            is_first_process = false;
        }

        //Checking the condition when burst_time is greater than Quantum time
        if (ps[index].bt_remaining - tq > 0) {

            //    console.log("P"+ps[index].pid+ " ");

            //Storing the remaing time in the bt_remaining value
            ps[index].bt_remaining -= tq;

            //Incrementing the current time for the particular process 
            current_time += tq;
        }

        //This part will run whenever the process has been completed fully or it has burst_time less than 
        //Or Equal to the Quantum time
        else {
            current_time += ps[index].bt_remaining;

            //As process is completed so making its rem. time to 0
            ps[index].bt_remaining = 0;
            completed++;

            //Calculating various values for the particular process
            ps[index].ct = current_time;
            ps[index].tat = ps[index].ct - ps[index].at;
            ps[index].wt = ps[index].tat - ps[index].bt;
            ps[index].rt = ps[index].start_time - ps[index].at;


            //Getting the total time for all the calculation
            sum_tat += ps[index].tat;
            sum_wt += ps[index].wt;
            sum_rt += ps[index].rt;
            sum_ct += ps[index].ct;
        }


        //This loop checking whether after executing the first  process 
        //And adding the time quatum to the current time what are the various process 
        //which are ready to execute at that point of time
        for (var i = 1; i < n; i++) {
            //Checking for the new process that are ready to be execute at a particular "Current time"
            if (ps[i].bt_remaining > 0 && ps[i].at <= current_time && visited[i] == false) {

                //Adding the processes which are ready in the queue using their index
                q.push(i);

                //Marking their index in visited array to be true
                visited[i] = true;
            }
        }


        //This condition will run when the bt_rem time of the current running process is not zero
        //i.e the process is still not completed
        if (ps[index].bt_remaining > 0) {

            //Again pushing the Current running process to queue whenever it is not completely executed
            q.push(index);
        }

        //Exception Condition when the queue is empty , when CPU is idle 
        //This cond occurs when arrival time of some processes is grater than the current time
        if (q.length === 0) {
            for (let i = 1; i < n; i++) {

                //Taking any process from the queue which has Burst_Time > 0
                //means the processes which have not come  / or not completed fully
                if (ps[i].bt_remaining > 0) {
                    q.push(i);
                    visited[i] = true;
                    break;
                }
            }
        }
    } //End of WHile loop


    max_completion_time = -1;
    for (let i = 0; i < n; i++) {

        max_completion_time = Math.max(max_completion_time, ps[i].ct)
    }
    length_cycle = max_completion_time - ps[0].at;
    cpu_utilization = parseFloat((length_cycle - total_idle_time) / length_cycle);

    for (let i = 0; i < n; i++) {
        console.log()

    }




    // * * * * * * * * *E N D   O F    M A I N   I M P L E M E N T A T I O N   O F  A L G O R I T H M * * * * * * * * * *




    let row_num = 0;

    //Sorting the values of Process ID
    ps.sort((a, b) => a.pid - b.pid);

    for (let i = 0; i < n; i++) {
        row_num++;

        //Declaring Variable for adding the Value to "OUTPUT TABLE"
        var row = table.getElementsByTagName("tr");
        var row = table.insertRow(row_num);

        //Declaring variables for getting the value to be put in the HTML table
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);

        //Inserting the value to table rows
        cell0.innerHTML = `P${i + 1}`;
        cell1.innerHTML = `${ps[i].ct}`;
        cell2.innerHTML = `${ps[i].tat}`;
        cell3.innerHTML = `${ps[i].wt}`;
        cell4.innerHTML = `${ps[i].rt}`;



        //Exiting condition to stop adding the rows to HTML table
        if (row_num >= count) {
            break;
        }

    }


    //GANTT CHART IMPLEMENTATION
    var tb2 = document.getElementById("gant")

    for (let i = 0; i <= ganttCharPD.length; i++) {

        //Declaring Variable for adding the Value to "OUTPUT TABLE"
        var row = tb2.getElementsByTagName("tr");
        var row = tb2.insertRow(0);

        var newCell2 = tb2.rows[i].insertCell(-1);
        var newCell = tb2.rows[i].insertCell(-1);

        //Inserting the value to table rows
        newCell2.innerHTML = `${ganttCharAT[i]}`;
        newCell.innerHTML = `P${ganttCharPD[i] + 1}`;
        if (i == ganttCharPD.length) {
            newCell2.innerHTML = `${ganttCharAT[i - 1] + 1}`;
            break;
        }

    }


    //Declaring and addind the other remaining Values for "OTHER DETAILS table"
    var avg_ct = document.getElementById("avg_ct");
    avg_ct.value = `${sum_ct / n}`;

    var avg_tat = document.getElementById("avg_tat");
    avg_tat.value = `${sum_tat / n}`;

    var avg_rt = document.getElementById("avg_rt");
    avg_rt.value = `${sum_rt / n}`;

    var avg_wt = document.getElementById("avg_wt");
    avg_wt.value = `${sum_wt / n}`;

    var thrpt = document.getElementById("thrpt");
    thrpt.value = `${n / length_cycle}`;

    var cpu_ut = document.getElementById("cpu");
    cpu_ut.value = `${cpu_utilization * 100}%`;
}


);



//Adding the Data to Excel file using Inbuilt JS library
const name = document.querySelector("#user").value;

//Exporting data to excel sheet
function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('rr_table2');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || (document.querySelector("#user").value + '.' + (type || 'csv')));
}


function makechart() {
    //  var data1=[];
    let labels = ['Total_Completion_time', 'Total_TAT_time', 'Total_Waiting_time', 'Total_Response_time'];
    // const d=document.getElementById("chd");
    // d.display=

    // for (let i = 0; i <n; i++) {
    //     const p=`${i+1}`;
    //     const element = `${ps[i].ct}`;
    //     const e2=`${ps[i].tat}`;
    //     const e3=`${ps[i].wt}`;
    //     const e4=`${ps[i].rt}`;
    //     data1.push(p);
    //     data1.push(element);
    //     data1.push(e2);
    //     data1.push(e3);
    //     data1.push(e4);

    // }
    const itemdata = [`${sum_ct}`, `${sum_tat}`, `${sum_wt}`, `${sum_rt}`];

    const data = {
        labels: labels,
        datasets: [{
            data: itemdata,
            backgroundColor: ['rgb(66,221,245)', 'rgb(255,255,0)', 'rgb(96,186,45)', 'rgb(255,0,255)']
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'CHART FOR THE CALCULATIONS',
                    color: 'rgb(0,0,0)'
                }
            }
        }
    };

    const chart = new Chart(
        document.getElementById("mychart"),
        config
    );
}

function showDiv() {
    document.getElementById('welcomeDiv').style.display = "block";
}